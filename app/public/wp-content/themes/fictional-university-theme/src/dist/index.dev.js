"use strict";

require("../css/style.scss");

var _MobileMenu = _interopRequireDefault(require("./modules/MobileMenu"));

var _HeroSlider = _interopRequireDefault(require("./modules/HeroSlider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Our modules / classes
// Instantiate a new object using our modules/classes
var mobileMenu = new _MobileMenu["default"]();
var heroSlider = new _HeroSlider["default"]();