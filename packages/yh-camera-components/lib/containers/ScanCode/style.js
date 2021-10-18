import { StyleSheet, Platform } from 'react-native'
import styleVariables from '../../assets/style/variables'

export default StyleSheet.create({
    scanCodeContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    scanCodeContent: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 15,
    },
    textInputWrapper: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: styleVariables.border_color,
    },
    textInput: {
        color: styleVariables.color_base,
        paddingHorizontal: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
        ...Platform.select({
            ios: { lineHeight: 20 },
            android: {}
        })
    },
    button: {
        height: 48,
        marginTop: 40,
        marginHorizontal: 10,
    }
})
