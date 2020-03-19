/**
 * @author wudi
 * @date 2020/02/14
 */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    operateBarContainer: {
        position: 'relative',
        zIndex: 22,
        height: 123,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancelText: {
        color: '#fff',
        fontSize: 16
    },
    repeatText: {
        color: '#FE8F1D',
        fontSize: 16
    },
    cancelBtnWrapper: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    capture: {
        marginLeft: 70,
        marginRight: 63
    },
    photoBtn: {
        width: 76,
        height: 76,
        backgroundColor: '#F53333',
        borderRadius: 38,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photoSmallCircle: {
        width: 66,
        height: 66,
        backgroundColor: 'transparent',
        borderRadius: 33,
        borderWidth: 3,
        borderColor: '#000',
    },
    hidden: {
        opacity: 0
    }
})
