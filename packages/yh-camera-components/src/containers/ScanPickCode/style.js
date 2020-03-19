import {StyleSheet} from 'react-native'
import styleVariables from '../../assets/style/variables'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        paddingHorizontal: 40
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: styleVariables.radius,
        color: styleVariables.color_base,
        borderColor: styleVariables.border_color,
        paddingHorizontal: 12

    },
    button: {
        marginTop: 25
    }
})
