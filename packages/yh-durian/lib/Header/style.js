"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _screenUtils = require("@lib/screenUtils");

var _variables = _interopRequireDefault(require("@style/variables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
// @ts-ignore
var _default = _reactNative.StyleSheet.create({
  header: {
    paddingTop: (0, _screenUtils.isIOS)() ? (0, _screenUtils.getStatusBarHeight)() : 0,
    backgroundColor: _variables["default"].header_bg,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD'
  },
  headerContainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  leftBtn: {
    position: 'absolute',
    width: 31,
    height: 30,
    padding: 5,
    paddingRight: 10,
    left: 5,
    top: 7,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  title: {
    flex: 1,
    paddingHorizontal: 35,
    fontSize: _variables["default"].title_font_size,
    color: _variables["default"].color_base,
    textAlign: 'center'
  }
});

exports["default"] = _default;