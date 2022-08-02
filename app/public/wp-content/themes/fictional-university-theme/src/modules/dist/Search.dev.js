"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Search =
/*#__PURE__*/
function () {
  // 1. describe and create/initiate our object
  function Search() {
    _classCallCheck(this, Search);

    this.addSearchHTML();
    this.resultsDiv = document.querySelector("#search-overlay__results");
    this.openButton = document.querySelectorAll(".js-search-trigger");
    this.closeButton = document.querySelector(".search-overlay__close");
    this.searchOverlay = document.querySelector(".search-overlay");
    this.searchField = document.querySelector("#search-term");
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.previousValue;
    this.typingTimer;
    this.events();
  } // 2. events


  _createClass(Search, [{
    key: "events",
    value: function events() {
      var _this = this;

      this.openButton.forEach(function (el) {
        el.addEventListener("click", function (e) {
          e.preventDefault();

          _this.openOverlay();
        });
      });
      this.closeButton.addEventListener("click", function () {
        return _this.closeOverlay();
      });
      document.addEventListener("keydown", function (e) {
        return _this.keyPressDispatcher(e);
      });
      this.searchField.addEventListener("keyup", function () {
        return _this.typingLogic();
      });
    } // 3. methods (function, action...)

  }, {
    key: "typingLogic",
    value: function typingLogic() {
      if (this.searchField.value != this.previousValue) {
        clearTimeout(this.typingTimer);

        if (this.searchField.value) {
          // displays spinner before results
          if (!this.isSpinnerVisible) {
            this.resultsDiv.innerHTML = '<div class="spinner-loader"></div>';
            this.isSpinnerVisible = true;
          } // allows display results after some time(0.75s)


          this.typingTimer = setTimeout(this.getResults.bind(this), 750);
        } else {
          this.resultsDiv.innerHTML = "";
          this.isSpinnerVisible = false;
        }
      }

      this.previousValue = this.searchField.value;
    } // displays results

  }, {
    key: "getResults",
    value: function getResults() {
      var response, results;
      return regeneratorRuntime.async(function getResults$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(_axios["default"].get(universityData.root_url + "/wp-json/university/v1/search?term=" + this.searchField.value));

            case 3:
              response = _context.sent;
              results = response.data;
              this.resultsDiv.innerHTML = "\n                <div class=\"row\">\n                <div class=\"one-third\">\n                    <h2 class=\"search-overlay__section-title\">General Information</h2>\n                    ".concat(results.generalInfo.length ? '<ul class="link-list min-list">' : "<p>No general information matches that search.</p>", "\n                        ").concat(results.generalInfo.map(function (item) {
                return "<li><a href=\"".concat(item.permalink, "\">").concat(item.title, "</a> ").concat(item.postType == "post" ? "by ".concat(item.authorName) : "", "</li>");
              }).join(""), "\n                    ").concat(results.generalInfo.length ? "</ul>" : "", "\n                </div>\n                <div class=\"one-third\">\n                    <h2 class=\"search-overlay__section-title\">Programs</h2>\n                    ").concat(results.programs.length ? '<ul class="link-list min-list">' : "<p>No programs match that search. <a href=\"".concat(universityData.root_url, "/programs\">View all programs</a></p>"), "\n                        ").concat(results.programs.map(function (item) {
                return "<li><a href=\"".concat(item.permalink, "\">").concat(item.title, "</a></li>");
              }).join(""), "\n                    ").concat(results.programs.length ? "</ul>" : "", "\n\n                    <h2 class=\"search-overlay__section-title\">Professors</h2>\n                    ").concat(results.professors.length ? '<ul class="professor-cards">' : "<p>No professors match that search.</p>", "\n                        ").concat(results.professors.map(function (item) {
                return "\n                            <li class=\"professor-card__list-item\">\n                                <a class=\"professor-card\" href=\"".concat(item.permalink, "\">\n                                    <img class=\"professor-card__image\" src=\"").concat(item.image, "\">\n                                    <span class=\"professor-card__name\">").concat(item.title, "</span>\n                                </a>\n                            </li>\n                        ");
              }).join(""), "\n                    ").concat(results.professors.length ? "</ul>" : "", "\n                </div>\n\n                <div class=\"one-third\">\n                    <h2 class=\"search-overlay__section-title\">Events</h2>\n                    ").concat(results.events.length ? "" : "<p>No events match that search. <a href=\"".concat(universityData.root_url, "/events\">View all events</a></p>"), "\n                        ").concat(results.events.map(function (item) {
                return "\n                            <div class=\"event-summary\">\n                                <a class=\"event-summary__date t-center\" href=\"".concat(item.permalink, "\">\n                                    <span class=\"event-summary__month\">").concat(item.month, "</span>\n                                    <span class=\"event-summary__day\">").concat(item.day, "</span>  \n                                </a>\n                                <div class=\"event-summary__content\">\n                                    <h5 class=\"event-summary__title headline headline--tiny\"><a href=\"").concat(item.permalink, "\">").concat(item.title, "</a></h5>\n                                    <p>").concat(item.description, " <a href=\"").concat(item.permalink, "\" class=\"nu gray\">Learn more</a></p>\n                                </div>\n                            </div>\n                        ");
              }).join(""), "\n                    </div>\n                </div>\n            ");
              this.isSpinnerVisible = false; // catches a mistake

              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 9]]);
    } // check which key was pressed

  }, {
    key: "keyPressDispatcher",
    value: function keyPressDispatcher(e) {
      if (e.keyCode == 83 && !this.isOverlayOpen && document.activeElement.tagName != "INPUT" && document.activeElement.tagName != "TEXTAREA") {
        this.openOverlay();
      }

      if (e.keyCode == 27 && this.isOverlayOpen) {
        this.closeOverlay();
      }
    } // opens search

  }, {
    key: "openOverlay",
    value: function openOverlay() {
      var _this2 = this;

      this.searchOverlay.classList.add("search-overlay--active");
      document.body.classList.add("body-no-scroll");
      this.searchField.value = "";
      setTimeout(function () {
        return _this2.searchField.focus();
      }, 301);
      console.log("our open method just ran!");
      this.isOverlayOpen = true; // return false
    } // closes search

  }, {
    key: "closeOverlay",
    value: function closeOverlay() {
      this.searchOverlay.classList.remove("search-overlay--active");
      document.body.classList.remove("body-no-scroll");
      console.log("our close method just ran!");
      this.isOverlayOpen = false;
    } // SEARCH OVERLAY

  }, {
    key: "addSearchHTML",
    value: function addSearchHTML() {
      document.body.insertAdjacentHTML("beforeend", "\n            <div class=\"search-overlay\">\n                <div class=\"search-overlay__top\">\n                <div class=\"container\">\n                    <i class=\"fa fa-search search-overlay__icon\" aria-hidden=\"true\"></i>\n                    <input type=\"text\" class=\"search-term\" placeholder=\"What are you looking for?\" id=\"search-term\">\n                    <i class=\"fa fa-window-close search-overlay__close\" aria-hidden=\"true\"></i>\n                </div>\n                </div>\n                \n                <div class=\"container\">\n                <div id=\"search-overlay__results\"></div>\n                </div>\n\n            </div>\n            ");
    }
  }]);

  return Search;
}();

var _default = Search;
exports["default"] = _default;