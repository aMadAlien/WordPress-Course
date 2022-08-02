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

var MyNotes =
/*#__PURE__*/
function () {
  function MyNotes() {
    _classCallCheck(this, MyNotes);

    this.events();
  }

  _createClass(MyNotes, [{
    key: "events",
    value: function events() {
      (0, _jquery["default"])(".delete-note").on("click", this.deleteNote);
      (0, _jquery["default"])(".edit-note").on("click", this.editNote);
    } // edit a note

  }, {
    key: "editNote",
    value: function editNote(e) {
      var thisNote = (0, _jquery["default"])(e.target).parents("li");
      thisNote.find(".note-title-field, .note-body-field").removeAttr("readonly").addClass("note-active-field");
      thisNote.find(".update-note").addClass("update-note--visible");
    } // delete a note

  }, {
    key: "deleteNote",
    value: function deleteNote(e) {
      var thisNote = (0, _jquery["default"])(e.target).parents("li");

      _jquery["default"].ajax({
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
        },
        url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
        type: 'DELETE',
        success: function success(response) {
          // delete immediately
          thisNote.slideUp();
          console.log("Congrants");
          console.log(response);
        },
        error: function error(response) {
          console.log("Sorry");
          console.log(response);
        }
      });
    }
  }]);

  return MyNotes;
}();

var _default = MyNotes;
exports["default"] = _default;