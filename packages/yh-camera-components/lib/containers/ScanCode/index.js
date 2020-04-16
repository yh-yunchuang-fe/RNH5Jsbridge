import React, {Component} from 'react'
import { ScrollView, Keyboard } from 'react-native'
import { Button } from 'gingko'
import { Header } from '@/components'
import styleVariables from '../../assets/style/variables'
import styles from './style'

export default class ScanCode extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            pickCode: props.pickCode || ''
        }
    }

    componentWillUnmount() {
        this.setState({
            pickCode: ''
        })
    }

    onChangeTextInput = (val) => {
        const { onChangeTextInput } = this.props
        onChangeTextInput && onChangeTextInput(val)
    }

    onSubmit = async () => {
        Keyboard.dismiss()
        const { onSubmit } = this.props
        onSubmit && onSubmit()
    }

    render() {
        const {pickCode, pickCodeSubmiting} = this.props

        return <View>
            <Header>输入提货码</Header>
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps='handled'
                bounces={false}>
                <TextInputpickCodeSubmiting
                    value={pickCode}
                    style={styles.textInput}
                    placeholder='输入提货码'
                    placeholderTextColor={styleVariables.placeholder_color}
                    onChangeText={this.onChangeTextInput}/>
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
