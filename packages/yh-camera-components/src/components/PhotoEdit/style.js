import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    photoEditContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000',
    },
    photoWrapper: {
        flex: 1,
        position: 'relative'
    },
    photoImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 24,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    photoOperateBar: {
        position: 'relative',
        zIndex: 26,
        height: 123,
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    photoTextWrapper: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    photoCancelText: {
        color: '#fff',
        fontSize: 16
    },
    photoRephotograph: {
        color: '#fff',
        fontSize: 16,
    },
    photoCapture: {
        marginLeft: 75,
        marginRight: 75
    },
    photoCircle: {
        width: 76,
        height: 76,
        backgroundColor: '#FFF',
        borderRadius: 38,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photoCircleText: {
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
