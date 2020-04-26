#### yh-rn-jsbridge
yh-weview组件内嵌h5页面专用
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