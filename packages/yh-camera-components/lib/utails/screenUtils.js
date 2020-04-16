/**
 * @author wudi
 * @date 2020/02/15
 */
import { Dimensions, Platform } from 'react-native'

export const deviceWidth = Dimensions.get('window').width      //设备的宽度
export const deviceHeight = Dimensions.get('window').height    //设备的高度

export const designWidth = 375
export const designHeight = 667


export function isIOS() {
    return Platform.OS === 'ios'
}

export function isAndroid() {
    return Platform.OS === 'ios'
}

export function isIphoneX() {
    return Platform.OS === 'ios' && (Number((String(deviceHeight/deviceWidth)).substr(0,4)) * 100) === 216
}

//状态栏高度
export function getStatusBarHeight() {
    return isIphoneX() ? 44 : 20
}