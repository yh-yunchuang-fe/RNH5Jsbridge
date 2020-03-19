import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 1
    },
    cameraWrapper: {
        flex: 1,
        position: 'relative'
    },
    maskWrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 2,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
})

export default styles
