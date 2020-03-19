import React, {Component} from 'react'
import {View, Text, Platform, Dimensions, TouchableOpacity} from 'react-native'
import styles from './style'
import YHCamera from '../YHCamera'
import Light from '../../components/Light'
const {height} = Dimensions.get('window')

class ScanPick extends Component {
    constructor(props) {
        super(props)

    }

    onChangeFlashMode = () => {
        console.log('操作手电筒')
    }
    
    render() {
        const { rflashMode, navigation } = this.props
        return (
            <View style={styles.container}>
                <YHCamera 
                    cameraType='scan'
                    isShowScanBar={true}
                    renderTopView={() => {
                        return <View style={styles.topContainer}>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                                    <View style={styles.backBtn}>
                                        {/* <Icon name='chevron-left' color='#fff' /> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.topTipText}>将条形码／二维码放入框内</Text>
                        </View>
                    }}
                    renderBottomView={() => {
                        return <View>
                            <Light 
                                rflashMode={rflashMode} 
                                islightText={true}
                                lightStyle={styles.lightStyle}
                                lightContainerStyle={styles.lightContainerStyle}
                                changeLightState={this.onChangeFlashMode}/> 

                            <TouchableOpacity onPress={this.gotoPickCode}>
                                <View style={styles.pickCodeButton}>
                                    <Text style={styles.pickCodeButtonText}>输入提货码</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }}/>
            </View>
        )
    }
}

export default ScanPick
