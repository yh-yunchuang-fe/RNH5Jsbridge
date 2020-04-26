### 永辉RN业务组件库
#### 1、相机组件
todo
#### 2、yh-rn-jsbridge
##### 导入
`import jsbridge from yh-rn-jsbridge`
##### 初始化（必须）
`jsbridge.init()`
##### bridge和webview可以开始通信
`jsbridge.ready(callback)`
##### 调用原生组件
`jsbridge.invoke(eventName, payload, callback)`    

支持的eventName:    
|eventName|参数|描述|
|-|-|-|
|startScan|--|初始化扫描，获取扫描结果需要手动监听codeScan事件|
|stopScan|--|停止扫描|
|initTrack|property: obejct|初始化神策记录对象|
|setPresetProperty|key: string, value: string|设置单个基础属性|
|setMultiPresetProperty|property: object|设置多个基础属性|
|addTrack|property: object， 需包含trackName属性|记录神策事件|

##### webview相关页面操作
`jsbridge.call(eventName, payload, callback)`   

支持的eventName:    
|eventName|参数|描述|
|-|-|-|
|goBackRn|property: boolean|当前页面是否能返回rn页面，默认true|
|setBackEffectproperty: boolean|返回按钮是否生效，用来控制一些弹窗返回|
|changeTitle|property: string|修改webview标题|
|close|--|关闭webview|
|onTokenOut|--|通知RNtoken失效|

##### 监听事件
`jsbridge.on(eventName, callback?)`
##### 取消监听事件
`jsbridge.off(eventName, callback?)`   

#### 3、yh-webview
RN专用webview   
##### 安装    
`import CommonWebview, {sendMessage} from yh-webview`

sendMessage用于向webview中的h5页面发送消息    
CommonWebview可接受的参数
|props|类型|默认|描述|   
|needHeader|boolean|true|是否需要公共头|
|getRef|function|null|获取ref|
|wrapperStyle|object|null|外层容器样式|
|headProps|object|null|公共头的参数|    

#### 4、yh-common-utils
公共工具函数库
##### 安装
`import {makeSingleton} from 'yh-common-utils'`    

|函数|描述|
|-|-|
|makeSingleton|单例模式|   

#### 5、yh-durian    
公共业务组件或模块    
##### 安装    
`import {Header, Scanner, Track} from 'yh-durian`    
##### Header组件    
公共头
|props|类型|默认值|描述|   
|-|-|-|-|   
|needGoBack|boolean|true|是否需要返回按钮|
|onBack|function|()=>{}|点击返回按钮触发的事件|
|leftView|ReactNode|null|头部左边组件|
|rightView|ReactNode|null|头部右边组件|   

##### Scanner组件   
扫描头
|实例方法|参数|描述|   
|-|-|-|
|setOnReceiveScanResule|function|设置扫描接收回调|
|startScan|--|开始监听扫描|
|stopScan|--|取消监听扫描|    

##### Track组件    
神策日志
|静态方法|参数|描述|   
|-|-|-|
|getInstance|--|获取track实例|

|实例方法|参数|描述|   
|-|-|-|
|savePresetProperty|(key: string, value: string)|设置单个基础属性|
|saveMultiPresetProperty|props: object|设置多个基础属性|
|addTrack|(trackName: string, props: object)|记录神策事件|