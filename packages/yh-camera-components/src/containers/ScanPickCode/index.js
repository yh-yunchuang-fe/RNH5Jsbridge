import React, {Component} from 'react'
import { TextInput, ScrollView, Keyboard } from 'react-native'
import { Button, Toast } from 'gingko'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scanPickActions from '../../reducers/actions'
import { NavigationEvents } from 'react-navigation'
import { Body, Header } from '@/components'
import styles from './style'
import styleVariables from '../../assets/style/variables'
import * as service from '../../service'

class ScanPickCode extends Component {
    static navigationOptions = {
        header: null
    }

    onWillBlur = () => {
        const {actions} = this.props

        actions.setPickCode('')
        actions.setPickCodeSubmiting(false)
    }

    componentWillUnmount = () => {
        const {actions} = this.props

        actions.setPickCode('')
        actions.setPickCodeSubmiting(false)
    }

    changeTextInput = (val) => {
        const {actions} = this.props

        actions.setPickCode(val)
    }

    submit = async () => {
        Keyboard.dismiss()
        const {pickCode, actions, navigation} = this.props
        const {state} = navigation

        if (!/^\d{16}$/.test(pickCode)) {
            return Toast.warn('找不到该订单', {duration: 1200})
        }

        actions.setPickCodeSubmiting(true)

        const json = await service.verifyPickCode({
            orderid: pickCode
        })
        console.log(json)
        actions.setPickCodeSubmiting(false)

        if (json.code !== 0) {
            Toast.fail(json.message || json.data, {duration: 1200})
            
        } else {
            setTimeout(() => {
                Toast.success('提货成功', {duration: 1500})
            })
            setTimeout(() => {
                navigation.pop(2)
                if (state.params && state.params.onSuccess) {
                    state.params.onSuccess(json.message || json.data)
                }
            }, 1000)
        }
    }

    render() {
        const {container, textInput, button} = styles
        const {pickCode, pickCodeSubmiting} = this.props

        return <Body>
            <Header>输入提货码</Header>
            <NavigationEvents
                onWillBlur={this.onWillBlur}
            />
            <ScrollView
                style={container}
                keyboardShouldPersistTaps='handled'
                bounces={false}
            >
                <TextInput
                    value={pickCode}
                    style={textInput}
                    placeholder='输入提货码'
                    placeholderTextColor={styleVariables.placeholder_color}
                    onChangeText={this.changeTextInput}

                />
                <Button
                    style={button}
                    type='primary'
                    loading={pickCodeSubmiting}
                    disabled={pickCode.length === 0 || pickCodeSubmiting}
                    onClick={this.submit}
                >
                    确认
                </Button>
            </ScrollView>
        </Body>
    }
}

const mapStateToProps = (state) => {
    const {scanPick} = state

    return {
        pickCode: scanPick.pickCode,
        pickCodeSubmiting: scanPick.pickCodeSubmiting
    }
}

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(scanPickActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanPickCode)
