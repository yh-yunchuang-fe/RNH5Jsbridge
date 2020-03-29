class RNH5JsBridge {
    constructor(props) {
        
        if(props) {
            this.appName = props.appName
        }
        
        this.eventArr = []
        this.handlers = {}
    }

    init = (params) => {
        if(params) {
            this.appName = params.appName
        }

        window.afterReceiveMessage = function (message){
            this.afterReceiveMessage(message)
        }
    }

    afterReceiveMessage = (data) => {
        let command = data.command
        let payload = data.payload

        if(this.eventArr.indexOf(command) < 0) {return}
        //todo func类型检查
        const handlersObj = this.handlers[command]
        if(!handlersObj) {return}
        this.handlers[command]['callback'](payload)
        if(handlersObj.once) {
            this.off(command)
        }
    }

    invoke = (command, payload, callback) => {
        if (window.ReactNativeWebView) {
            if(callback) {
                this.once(command, callback)
            }
            window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'invoke',
                command: command,
                payload: JSON.stringify(payload),
                callback: !!callback
            }))
        }
    }

    call = (command, payload, callback) => {
        if (window.ReactNativeWebView) {
            if(callback) {
                this.once(command, callback)
            }
            window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'call',
                command: command,
                payload: JSON.stringify(payload),
                callback: !!callback
            }))
        }
    }

    on = (command, callback) => {
        if(!command) {
            return console.error('事件格式不正确')
        }
        this.eventArr.push(command)
        this.handlers[command] = {callback: callback}
    }

    once = (command, callback) => {
        if(!command) {
            return console.error('事件格式不正确')
        }
        this.eventArr.push(command)
        this.handlers[command] = {
            once: true,
            callback: callback
        }
    }

    off = (command) => {
        let eventIndex = this.eventArr.findIndex(item => item == command)
        if(eventIndex < 0) {return}

        this.eventArr.splice(eventIndex, 1)
        delete this.handlers[command]
    }

    ready = (callback) => {

        this.on('ready', () => {
            this.off('ready')
            callback && callback()
        })
    }

    error = (callback) => {
        this.on('error', callback)
    }
}

export default RNH5JsBridge