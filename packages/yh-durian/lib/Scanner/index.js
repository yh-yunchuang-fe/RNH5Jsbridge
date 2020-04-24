"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NormalUSBScanner = _reactNative.NativeModules.NormalUSBScanner;

var Scanner = /*#__PURE__*/function () {
  function Scanner() {
    _classCallCheck(this, Scanner);

    _defineProperty(this, "onReceiveScanResult", null);

    _defineProperty(this, "subscriber", null);

    this.onReceiveScanResult = null;
    this.subscriber = null;
  }

  _createClass(Scanner, [{
    key: "setOnReceiveScanResule",
    value: function setOnReceiveScanResule(cb) {
      this.onReceiveScanResult = cb;
    }
  }, {
    key: "startScan",
    value: function startScan() {
      NormalUSBScanner.reset();

      if (!this.onReceiveScanResult || typeof this.onReceiveScanResult !== 'function') {
        throw new Error('需要调用setOnReceiveScanResule来设置scanner回调');
      }

      if (!!this.subscriber) {
        this.subscriber.remove();
      }

      this.subscriber = _reactNative.DeviceEventEmitter.addListener('receiveDataScanResult', this.onReceiveScanResult);
    }
  }, {
    key: "stopScan",
    value: function stopScan() {
      !!this.subscriber && this.subscriber.remove();
    }
  }]);

  return Scanner;
}();

var scanner = new Scanner();
var _default = scanner;
exports["default"] = _default;