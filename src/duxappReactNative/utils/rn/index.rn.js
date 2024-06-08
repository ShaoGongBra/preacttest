import Taro from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import { Platform, LogBox, Linking, Alert, PermissionsAndroid } from 'react-native'
import { getVersion } from 'react-native-device-info'
import { useEffect, useMemo, useState } from 'react'
import RNFetchBlob from 'rn-fetch-blob'
import { asyncTimeOut, ObjectManage, TopView } from '@/duxapp'
import closeIcon from './images/close.png'
import './index.scss'

// 屏蔽黄屏警告
LogBox.ignoreLogs(['Require cycle', 'Constants', 'nativeEvent'])

/**
 * 版本号比较
 * @param {*} curV 当前版本
 * @param {*} reqV 请求的版本
 * @returns
 */
export const compare = (curV, reqV) => {
  if (curV && reqV) {
    //将两个版本号拆成数字
    const arr1 = curV.split('.'),
      arr2 = reqV.split('.')
    let minLength = Math.min(arr1.length, arr2.length),
      position = 0,
      diff = 0
    //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
    while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
      position++
    }
    diff = (diff != 0) ? diff : (arr1.length - arr2.length);
    //若curV大于reqV，则返回true
    return diff > 0
  } else {
    //输入为空
    return false
  }
}

class AppUpgrade extends ObjectManage {
  constructor() {
    super({})
  }
  data = {
    received: 0,
    total: 0,
    progress: 0
  }

  setProgress = (received, total) => {
    const kb = [received / 1024, total / 1024]
    this.set({
      received: kb[0],
      total: kb[1],
      progress: kb[0] / kb[1]
    })
  }

  useProgress = () => {
    const [progress, setProgress] = useState(this.data)

    const { remove } = useMemo(() => {
      return this.onSet(data => {
        setProgress(data)
      })
    }, [])

    useEffect(() => {
      return () => remove()
    }, [remove])

    return progress
  }
}

export const appUpgrade = new AppUpgrade()

const AppUpgradeConfirm = ({
  onClose,
  onSubmit,
  content
}) => {
  useEffect(() => {
    return () => onClose()
  }, [onClose])

  return (
    <View className='AppUC absolute inset-0 items-center justify-center'>
      <View className='AppUC__main'>
        <Text className='AppUC__title'>更新提示</Text>
        {content && <View className='AppUC__content'>{content}</View>}
        <View className='AppUC__submit' onClick={onSubmit}>
          立即更新
        </View>
        <View onClick={onClose} className='AppUC__close'>
          <Image className='AppUC__close__icon' src={closeIcon} />
        </View>
      </View>
    </View>
  )
}

AppUpgradeConfirm.show = (content) => {
  return new Promise((resolve, reject) => {
    const { remove } = TopView.add([AppUpgradeConfirm, {
      content,
      onClose: () => {
        reject()
        remove()
      },
      onSubmit: () => {
        resolve()
        remove()
      }
    }])
  })
}

export const AppUpgradeProgress = () => {

  const { received, total, progress } = appUpgrade.useProgress()

  return (
    <View className='AppUC absolute inset-0 items-center justify-center'>
      <View className='AppUC__main'>
        <Text className='AppUC__title'>下载中</Text>
        <View className='AppUP__progress'>
          <View className='AppUP__progress__child' style={{ width: progress * 100 + '%' }} />
          <View className='AppUP__progress__text'>{(received / 1024).toFixed(2) + 'MB/' + (total / 1024).toFixed(2) + 'MB'}</View>
        </View>
      </View>
    </View>
  )
}

AppUpgradeProgress.show = () => {
  return TopView.add([AppUpgradeProgress, {}])
}

export const updateApp = (() => {
  let callback = null
  return async _callback => {
    if (_callback) {
      callback = _callback
    }
    if (!callback) {
      return false
    }
    const info = await callback()
    if (Platform.OS === 'android') {
      if (compare(info.androidVersion, getVersion()) && (info.androidUrl || info.androidDowloadUrl)) {
        let progressView
        try {
          await AppUpgradeConfirm.show(info.androidUpdateInfo)
          if (info.androidDowloadUrl) {
            const task = Taro.downloadFile({
              url: info.androidDowloadUrl
            })
            progressView = AppUpgradeProgress.show()
            task.onProgressUpdate(res => {
              appUpgrade.setProgress(res.totalBytesWritten, res.totalBytesExpectedToWrite)
            })
            const { tempFilePath } = await task
            progressView.remove()
            await asyncTimeOut(200)
            RNFetchBlob.android.actionViewIntent(
              tempFilePath.replace('file://', ''),
              'application/vnd.android.package-archive'
            )
          } else {
            // 打开浏览器
            Linking.openURL(info.androidUrl)
          }
        } catch (error) {
          if (progressView) {
            progressView.remove()
          }
        }

        return true
      }
    } else {
      if (compare(info.iosVersion, getVersion()) && info.iosUrl) {
        Alert.alert(
          '有新版本',
          info.iosUpdateInfo,
          [
            { text: '取消', onPress: () => { }, style: 'cancel' },
            { text: '立即更新', onPress: () => Linking.openURL(info.iosUrl) }
          ]
        )
        return true
      }
    }
  }
})();
/**
 * 申请安卓文件读取权限
 * @returns
 */
export const crequestMultiplePermission = async () => {
  const granteds = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ])
  if (granteds['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {
    return true
  } else {
    throw '获取权限失败'
  }
}
