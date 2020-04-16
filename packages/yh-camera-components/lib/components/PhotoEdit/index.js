import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import styles from './style'

export default class PhotoEdit extends React.Component {
    static defaultProps = {
        isFront: false,
        photoButton: true,
        photo: null,
        title: 'PhotoEdit',
        onCancel: null,
        onConfirm: null,
        onRephotograph: null,
        onLoadStart: null,
        onLoadEnd: null,
    }

    render() {
        const { photoButton, isFront, photo, onCancel, onConfirm, onRephotograph, onLoadStart, onLoadEnd } = this.props

        const confirmStyle = photoButton && { color: '#FD7622' }
        const transformStyle = !isFront && {transform: [{rotateZ: '90deg'}]}
        return (
            <View style={styles.photoEditContainer}>
                <View style={styles.photoWrapper}>
                    <Image style={[
                        styles.photoImage,
                    ]} 
                    onLoadStart={onLoadStart}
                    onLoadEnd={onLoadEnd}
                    source={photo} 
                    resizeMode={'contain'}/>
                </View>
                <View style={styles.photoOperateBar}>
                    <TouchableOpacity
                        style={styles.photoTextWrapper}
                        onPress={onRephotograph}>
                        <Text style={[styles.photoRephotograph, transformStyle]}>重拍</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.photoTextWrapper}
                        onPress={photoButton ? onConfirm : onCancel}>
                        <Text style={[styles.photoCancelText, confirmStyle, transformStyle]}>
                            {photoButton ? '使用照片' : '返回'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
