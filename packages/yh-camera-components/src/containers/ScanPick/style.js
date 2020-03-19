import {StyleSheet, Dimensions, Platform} from 'react-native'
import {isIOS, getStatusBarHeight} from '../../utails/screenUtils'
import styleVariables from '../../assets/style/variables'
const {height} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#000',
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
        borderRadius: styleVariables.radius,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: Platform.OS === 'ios' ? height <= 568 ? 20 : 35 : height <= 600 ? 15 : 20
    },
    pickCodeButtonText: {
        fontSize: 18,
        color: '#fff'
    },
    lightContainerStyle: {
        width: 200,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    lightStyle: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        marginTop: Platform.OS === 'ios' ? height <= 568 ? 15 : 20 : height <= 600 ? 12 : 20,
        marginBottom: 6
    }
})

export default styles
