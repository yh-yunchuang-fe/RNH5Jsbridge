import { DeviceEventEmitter, NativeModules } from 'react-native'

const NormalUSBScanner = NativeModules.NormalUSBScanner

class Scanner {
    public onReceiveScanResult = null
    public subscriber = null

    public constructor() {
        this.onReceiveScanResult = null
        this.subscriber = null
    }

    public setOnReceiveScanResule(cb: any) {
        this.onReceiveScanResult = cb
    }

    public startScan() {
        NormalUSBScanner.reset()
        if(!this.onReceiveScanResult || typeof this.onReceiveScanResult !== 'function') {
            throw new Error('需要调用setOnReceiveScanResule来设置scanner回调')
        }
        if(!!this.subscriber) {
            this.subscriber.remove();
        }
        this.subscriber = DeviceEventEmitter.addListener('receiveDataScanResult',this.onReceiveScanResult)
    }

    public stopScan() {
        !!this.subscriber && this.subscriber.remove()
    }
}

const scanner = new Scanner()

export default scanner
