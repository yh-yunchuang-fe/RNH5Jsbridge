"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RNH5JsBridge = function RNH5JsBridge(props) {
  var _this = this;

  _classCallCheck(this, RNH5JsBridge);

  _defineProperty(this, "init", function (params) {
    if (params) {
      _this.appName = params.appName;
    }

    window.afterReceiveMessage = function (message) {
      this.afterReceiveMessage(message);
    };
  });

  _defineProperty(this, "afterReceiveMessage", function (data) {
    var command = data.command;
    var payload = data.payload;

    if (_this.eventArr.indexOf(command) < 0) {
      return;
    } //todo func类型检查


    var handlersObj = _this.handlers[command];

    if (!handlersObj) {
      return;
    }

    _this.handlers[command]['callback'](payload);

    if (handlersObj.once) {
      _this.off(command);
    }
  });

  _defineProperty(this, "invoke", function (command, payload, callback) {
    if (window.ReactNativeWebView) {
      if (callback) {
        _this.once(command, callback);
      }

      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'invoke',
        command: command,
        payload: payload,
        callback: !!callback
      }));
    }
  });

  _defineProperty(this, "call", function (command, payload, callback) {
    if (window.ReactNativeWebView) {
      if (callback) {
        _this.once(command, callback);
      }

      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'call',
        command: command,
        payload: payload,
        callback: !!callback
      }));
    }
  });

  _defineProperty(this, "on", function (command, callback) {
    if (!command) {
      return console.error('事件格式不正确');
    }

    _this.eventArr.push(command);

    _this.handlers[command] = {
      callback: callback
    };
  });

  _defineProperty(this, "once", function (command, callback) {
    if (!command) {
      return console.error('事件格式不正确');
    }

    _this.eventArr.push(command);

    _this.handlers[command] = {
      once: true,
      callback: callback
    };
  });

  _defineProperty(this, "off", function (command) {
    var eventIndex = _this.eventArr.findIndex(function (item) {
      return item == command;
    });

    if (eventIndex < 0) {
      return;
    }

    _this.eventArr.splice(eventIndex, 1);

    delete _this.handlers[command];
  });

  _defineProperty(this, "ready", function (callback) {
    _this.on('ready', function () {
      _this.off('ready');

      callback && callback();
    });
  });

  _defineProperty(this, "error", function (callback) {
    _this.on('error', callback);
  });

  if (props) {
    this.appName = props.appName;
  }

  this.eventArr = [];
  this.handlers = {};
};

var _default = RNH5JsBridge;
exports["default"] = _default;