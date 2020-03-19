/**
 * @author wudi
 * @date 2020/02/14
 */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    scanMaskContainer: { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%' 
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
    }
})
