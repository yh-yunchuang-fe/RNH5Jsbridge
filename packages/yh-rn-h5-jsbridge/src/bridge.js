class RNH5JsBridge {
    constructor(props) {
        
        this.appName = props.appName
        this.eventArr = []
        this.handlers = {}
    }

    init = (params) => {
        this.appName = params.appName
    }

    addListener = () => {
        if (window.postMessage) {
            try {
                document.addEventListener('message', this.afterReceiveMessage, false)
            } catch (e) {
                console.log('非RN环境:', e.message)
            }
        }
    }

    afterReceiveMessage = (data) => {
        let command = data.command
        let payload = data.payload
        if(this.eventArr.indexOf(command) < 0) {return}
        //todo func类型检查
        if(!this.handlers[command]) {return}

        this.handlers[command](payload)
    }

    invoke = (command, params) => {
        if (window.postMessage) {
            window.postMessage(JSON.stringify({
                command: command,
                payload: params
            }), 'invoke')
        }
    }

    call = (command, params) => {
        if (window.postMessage) {
            window.postMessage(JSON.stringify({
                command: command,
                payload: params
            }), 'call')
        }
    }

    on = (command, callback) => {
        if(!command) {
            return console.error('事件格式不正确')
        }
        this.eventArr.push(command)
        this.handlers[command] = callback
    }

    off = (command) => {
        let eventIndex = this.eventArr.findIndex(item => item == command)
        if(eventIndex < 0) {return}

        this.eventArr.splice(eventIndex, 1)
        delete this.handlers[command]
    }
}

export default RNH5JsBridge