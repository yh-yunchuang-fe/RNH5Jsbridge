import {StyleSheet} from 'react-native'
// @ts-ignore
import {isIOS, getStatusBarHeight} from '@lib/screenUtils'
// @ts-ignore
import variables from '@style/variables'

export default StyleSheet.create({
    header: {
        paddingTop: isIOS() ? getStatusBarHeight() : 0,
        backgroundColor: variables.header_bg,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD'
    },
    headerContainer: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    leftBtn: {
        position: 'absolute',
        width: 31,
        height: 30,
        padding: 5,
        paddingRight: 10,
        left: 5,
        top: 7,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
    },
    title: {
        flex: 1,
        paddingHorizontal: 35,
        fontSize: variables.title_font_size,
        color: variables.color_base,
        textAlign: 'center',
    }
})
