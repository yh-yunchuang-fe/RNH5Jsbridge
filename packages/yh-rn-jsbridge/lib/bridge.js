"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RNH5JsBridge {
  constructor(props) {
    _defineProperty(this, "init", params => {
      if (params) {
        this.appName = params.appName;
      }

      window.afterReceiveMessage = messgae => {
        jsBridge.afterReceiveMessage(messgae);
      };
    });

    _defineProperty(this, "afterReceiveMessage", data => {
      if (window.ReactNativeWebView) {
        if (callback) {
          this.once(command, callback);
        }

        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'invoke',
          command: command,
          payload: JSON.stringify(params)
        }));
      }
    });

    _defineProperty(this, "invoke", (command, params) => {
      if (window.postMessage) {
        window.postMessage(JSON.stringify({
          type: 'invoke',
          command: command,
          payload: params,
          callback: !!callback
        }));
      }
    });

    _defineProperty(this, "call", (command, params) => {
      if (window.postMessage) {
        window.postMessage(JSON.stringify({
          type: 'call',
          command: command,
          payload: params,
          callback: !!callback
        }));
      }
    });

    _defineProperty(this, "on", (command, callback) => {
      if (!command) {
        return console.error('事件格式不正确');
      }

      this.eventArr.push(command);
      this.handlers[command] = {
        callback: callback
      };
    });

    _defineProperty(this, "once", (command, callback) => {
      if (!command) {
        return console.error('事件格式不正确');
      }

      this.eventArr.push(command);
      this.handlers[command] = {
        once: true,
        callback: callback
      };
    });

    _defineProperty(this, "off", command => {
      let eventIndex = this.eventArr.findIndex(item => item == command);

      if (eventIndex < 0) {
        return;
      }

      this.eventArr.splice(eventIndex, 1);
      delete this.handlers[command];
    });

    _defineProperty(this, "ready", callback => {
      this.on('ready', () => {
        this.off('ready');
        callback && callback();
      });
    });

    _defineProperty(this, "error", callback => {
      this.on('error', callback);
    });

    if (props) {
      this.appName = props.appName;
    }

    this.eventArr = [];
    this.handlers = {};
  }

}

var _default = RNH5JsBridge;
exports.default = _default;