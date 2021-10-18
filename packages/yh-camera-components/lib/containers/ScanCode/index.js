/*
 * @Author: wudi
 * @Date: 2021-09-06 18:22:56
 * @LastEditTime: 2021-10-15 15:56:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /RNH5Jsbridge/packages/yh-camera-components/lib/containers/ScanCode/index.js
 */
import React, {Component} from 'react'
import { View, ScrollView, Keyboard, TextInput } from 'react-native'
import { Button } from 'gingko'
import { Header } from '../../components'
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
                <View style={styles.textInputWrapper}>
                    <TextInput
                        value={pickCode}
                        style={styles.textInput}
                        placeholder='请输入提货码'
                        placeholderTextColor={styleVariables.placeholder_color}
                        onChangeText={this.onChangeText}/>
                </View>
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
