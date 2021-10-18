import React, {Component} from 'react'
import {View, Text, Dimensions, StyleSheet, TouchableOpacity, Image} from 'react-native'
import styles from './style'
import { Icon } from 'gingko'
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

export default class ScanMask extends Component {
    static defaultProps = {
        scanBar: '',
        width: 250,
        height: 250,
        maskColor: '',
        renderTopView: null,
        renderBottomView: null,
        borderColor: '#24A8E8',
        borderWidth: StyleSheet.hairlineWidth,
        isShowScanBar: true,
        rflashMode: false,
        goBack: () => {},
        gotoPickCode: () => {},
        onChangeFlashMode: () => {}
    }

    onChangeFlashMode = () => {
        const { onChangeFlashMode } = this.props
        onChangeFlashMode && onChangeFlashMode()
    }

    gotoPickCode = () => {
        const { gotoPickCode } = this.props
        gotoPickCode && gotoPickCode()
    }
    
    render() {
        const { 
            top = 200,
            width = 300, 
            height = 300,
            maskColor,
            rflashMode,
            goBack,
            renderScanBar,
            renderTopView,
            renderBottomView,
        } = this.props
        const maskSty = maskColor ? { backgroundColor: maskColor } : null
        const scanTop = top ? top : (deviceHeight - height) / 2
        const scanBottom = deviceHeight - scanTop - height
        const scanLeft = (deviceWidth - width) / 2

        return (
            <View style={styles.scanMaskContainer}>
                <View style={maskSty}>
                    {
                        !!renderTopView ? renderTopView() :
                        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
                            <Icon name='chevron-left' color='#fff' />
                        </TouchableOpacity>
                    }
                </View>

                <View style={[styles.scanMaskContent ,maskSty]}>
                    <View style={styles.center}>
                        <View style={[maskSty, { width: scanLeft, height }]}/>
                        {renderScanBar && renderScanBar()}

                        <View style={[maskSty, { width: scanLeft }]}/>
                    </View>

                    <Text style={styles.topTipText}>对准条形码／二维码进行识别</Text>

                    {
                        renderBottomView ? renderBottomView() :
                        <View style={styles.foterWrap}>
                            <TouchableOpacity style={styles.btnContainer} onPress={this.gotoPickCode} activeOpacity={1}>
                                <Image style={styles.btnImage} source={require('../../assets/imgs/pickUpCode.png')} />

                                <Text style={styles.btnText}>输入提货码</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnContainer} onPress={this.onChangeFlashMode} activeOpacity={1}>
                                <Image style={styles.btnImage} source={rflashMode ? require('../../assets/imgs/flashOn.png') : require('../../assets/imgs/flashOff.png')} />

                                <Text style={styles.btnText}>{rflashMode ? '关闭手电筒' : '打开手电筒'}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        )
    }
}
