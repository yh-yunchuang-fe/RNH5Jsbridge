import React, {Component} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import styles from './style'
import Light from '../Light'

export default class OperateBar extends Component {
    static defaultProps = {
        portrait: true,
        flashMode: false,
        onCancel: null,
        onChangeFlashMode: null,
    }

    onChangeFlashMode = () => {
        const { onChangeFlashMode } = this.props
        onChangeFlashMode && onChangeFlashMode()
    }
    
    render() {
        const { 
            isFront,
            portrait,
            rflashMode,
            onCancel
        } = this.props

        return <View style={styles.operateBarContainer}>
            {
                isFront ? <TouchableOpacity>
                    <Text style={[styles.cancelText, styles.hidden, styles.cancelBtnWrapper]}>占位</Text>
                </TouchableOpacity> : portrait ? 
                <Light 
                    rflashMode={rflashMode} 
                    changeLightState={this.onChangeFlashMode}/> 
                    : 
                <TouchableOpacity onPress={onCancel}>
                    <Text style={[styles.cancelText, styles.cancelBtnWrapper,
                        {transform: [{rotateZ: '90deg'}]}]}>取消</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity style={styles.capture} onPress={this.takePicture}>
                <View style={styles.photoBtn}>
                    <View style={styles.photoSmallCircle}></View>
                </View>
            </TouchableOpacity>
            {
                isFront ? 
                <TouchableOpacity style={styles.cancelBtnWrapper} onPress={onCancel}>
                    <Text style={styles.cancelText}>取消</Text>
                </TouchableOpacity> : portrait ? 
                <TouchableOpacity style={styles.cancelBtnWrapper} onPress={onCancel}>
                    <Text style={styles.cancelText}>取消</Text>
                </TouchableOpacity> : 
                <Light 
                    style={{transform: [{rotateZ: '90deg'}]}}
                    rflashMode={rflashMode} 
                    changeLightState={this.onChangeFlashMode}/> 
            }
        </View>
    }
}
