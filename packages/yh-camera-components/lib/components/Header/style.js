/*
 * @Author: your name
 * @Date: 2021-09-06 20:42:34
 * @LastEditTime: 2021-10-15 17:26:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /RNH5Jsbridge/packages/yh-camera-components/lib/components/Header/style.js
 */
import { StyleSheet } from 'react-native'
import { isIOS, getStatusBarHeight } from '@lib/screenUtils'
import variables from '@style/variables'

export default StyleSheet.create({
  header: {
      paddingTop: isIOS() ? getStatusBarHeight() : 0,
      backgroundColor: variables.header_bg
  },
  headerContainer: {
      height: 37,
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
      top: 4,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999
  },
  title: {
      flex: 1,
      paddingHorizontal: 55,
      fontSize: variables.title_font_size,
      fontWeight: '700',
      color: variables.color_base,
      textAlign: 'center',
  }
})
