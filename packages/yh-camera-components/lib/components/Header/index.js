/*
 * @Author: wudi
 * @Date: 2021-09-06 18:28:17
 * @LastEditTime: 2021-09-06 18:34:45
 * @LastEditors: wudi
 * @Description: In User Settings Edit
 * @FilePath: /RNH5Jsbridge/packages/yh-camera-components/lib/components/Header/index.js
 */
import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Icon } from '@yh-rn/gingko'
import styles from './style'
import { withNavigation } from 'react-navigation'

class Header extends Component {
  static defaultProps = {
    needGoBack: true,
    onBack: null,
    leftView: null,
    rightView: null
  }
  onBack = () => {
    // @ts-ignore
    const {
      onBack,
      navigation
    } = this.props

    if (!!onBack) {
      onBack()
    } else {
      navigation.goBack()
    }
  }
  renderLeftView = () => {
    const {
      leftView,
      needGoBack
    } = this.props

    if (!!leftView) {
      return leftView
    } else {
      return needGoBack && <TouchableOpacity style={styles.leftBtn} onPress={this.onBack}>
            <Icon color={'#999'} name='back' size={20} />
        </TouchableOpacity>
    }
  }
  renderRightView = () => {
    const {
      rightView
    } = this.props

    if (!!rightView) {
      return rightView
    }
  }

  render() {
    // @ts-ignore
    const {
      children
    } = this.props
    return <View style={styles.header}>
            <View style={styles.headerContainer}>
                {this.renderLeftView()}
                <Text style={styles.title} numberOfLines={1}>{children}</Text>
                {this.renderRightView()}
            </View>
        </View>
  }

} // @ts-ignore


export default withNavigation(Header)