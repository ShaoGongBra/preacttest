// eslint-disable-next-line import/no-commonjs
module.exports = {
  insert: {
    'android/app/src/main/AndroidManifest.xml': {
      'manifest.queries': `<!-- 地图 -->
    <package android:name="com.baidu.BaiduMap" />
    <package android:name="com.autonavi.minimap" />`
    },
    'android/build.gradle': {
      'allprojects.repositories': `
    maven {
      // expo-camera bundles a custom com.google.android:cameraview
      url "$rootDir/../node_modules/expo-camera/android/maven"
    }`
    }
  },
  replace: {

  },
  ios: {
    plist: {
      'duxapp/Info.plist': {
        NSAppTransportSecurity: {
          NSExceptionDomains: {
            localhost: {
              NSExceptionAllowsInsecureHTTPLoads: true
            }
          }
        },
        LSApplicationQueriesSchemes: ['iosamap', 'baidumap', 'qqmap']
      }
    }
  }
}
