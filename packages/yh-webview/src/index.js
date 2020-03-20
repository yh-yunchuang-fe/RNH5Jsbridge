import React, {Component} from 'react';
import { WebView } from 'react-native-webview';
import {
    Text,
    Button,
    SafeAreaView
} from 'react-native';

import styles from './style'

class CommonWebview extends Component {
    static defaultProps = {
        needHeader: true,
        getRef: null
    }

    static sendMessage = (webview, command, payload) => {
        webview.injectJavaScript(`afterReceiveMessage(${(JSON.stringify({
            command: command,
            payload: JSON.stringify(payload)
        }))});true;`)
    }

    constructor(props) {
        const {navigation} = props
        super(props)
        if(!props.needHeader) {
            navigation.setOptions({
                headerMode: 'none',
                headerShown: false
            })
        }
    }

    generateRef = (ref) => {
        const {getRef} = this.props

        this.webview = ref
        getRef && getRef(ref)
    }

    onLoad = (syntheticEvent) => {
        const {onLoad} = this.props
        this.webview.injectJavaScript(`afterReceiveMessage(${(JSON.stringify({
            command: 'ready',
        }))});true;`)
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
        alert(type)
        if(type == 'invoke') {
            this.handleInvokeEvents(command, payload, callback)
            return
        }

        if(type == 'call') {
            alert('enter call')
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
            default:
                break    
        }
    }

    handleCallEvents = (command, payload, callback) => {
        switch(command) {
            case 'showHeaderRight':
                this.setHeaderRight(payload, callback)
                break
            case 'goBackRn':
                break
            case 'changeTitle':
                this.setTitle(payload)
                break
            default:
                break    
        }
    }

    setHeaderRight = (title, callback) => {
        const {navigation} = this.props

        navigation.setOptions({
            headerRight: () => (
                callback ? <Button onPress={this.onPressHeaderRightBtn} title={title} /> :
                <Text style={styles.headerRightText}>{title}</Text>
            ),
        })
    }

    setTitle = (title) => {
        const {navigation} = this.props
        navigation.setOptions({
            title: title
        })
    }

    onPressHeaderRightBtn = () => {
        CommonWebview.sendMessage('headerRightClick')
    }

    render() {
        const {
            needHeader,
            getRef,
            source,
            wrapperStyle,
            style,
            ...restProps
        } = this.props
        return <SafeAreaView style={[styles.containerStyle, wrapperStyle]}>
            <WebView 
                {...restProps}
                ref={this.generateRef}
                style={[styles.containerStyle, style]}
                source={{uri: 'http://0.0.0.0:8000/'}}
                onMessage={this.onMessage}
                onLoad={this.onLoad}
            />
        </SafeAreaView>
    }
}

export default {
    CommonWebview: CommonWebview,
    sendMessage: CommonWebview.sendMessage
}
