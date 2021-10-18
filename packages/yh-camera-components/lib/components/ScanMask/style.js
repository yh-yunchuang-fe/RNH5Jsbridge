/**
 * @author wudi
 * @date 2020/02/14
 */
 import { StyleSheet } from 'react-native'
 import {isIOS, getStatusBarHeight} from '../../utails/screenUtils'
 
 export default StyleSheet.create({
     scanMaskContainer: { 
         position: 'absolute', 
         top: 0, 
         left: 0, 
         width: '100%', 
         height: '100%',
         zIndex: 2,
         flexDirection: 'column',
         justifyContent:'space-between'
     },
     scanMaskContent: {
         marginBottom: 77
     },
     center: {
         flexDirection: 'row',
         marginBottom: 40
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
         marginTop: isIOS() ? 25 + getStatusBarHeight() : 25,
         marginLeft: 15
     },
     topTipText: {
         fontSize: 16,
         fontWeight: '700',
         color: '#fff',
         letterSpacing: 0,
         lineHeight: 22,
         textAlign: 'center',
     },
     btnContainer: {
         alignSelf: 'center',
         alignItems: 'center',
         justifyContent: 'center'
     },
     foterWrap: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         marginHorizontal: 32,
         marginTop: 44
     },
     btnImage: {
         width: 50,
         height: 50
     },
     btnText: {
         fontSize: 14,
         color: '#FFFFFF',
         letterSpacing: 0,
         lineHeight: 20,
         textAlign: 'center',
         marginTop: 8
     },
 })
 