#### yh-webview
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
