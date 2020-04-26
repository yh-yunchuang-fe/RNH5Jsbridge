import { DeviceEventEmitter, NativeModules } from 'react-native';
const NormalUSBScanner = NativeModules.NormalUSBScanner;

class Scanner {
  onReceiveScanResult = null;
  subscriber = null;

  constructor() {
    this.onReceiveScanResult = null;
    this.subscriber = null;
  }

  setOnReceiveScanResule(cb) {
    this.onReceiveScanResult = cb;
  }

  startScan() {
    NormalUSBScanner.reset();

    if (!this.onReceiveScanResult || typeof this.onReceiveScanResult !== 'function') {
      throw new Error('需要调用setOnReceiveScanResule来设置scanner回调');
    }

    if (!!this.subscriber) {
      this.subscriber.remove();
    }

    this.subscriber = DeviceEventEmitter.addListener('receiveDataScanResult', this.onReceiveScanResult);
  }

  stopScan() {
    !!this.subscriber && this.subscriber.remove();
  }

}

const scanner = new Scanner();
export default scanner;