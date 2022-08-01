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

    this.resultsDiv = (0, _jquery["default"])("#search-overlay__results");
    this.openBtn = (0, _jquery["default"])(".js-search-trigger");
    this.closeBtn = (0, _jquery["default"])(".search-overlay__close");
    this.searchOverlay = (0, _jquery["default"])(".search-overlay");
    this.searchField = (0, _jquery["default"])("#search-term");
    this.events();
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.prevValue;
    this.typingTimer;
  } // 2. events


  _createClass(Search, [{
    key: "events",
    value: function events() {
      this.openBtn.on("click", this.openOverlay.bind(this));
      this.closeBtn.on("click", this.closeOverlay.bind(this));
      (0, _jquery["default"])(document).on("keydown", this.keyPressDispatcher.bind(this));
      this.searchField.on("keyup", this.typingLogic.bind(this));
    } // 3. methods

  }, {
    key: "typingLogic",
    value: function typingLogic() {
      if (this.searchField.val() != this.prevValue) {
        clearTimeout(this.typingTimer);

        if (this.searchField.val()) {
          // displays spinner before results
          if (!this.isSpinnerVisible) {
            this.resultsDiv.html('<div class="spinner-loader"</div>');
            this.isSpinnerVisible = true;
          } // allows display results after some time(1.5s)


          this.typingTimer = setTimeout(this.getResults.bind(this), 1500);
        } else {
          this.resultsDiv.html('');
          this.isSpinnerVisible = false;
        }
      }

      this.prevValue = this.searchField.val();
    } // displays results

  }, {
    key: "getResults",
    value: function getResults() {
      _jquery["default"].getJSON('http://fictional-university.local/wp-json/wp/v2/posts?search=' + this.searchField.val(), function (posts) {
        alert(posts[0].title.rendered);
      });
    } // check which key was pressed

  }, {
    key: "keyPressDispatcher",
    value: function keyPressDispatcher(e) {
      if (e.keyCode == 83 && !this.isOverlayOpen) {
        this.openOverlay();
      }

      if (e.keyCode == 27 && this.isOverlayOpen) {
        this.closeOverlay();
      }
    } // opens search

  }, {
    key: "openOverlay",
    value: function openOverlay() {
      this.searchOverlay.addClass("search-overlay--active");
      (0, _jquery["default"])("body").addClass("body-no-scroll");
      this.isOverlayOpen = true;
    } // close search

  }, {
    key: "closeOverlay",
    value: function closeOverlay() {
      this.searchOverlay.removeClass("search-overlay--active");
      (0, _jquery["default"])("body").removeClass("body-no-scroll");
      this.isOverlayOpen = false;
    }
  }]);

  return Search;
}();

var _default = Search;
exports["default"] = _default;