import React, {Component} from 'react'
import {View, TouchableOpacity, Text, Alert} from 'react-native'
import {Icon} from 'gingko'
import styles from './style'

export default class Light extends Component {
    static defaultProps = {
        style: {},
        isLighting: false,
        islightText: false
    }

    onChangeFlashMode = () => {
        const { onChangeFlashMode } = this.props
        onChangeFlashMode && onChangeFlashMode()
    }
    
    render() {
        const { 
            lightStyle,
            rflashMode,
            flashModeText,
            lightContainerStyle
        } = this.props

        return <TouchableOpacity style={lightContainerStyle} onPress={this.onChangeFlashMode}>
            <View style={[styles.lightBtn, lightStyle]}>
                <Icon name={rflashMode ? 'light-on' : 'light-off'} color='#fff' size={28} />
            </View>
            {
                flashModeText && 
                <Text style={styles.lightBtnText}>
                    {rflashMode ? '关闭手电筒' : '打开手电筒'}
                </Text>
            }
        </TouchableOpacity>
    }
}
