import React, {Component} from 'react'
import {View} from 'react-native'
import styles from './style'
import YHCamera from '../YHCamera'

class Photograph extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <YHCamera 
                    cameraType='photograph'/>
            </View>
        )
    }
}

export default Photograph
