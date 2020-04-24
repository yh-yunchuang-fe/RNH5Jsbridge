"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RNSensorsAnalyticsModule = _reactNative.NativeModules.RNSensorsAnalyticsModule;
var CommonModule = _reactNative.NativeModules.CommonModule;

var window = _reactNative.Dimensions.get('window');

var Track = /*#__PURE__*/function () {
  function Track(props) {
    _classCallCheck(this, Track);

    this.instance = null;
    this.presetProperty = Object.assign({
      appName: 'yhPartner',
      partner_userId: '',
      partner_deviceId: '',
      partner_deviceModel: '',
      partner_operationSystem: '',
      partner_osVersion: '',
      partner_screenWidth: window.width,
      partner_screenHeight: window.height,
      partner_eventTime: '',
      partner_shopId: '',
      partner_shopName: '',
      partner_useWifi: '',
      partner_useGps: '',
      partner_useBluetooth: '',
      partner_platform: _reactNative.Platform.OS,
      partner_version: '',
      partner_isLocAllowed: '',
      partner_userCurrentLongitude: '',
      partner_userCurrentLatitude: '',
      partner_userCurrentAltitude: '',
      partner_userCurrentAccuracy: ''
    }, props || {});
  } // 保存预置属性


  _createClass(Track, [{
    key: "savePresetProperty",
    value: function savePresetProperty(key, value) {
      this.presetProperty[key] = value;
    }
  }, {
    key: "saveMultiPresetProperty",
    value: function saveMultiPresetProperty(obj) {
      if (!obj) {
        return;
      }

      this.presetProperty = _objectSpread({}, this.presetProperty, {}, obj);
    }
  }, {
    key: "addTrack",
    value: function () {
      var _addTrack = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(trackName) {
        var params,
            info,
            key,
            eventTime,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                _context.prev = 1;
                _context.next = 4;
                return CommonModule.trackInfo();

              case 4:
                info = _context.sent;
                info = info || {};

                for (key in info) {
                  if (!key.startsWith('partner_')) {
                    info['partner_' + key] = info[key];
                    delete info[key];
                  }
                }

                this.saveMultiPresetProperty(info);
                eventTime = new Date().getTime();
                this.savePresetProperty('partner_eventTime', eventTime);
                params = _objectSpread({}, this.presetProperty, {}, params);
                console.log(params);
                RNSensorsAnalyticsModule.track(trackName, params);
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 15]]);
      }));

      function addTrack(_x) {
        return _addTrack.apply(this, arguments);
      }

      return addTrack;
    }()
  }], [{
    key: "getInstance",
    value: function getInstance(props) {
      if (!this.instance) {
        this.instance = new Track(props);
      }

      return this.instance;
    }
  }]);

  return Track;
}();

var _default = Track.getInstance();

exports["default"] = _default;