import React, {Component} from 'react'
import { View, ScrollView, Keyboard, TextInput } from 'react-native'
import { Button } from 'gingko'
import { Header } from 'yh-durian'
import styleVariables from '../../assets/style/variables'
import styles from './style'

export default class ScanCode extends Component {
    onChangeText = (val) => {
        const { onChangeText } = this.props
        onChangeText && onChangeText(val)
    }

    onSubmit = async () => {
        Keyboard.dismiss()
        
        const { onSubmit } = this.props
        onSubmit && onSubmit()
    }

    render() {
        const {pickCode, pickCodeSubmiting} = this.props

        return <View style={styles.scanCodeContainer}>
            <Header>输入提货码</Header>
            <ScrollView
                style={styles.scanCodeContent}
                keyboardShouldPersistTaps='handled'
                bounces={false}>
                <TextInput
                    value={pickCode}
                    style={styles.textInput}
                    placeholder='输入提货码'
                    placeholderTextColor={styleVariables.placeholder_color}
                    onChangeText={this.onChangeText}/>
                <Button
                    style={styles.button}
                    type='primary'
                    loading={pickCodeSubmiting}
                    disabled={pickCode.length === 0 || pickCodeSubmiting}
                    onClick={this.onSubmit}>
                    确认
                </Button>
            </ScrollView>
        </View>
    }
}
