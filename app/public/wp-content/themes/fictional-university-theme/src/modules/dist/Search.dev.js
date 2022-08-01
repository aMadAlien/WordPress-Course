"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Search =
/*#__PURE__*/
function () {
  // 1. describe and create/init an object
  function Search() {
    _classCallCheck(this, Search);

    this.openBtn = (0, _jquery["default"])(".js-search-trigger");
    this.closeBtn = (0, _jquery["default"])(".search-overlay__close");
    this.searchOverlay = (0, _jquery["default"])(".search-overlay");
    this.events();
  } // 2. events


  _createClass(Search, [{
    key: "events",
    value: function events() {
      this.openBtn.on("click", this.openOverlay.bind(this));
      this.closeBtn.on("click", this.closeOverlay.bind(this));
    } // 3. methods

  }, {
    key: "openOverlay",
    value: function openOverlay() {
      this.searchOverlay.addClass("search-overlay--active");
    }
  }, {
    key: "closeOverlay",
    value: function closeOverlay() {
      this.searchOverlay.removeClass("search-overlay--active");
    }
  }]);

  return Search;
}();

var _default = Search;
exports["default"] = _default;