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

var Like =
/*#__PURE__*/
function () {
  function Like() {
    _classCallCheck(this, Like);

    this.events();
  }

  _createClass(Like, [{
    key: "events",
    value: function events() {
      (0, _jquery["default"])(".like-box").on("click", this.ourClickDispatcher.bind(this));
    }
  }, {
    key: "ourClickDispatcher",
    value: function ourClickDispatcher(e) {
      var currentLikeBox = (0, _jquery["default"])(e.target).closest(".like-box");

      if (currentLikeBox.data("exists") == "yes") {
        this.deleteLike(currentLikeBox);
      } else {
        this.createLike(currentLikeBox);
      }
    }
  }, {
    key: "createLike",
    value: function createLike(currentLikeBox) {
      _jquery["default"].ajax({
        url: universityData.root_url + "/wp-json/university/v1/manageLike",
        type: "POST",
        data: {
          "professorId": currentLikeBox.data("professor")
        },
        success: function success(response) {
          console.log(response);
        },
        error: function error(response) {
          console.log(response);
        }
      });
    }
  }, {
    key: "deleteLike",
    value: function deleteLike() {
      _jquery["default"].ajax({
        url: universityData.root_url + '/wp-json/university/v1/manageLike',
        type: 'DELETE',
        success: function success(response) {
          console.log(response);
        },
        error: function error(response) {
          console.log(response);
        }
      });
    }
  }]);

  return Like;
}();

var _default = Like;
exports["default"] = _default;