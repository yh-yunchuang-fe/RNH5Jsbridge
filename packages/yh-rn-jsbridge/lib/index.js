"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _yhCommonUtils = require("yh-common-utils");

var _bridge = _interopRequireDefault(require("./bridge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var instance = (0, _yhCommonUtils.makeSingleton)(_bridge["default"])();
var _default = instance;
exports["default"] = _default;