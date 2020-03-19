import React, {Component} from 'react'
import {View, Dimensions, Animated, StyleSheet} from 'react-native'
import styles from './style'
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
    }

    constructor(props) {
        super(props)
        this.state = {
            animatedValue: new Animated.Value(0)
        }
    }
    
    render() {
        const { 
            top,
            width = 250, 
            height = 250,
            maskColor,
            renderScanBar,
            renderTopView,
            renderBottomView,
            borderColor, 
            borderWidth,
            cornerSize,
            cornerColor,
            cornerBorderWidth
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
                    {renderTopView && renderTopView()}
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
                    {renderBottomView && renderBottomView()}
                </View>
            </View>
        )
    }
}
