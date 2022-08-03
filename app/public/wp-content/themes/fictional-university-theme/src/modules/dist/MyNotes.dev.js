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
      (0, _jquery["default"])(".edit-note").on("click", this.editNote.bind(this));
      (0, _jquery["default"])(".update-note").on("click", this.updateNote.bind(this));
      (0, _jquery["default"])(".submit-note").on("click", this.createNote.bind(this));
    } // edit a note

  }, {
    key: "editNote",
    value: function editNote(e) {
      var thisNote = (0, _jquery["default"])(e.target).parents("li");

      if (thisNote.data("state") == "editable") {
        // make read only
        this.makeNoteReadOnly(thisNote);
      } else {
        // make editable
        this.makeNoteEditable(thisNote);
      }
    }
  }, {
    key: "makeNoteEditable",
    value: function makeNoteEditable(thisNote) {
      // changes "edit" btn to "cancel" one
      thisNote.find(".edit-note").html('<i class="fa fa-times" aria-hidden="true"></i> Cancel');
      thisNote.find(".note-title-field, .note-body-field").removeAttr("readonly").addClass("note-active-field");
      thisNote.find(".update-note").addClass("update-note--visible");
      thisNote.data("state", "editable");
    }
  }, {
    key: "makeNoteReadOnly",
    value: function makeNoteReadOnly(thisNote) {
      thisNote.find(".edit-note").html('<i class="fa fa-pencil" aria-hidden="true"></i> Edit');
      thisNote.find(".note-title-field, .note-body-field").attr("readonly", "readonly").removeClass("note-active-field");
      thisNote.find(".update-note").removeClass("update-note--visible");
      thisNote.data("state", "cancel");
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
    } // saves new notes data in wp data base

  }, {
    key: "updateNote",
    value: function updateNote(e) {
      var _this = this;

      var thisNote = (0, _jquery["default"])(e.target).parents("li");
      var ourUpdatedPost = {
        'title': thisNote.find(".note-title-field").val(),
        'content': thisNote.find(".note-body-field").val()
      };

      _jquery["default"].ajax({
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
        },
        url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
        type: "POST",
        data: ourUpdatedPost,
        success: function success(response) {
          // saves immediately
          _this.makeNoteReadOnly(thisNote);

          console.log("Congrants");
          console.log(response);
        },
        error: function error(response) {
          console.log("Sorry");
          console.log(response);
        }
      });
    } // create a new note

  }, {
    key: "createNote",
    value: function createNote(e) {
      var ourNewPost = {
        'title': (0, _jquery["default"])(".new-note-title").val(),
        'content': (0, _jquery["default"])(".new-note-body").val(),
        'status': 'publish'
      };

      _jquery["default"].ajax({
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
        },
        url: universityData.root_url + '/wp-json/wp/v2/note/',
        type: "POST",
        data: ourNewPost,
        success: function success(response) {
          (0, _jquery["default"])(".new-note-title, .new-note-body").val('');
          (0, _jquery["default"])('<li>Imagine real data here</li>').prependTo("#my-notes").hide().slideDown();
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