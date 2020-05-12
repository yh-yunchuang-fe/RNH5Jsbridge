import React, {Component} from 'react'
import {BackHandler} from 'react-native'
import { WebView } from 'react-native-webview'
import {
    SafeAreaView,
} from 'react-native'
import {Header, Track, Scanner} from '@yh-rn/yh-durian'
import styles from './style'

class CommonWebview extends Component {
    static defaultProps = {
        needHeader: false,
        getRef: null,
        wrapperStyle: null,
        headProps: null,
    }

    static sendMessage = (webview, command, payload) => {
        webview.injectJavaScript(`afterReceiveMessage(${(JSON.stringify({
            command: command,
            payload: payload
        }))});true;`)
    }

    constructor(props) {
        super(props)
        
        this.state = {
            title: '我是webview',
            canGoBackRn: true,
            backNoEffect: false
        }
    }

    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPress', this.goBack)
    }

    componentWillUnmount = () => {
        this.tracker = null
        Scanner.stopScan()
        BackHandler.removeEventListener('hardwareBackPress', this.goBack)
    }

    onReceiveScanResult = (data) => {
        CommonWebview.sendMessage(this.webview, 'codeScan', data)
    }

    goBack = () => {
        const {backNoEffect} = this.state
        if(backNoEffect) {return true}
        const {close} = this.props
        if (this.state.canGoBackRn) {
            Scanner.stopScan()
            close && close()
            return true
        }
        this.webview.goBack()
        return true
    }

    generateRef = (ref) => {
        const {getRef} = this.props

        this.webview = ref
        getRef && getRef(ref)
    }

    onLoad = (syntheticEvent) => {
        const {onLoad} = this.props
        CommonWebview.sendMessage(this.webview, 'ready')
        onLoad && onLoad(syntheticEvent.nativeEvent)
    }

    onMessage = (e) => {
        const data = e.nativeEvent.data
        
        if(!data) return
        const message = JSON.parse(e.nativeEvent.data)
        console.log(message)
        const type = message.type
        const command = message.command //&& message.command.toUpperCase()
        const payload = message.payload
        const callback = message.callback
        if(type == 'invoke') {
            this.handleInvokeEvents(command, payload, callback)
            return
        }

        if(type == 'call') {
            this.handleCallEvents(command, payload, callback)
            return
        }

        const {onMessage} = this.props
        onMessage && onMessage()

    }

    handleInvokeEvents = (command, payload, callback) => {
        switch(command) {
        case 'openPortraitFrontCamera':
            //to do
            !!callback && CommonWebview.sendMessage(this.webview, command, 'hahah')
            break
        case 'openPortraitBackCamera':
            break
        case 'openLandscapeFrontCamera':
            break
        case 'openLandscapeBackCamera':
            break
        case 'addTrackProperty':
            break
        case 'addTrackEvent':
            break
        case 'startScan':
            Scanner.setOnReceiveScanResule(this.onReceiveScanResult)
            Scanner.startScan()
            !!callback && CommonWebview.sendMessage(this.webview, command)
            break
        case 'stopScan':
            Scanner.stopScan()
            break
        case 'initTrack':
            this.tracker = Track.getInstance(payload)
            break;
        case 'setPresetProperty':
            if(!this.tracker) {return}
            this.tracker.savePresetProperty(payload)
            break;
        case 'setMultiPresetProperty':
            if(!this.tracker) {return}
            this.tracker.saveMultiPresetProperty(payload)
            break;
        case 'addTrack':
            if(!this.tracker) {return}
            const {trackName='unknow', ...restProps} = payload
            this.tracker.addTrack(trackName, restProps)
            break;
        default:
            break    
        }
    }

    handleCallEvents = (command, payload, callback) => {
        switch(command) {
        case 'goBackRn':
            this.setState({
                canGoBackRn: payload
            })
            break
        case 'setBackEffect':
            this.setState({
                backNoEffect: payload
            })
            break
        case 'changeTitle':
            this.setState({
                title: payload
            })
            break
        case 'close':
            this.props.close && this.props.close()
            break
        case 'onTokenOut':
            this.props.onTokenOut && this.props.onTokenOut()
            break
        default:
            this.props.onCallMessage && this.props.onCallMessage(command, payload, callback)
            break    
        }
    }

    setTitle = (title) => {
        const {navigation} = this.props
        navigation.setOptions({
            title: title
        })
    }

    render() {
        const {
            needHeader,
            source,
            wrapperStyle,
            style,
            headProps,
            ...restProps
        } = this.props
        const {title} = this.state
        return <SafeAreaView style={[styles.containerStyle, wrapperStyle]}>
            {needHeader && <Header onBack={this.goBack} {...headProps}>{title}</Header>}
            <WebView
                {...restProps}
                ref={this.generateRef}
                style={[styles.containerStyle, style]}
                source={{uri: source}}
                onMessage={this.onMessage}
                onLoad={this.onLoad}
            />
        </SafeAreaView>
    }
}

const sendMessage = CommonWebview.sendMessage
export {
    sendMessage 
}
export default CommonWebview
