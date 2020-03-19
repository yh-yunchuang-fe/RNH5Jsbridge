import React, {Component} from 'react'
import {View, Animated, Alert, Easing, Image} from 'react-native'
import {Toast} from 'gingko'
import {RNCamera} from 'react-native-camera'
import styles from './style'
import ScanMask from '../../components/ScanMask'
import OperateBar from '../../components/OperateBar'

class YHCamera extends Component {
    static defaultProps = {
        mask: null,
        isFront: false,
        flashMode: false,     // 手电筒
        cameraType: 'scan',   // 当前相机类型 （'scan': 扫码，'photograph': 拍照）
        isShowScanBar: true,
        scanBarAnimateTime: 2500,
        onPermissionDenied: null, // 未获得授权使用摄像头
        permissionDialogTitle: '允许使用相机',
        permissionDialogMessage: '我们需要你的同意使用相机',
        androidCameraPermissionOptions: {
            title: '允许使用相机',
            message: '我们需要你的同意使用相机',
            buttonPositive: '确定',
            buttonNegative: '取消'
        }
    }

    constructor(props) {
        super(props)
        this.camera = null
        this.state = {
            animatedValue: new Animated.Value(0),
        }
    }

    componentDidMount() {
        const { isShowScanBar, cameraType } = this.props
        if (isShowScanBar && cameraType === 'scan') {
            this.scanBarMove()
        } else {
            Toast.loading('初始化中', {mask: true})
        }
    }

    componentWillUnmount() {
        this.state.animatedValue.stopAnimation(); //停止动画
    }

    getCameraRef = (ref) => {
        this.camera = ref
    }

    // 扫码线移动
    scanBarMove() {
        const { height = 260, scanBarAnimateTime } = this.props
        this.state.animatedValue.setValue(0)
        Animated.timing(this.state.animatedValue, {
            toValue: height,
            duration: scanBarAnimateTime,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => this.scanBarMove())
    }

    onStatusChange = (status) => {
        Toast.hide()

        const {onPermissionDenied} = this.props
        const {cameraStatus} = status

        if (cameraStatus === 'NOT_AUTHORIZED') {
            Alert.alert(
                '未获得授权使用摄像头',
                '请前往设置中开启摄像头权限',
                [
                    {text: '知道了', onPress: onPermissionDenied}
                ]
            )
        }
    }

    onBarCodeRead = (event) => {
        const { onBarCodeRead } = this.props
        onBarCodeRead && onBarCodeRead(event)
    }

    onMountError = () => {
        Toast.hide()
        const { onMountError } = this.props
        onMountError && onMountError()
    }

    onCameraReady = () => {
        Toast.hide()
        const { onCameraReady } = this.props
        onCameraReady && onCameraReady()
    }

    // 点击手电筒
    onChangeFlashMode = () => {
        const {flashMode, onChangeFlashMode} = this.props

        if (!!onChangeFlashMode) {
            onChangeFlashMode(!flashMode)
        }
    }

    // 图像生成
    takePicture = async () => {
        const {beforeTakePhoto, afterTakePhoto, onTakePhoto} = this.props
        
        Toast.loading('图像生成中', {mask: true})
        beforeTakePhoto && beforeTakePhoto()
        if (this.camera) {
            const options = { quality: 0.1, base64: true }
            const data = await this.camera.takePictureAsync(options)
            Toast.hide()
            if (!!onTakePhoto) {
                onTakePhoto(data)
            }
        }
        Toast.hide()
        afterTakePhoto && afterTakePhoto()
    }

    onCancel = () => {
        const { onCancel } = this.props
        onCancel && onCancel()
    }

    renderScanBar = () => {
        const { isShowScanBar, scanBar } = this.props
        const animatedStyle = {
            transform: [
                { translateY: this.state.animatedValue }
            ]
        }
        if (isShowScanBar) {
            let scanBarDom = null
            if (React.isValidElement(scanBar)) {
                scanBarDom = scanBar
            } else {
                scanBarDom = (<Image style={styles.scanBar} source={require('../../assets/imgs/scan-line-blue.png')}/>)
            }
            return (<Animated.View style={animatedStyle}>
                    {scanBarDom}
                </Animated.View>)
        }
        return null
    }

    renderTopView = () => {
        const { renderTopView } = this.props
        renderTopView && renderTopView()
    }

    renderBottomView = () => {
        const { renderBottomView } = this.props
        renderBottomView && renderBottomView()
    }
    
    render() {
        console.log('😄this.props😄', this.props)
        const { 
            mask,
            isFront,
            portrait,
            flashMode,
            cameraType,
            renderTopView,
            renderBottomView,
            permissionDialogTitle,
            permissionDialogMessage,
            androidCameraPermissionOptions,
        } = this.props

        const rflashMode = flashMode ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off
        const type = isFront ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back

        return (
            <View style={styles.container}>
                <View style={styles.cameraWrapper}>
                    <RNCamera 
                        ref={this.getCameraRef}
                        style={styles.preview} 
                        type={type} 
                        flashMode={rflashMode} 
                        onBarCodeRead={this.onBarCodeRead} 
                        onCameraReady={this.onCameraReady} 
                        onMountError={this.onMountError} 
                        onStatusChange={this.onStatusChange}
                        permissionDialogTitle={permissionDialogTitle} 
                        permissionDialogMessage={permissionDialogMessage} 
                        androidCameraPermissionOptions={androidCameraPermissionOptions} />
                    {!!mask && <View style={styles.maskWrapper}>
                        {mask}
                    </View>}
                </View>
                { cameraType === 'scan' && <ScanMask 
                    renderScanBar={this.renderScanBar}
                    renderTopView={renderTopView}
                    renderBottomView={renderBottomView}
                    /> }
                { cameraType === 'photograph' && <OperateBar 
                    isFront={isFront}
                    portrait={portrait}
                    rflashMode={rflashMode}
                    onCancel={this.onCancel}
                    takePicture={this.takePicture}
                    onChangeFlashMode={this.onChangeFlashMode}
                    />}
            </View>
        )
    }
}

export default YHCamera
