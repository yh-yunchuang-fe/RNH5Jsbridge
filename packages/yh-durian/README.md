#### yh-durian    
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