// import qiniu from './base/components/UploadFileManage/drive/qiniu'

const config = {
  // 对于默认不开启的页面 配置在此处将开启这些页面
  openPages: [

  ],
  // 不需要的页面可以配置路径禁用
  disablePages: [

  ],
  // 覆盖app.config.js 配置
  appConfig: {
    // 使用小程序新的渲染引擎
    // renderer: 'skyline',
    // lazyCodeLoading: 'requiredComponents',
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于获取附近商家',
      },
    },
    requiredPrivateInfos: [
      'chooseLocation',
      'getLocation',
      'onLocationChange',
      'startLocationUpdateBackground',
      'chooseAddress',
    ],
  },
  // 模块配置 将会调用模块生命周期的option，将对应模块的参数传入
  option: {
    // 基础模块
    duxapp: {
      theme: {
        primaryColor: '#32D191',
        secondaryColor: '#8D6CEB',
        successColor: '#34a853',
        warningColor: '#fbbc05',
        dangerColor: '#ea4335',
        pageColor: '#f7f9fa',

        customColor1: '#4883F0',

        textColor1: '#373D52',
        textColor2: '#535766',
        textColor3: '#A1A6B6',
        textColor4: '#FFF',
      }
    },
    duxui: {
      theme: {
        tabBar: {
          nameColor: '#373D52',
          nameHoverColor: '#32D191',
        },
        avatar: {
          url: 'https://rtcdn.client.jujiang.me/08d7131426aa06280c799f41c675876.png',
        },
        card: {
          shadow: false,
          radius: 16
        },
        button: {
          radiusType: 'round'
        },
        divider: {
          padding: 0
        }
        // button: {
        //   // color: '#000',
        //   radiusType: 'round-min', // 按钮圆角类型 square直角 round圆角 round-min较小的圆角
        //   size: 'm', // 按按钮尺寸 s m l
        //   plain: false, // 是否镂空
        //   sizes: {
        //     s: { fs: 24, p: 20, h: 50 },
        //     m: { fs: 28, p: 30, h: 70 },
        //     l: { fs: 32, p: 40, h: 90 },
        //   },
        // },
      },
    },
    wechat: {
      share: {
        open: true,
        // 开启未定义的页面分享
        pageSlef: {
          // 包含这些页面分享自身 页面路径关键词匹配 include 优先级比 exclude 高，
          // 可以配置exclude为空数组表示支持所有页面
          // pageSlef优先级高于pageHome
          include: [],
          // 排除这些页面 不进行分享
          // exclude: []
        },
        // 开启未定义的页面分享到指定页面
        pageHome: {
          path: 'playerUnion/pages/index/index',
          params: {},
          // 包含这些页面分享自身 页面路径关键词匹配
          include: [

          ],
          // 排除这些页面 不进行分享
          // exclude: []
        },
        // 公共分享参数
        common: {
          title: '智竞联盟',
          desc: '欢迎使用智竞联盟',
          image: 'https://a.ruitengqifu.com/fx1.png'
        },
        platform: {
          app: {
            // 配置分享到小程序的原始id 同时相当于开关
            weappUserName: 'gh_69ec7fd29697',
            // 配置分享到h5的url 同时相当于开关
            h5Url: '',
          }
        }
      },
    },
    // 用户模块
    user: {
      // 使用哪个模块注册的登录功能
      use: 'duxcms',
      // 是否禁用h5端微信登录
      disableH5Watch: false,
      // 开启微信小程序手机号快捷登录
      weappTelLogin: true
    },
    amap: {
      apiKey: '7f221fcd1949764633da830c3761766d'
    },
    duxcms: {
      request: {
        origin: "http://whxx.client.jujiang.me",
        // origin: 'http://192.168.2.24:8090',
        path: "api", // 域名二级目录
        secretId: '24015420',
        secretKey: 'b285a77b377f04066b08c3e15d3ba265',
        devOpen: false,
        devToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZW1iZXIiLCJpYXQiOjE2NzU2NjA2MzUsImV4cCI6MTY3NTc0NzAzNSwiaWQiOjF9._kX-uT-hUEbo_J3fN5F0HHs0ee01TPNQHrDiH3SHQlc'
      },
      // 登录相关配置
      loginConfig: {
        // 手机号登录
        phone: true,
        // 邮箱登录
        email: false,
        // app微信登录
        appWatch: true,
        // 小程序微信登录
        weappWatch: true,
        // 名称
        appName: '智竞联盟'
      }
    },
  },
};

export default config;
