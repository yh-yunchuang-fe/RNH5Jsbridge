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

      window.afterReceiveMessage = function (message) {
        this.afterReceiveMessage(message);
      };
    });

    _defineProperty(this, "afterReceiveMessage", data => {
      let command = data.command;
      let payload = data.payload;

      if (this.eventArr.indexOf(command) < 0) {
        return;
      } //todo func类型检查


      const handlersObj = this.handlers[command];

      if (!handlersObj) {
        return;
      }

      this.handlers[command]['callback'](payload);

      if (handlersObj.once) {
        this.off(command);
      }
    });

    _defineProperty(this, "invoke", (command, payload, callback) => {
      if (window.ReactNativeWebView) {
        if (callback) {
          this.once(command, callback);
        }

        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'invoke',
          command: command,
          payload: payload,
          callback: !!callback
        }));
      }
    });

    _defineProperty(this, "call", (command, payload, callback) => {
      if (window.ReactNativeWebView) {
        if (callback) {
          this.once(command, callback);
        }

        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'call',
          command: command,
          payload: payload,
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