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

var Like =
/*#__PURE__*/
function () {
  function Like() {
    _classCallCheck(this, Like);

    if (document.querySelector(".like-box")) {
      _axios["default"].defaults.headers.common["X-WP-Nonce"] = universityData.nonce;
      this.events();
    }
  }

  _createClass(Like, [{
    key: "events",
    value: function events() {
      var _this = this;

      document.querySelector(".like-box").addEventListener("click", function (e) {
        return _this.ourClickDispatcher(e);
      });
    } // methods

  }, {
    key: "ourClickDispatcher",
    value: function ourClickDispatcher(e) {
      var currentLikeBox = e.target;

      while (!currentLikeBox.classList.contains("like-box")) {
        currentLikeBox = currentLikeBox.parentElement;
      }

      if (currentLikeBox.getAttribute("data-exists") == "yes") {
        this.deleteLike(currentLikeBox);
      } else {
        this.createLike(currentLikeBox);
      }
    }
  }, {
    key: "createLike",
    value: function createLike(currentLikeBox) {
      var response, likeCount;
      return regeneratorRuntime.async(function createLike$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(_axios["default"].post(universityData.root_url + "/wp-json/university/v1/manageLike", {
                "professorId": currentLikeBox.getAttribute("data-professor")
              }));

            case 3:
              response = _context.sent;

              if (response.data != "Only logged in users can create a like.") {
                currentLikeBox.setAttribute("data-exists", "yes");
                likeCount = parseInt(currentLikeBox.querySelector(".like-count").innerHTML, 10);
                likeCount++;
                currentLikeBox.querySelector(".like-count").innerHTML = likeCount;
                currentLikeBox.setAttribute("data-like", response.data);
              }

              console.log(response.data);
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.log("Sorry");

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }, {
    key: "deleteLike",
    value: function deleteLike(currentLikeBox) {
      var response, likeCount;
      return regeneratorRuntime.async(function deleteLike$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap((0, _axios["default"])({
                url: universityData.root_url + "/wp-json/university/v1/manageLike",
                method: 'delete',
                data: {
                  "like": currentLikeBox.getAttribute("data-like")
                }
              }));

            case 3:
              response = _context2.sent;
              currentLikeBox.setAttribute("data-exists", "no");
              likeCount = parseInt(currentLikeBox.querySelector(".like-count").innerHTML, 10);
              likeCount--;
              currentLikeBox.querySelector(".like-count").innerHTML = likeCount;
              currentLikeBox.setAttribute("data-like", "");
              console.log(response.data);
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 12]]);
    }
  }]);

  return Like;
}();

var _default = Like;
exports["default"] = _default;