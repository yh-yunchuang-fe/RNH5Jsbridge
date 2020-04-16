import React, {Component} from 'react'
import {View, Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native'
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
        cornerSize: 20,
        cornerColor: '#24A8E8',
        cornerBorderWidth: 3,
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
            top,
            width = 250, 
            height = 250,
            maskColor,
            rflashMode,
            goBack,
            renderScanBar,
            renderTopView,
            renderBottomView,
            borderColor, 
            borderWidth,
            cornerSize,
            cornerColor,
            cornerBorderWidth,
        } = this.props
        const maskSty = maskColor ? { backgroundColor: maskColor } : null
        const scanTop = top ? top : (deviceHeight - height) / 2
        const scanBottom = deviceHeight - scanTop - height
        const scanLeft = (deviceWidth - width) / 2
        const scanBorderSty = { borderColor, borderWidth }
        const cornerSty = {
            width: cornerSize,
            height: cornerSize,
            borderColor: cornerColor,
            borderWidth: cornerBorderWidth
        }

        return (
            <View style={styles.scanMaskContainer}>
                <View style={[styles.sideView, maskSty, { height: scanTop }]}>
                    {
                        !!renderTopView ? renderTopView() :
                        <View style={styles.topContainer}>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity onPress={goBack}>
                                    <View style={styles.backBtn}>
                                        <Icon name='chevron-left' color='#fff' />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.topTipText}>将条形码／二维码放入框内</Text>
                        </View>
                    }
                </View>

                <View style={styles.center}>
                    <View style={[styles.sideView, maskSty, { width: scanLeft }]}/>
                    <View style={[styles.scanWrap, { width, height }, scanBorderSty]}>
                        <View style={[cornerSty, styles.cornerTopLeft]}/>
                        <View style={[cornerSty, styles.cornerTopRight]}/>
                        <View style={[cornerSty, styles.cornerBottomLeft]}/>
                        <View style={[cornerSty, styles.cornerBottomRight]}/>
                        {renderScanBar && renderScanBar()}
                    </View>
                    <View style={[styles.sideView, maskSty, { width: scanLeft }]}/>
                </View>

                <View style={[styles.sideView, maskSty, { height: scanBottom }]}>
                    {
                        renderBottomView ? renderBottomView() :
                        <View>
                            <TouchableOpacity style={styles.lightBtnContainer} onPress={this.onChangeFlashMode}>
                                <View style={styles.lightBtn}>
                                    <Icon name={rflashMode ? 'light-on' : 'light-off'} color='#fff' size={28} />
                                </View>
                                <Text style={styles.lightBtnText}>{rflashMode ? '关闭手电筒' : '打开手电筒'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.gotoPickCode}>
                                <View style={styles.pickCodeButton}>
                                    <Text style={styles.pickCodeButtonText}>输入提货码</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        )
    }
}
