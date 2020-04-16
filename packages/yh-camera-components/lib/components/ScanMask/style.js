/**
 * @author wudi
 * @date 2020/02/14
 */
import { StyleSheet, Dimensions, Platform } from 'react-native'
import {isIOS, getStatusBarHeight} from '../../utails/screenUtils'
const { height } = Dimensions.get('window')

export default StyleSheet.create({
    scanMaskContainer: { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        zIndex: 2
    },
    sideView: {
        backgroundColor: 'rgba(0, 0, 0, .7)'
    },
    center: {
        flexDirection: 'row'
    },
    scanWrap: {
        alignItems: 'center',
    },
    cornerTopLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    cornerTopRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0
    },
    cornerBottomLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderTopWidth: 0,
        borderRightWidth: 0
    },
    cornerBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0
    },
    scanBar: {
        width: 239,
        height: 2,
    },
    topContainer: {
        flex: 1
    },
    btnContainer: {
        flex: 1
    },
    backBtn: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        marginTop: isIOS() ? 5 + getStatusBarHeight() : 5,
        marginLeft: 10
    },
    topTipText: {
        fontSize: 16,
        color: '#fff',
        letterSpacing: 0,
        lineHeight: 22,
        textAlign: 'center',
        marginBottom: 12
    },
    lightBtnContainer: {
        width: 200,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    lightBtn: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        marginTop: Platform.OS === 'ios' ? height <= 568 ? 15 : 20 : height <= 600 ? 12 : 20,
        marginBottom: 6
    },
    lightBtnText: {
        fontSize: 14,
        color: '#fff',
        letterSpacing: 0,
        lineHeight: 20,
        textAlign: 'center',
    },
    pickCodeButton: {
        width: 250,
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: Platform.OS === 'ios' ? height <= 568 ? 20 : 35 : height <= 600 ? 15 : 20
    },
    pickCodeButtonText: {
        fontSize: 18,
        color: '#fff'
    }
})
