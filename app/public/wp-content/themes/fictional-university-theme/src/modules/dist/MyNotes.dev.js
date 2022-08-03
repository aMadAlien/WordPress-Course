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

var MyNotes =
/*#__PURE__*/
function () {
  function MyNotes() {
    _classCallCheck(this, MyNotes);

    if (document.querySelector("#my-notes")) {
      _axios["default"].defaults.headers.common["X-WP-Nonce"] = universityData.nonce;
      this.myNotes = document.querySelector("#my-notes");
      this.events();
    }
  }

  _createClass(MyNotes, [{
    key: "events",
    value: function events() {
      var _this = this;

      this.myNotes.addEventListener("click", function (e) {
        return _this.clickHandler(e);
      });
      document.querySelector(".submit-note").addEventListener("click", function () {
        return _this.createNote();
      });
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(e) {
      if (e.target.classList.contains("delete-note") || e.target.classList.contains("fa-trash-o")) this.deleteNote(e);
      if (e.target.classList.contains("edit-note") || e.target.classList.contains("fa-pencil") || e.target.classList.contains("fa-times")) this.editNote(e);
      if (e.target.classList.contains("update-note") || e.target.classList.contains("fa-arrow-right")) this.updateNote(e);
    }
  }, {
    key: "findNearestParentLi",
    value: function findNearestParentLi(el) {
      var thisNote = el;

      while (thisNote.tagName != "LI") {
        thisNote = thisNote.parentElement;
      }

      return thisNote;
    } // edit a note

  }, {
    key: "editNote",
    value: function editNote(e) {
      var thisNote = this.findNearestParentLi(e.target);

      if (thisNote.getAttribute("data-state") == "editable") {
        this.makeNoteReadOnly(thisNote);
      } else {
        this.makeNoteEditable(thisNote);
      }
    }
  }, {
    key: "makeNoteEditable",
    value: function makeNoteEditable(thisNote) {
      // changes "edit" btn to "cancel" one
      thisNote.querySelector(".edit-note").innerHTML = '<i class="fa fa-times" aria-hidden="true"></i> Cancel';
      thisNote.querySelector(".note-title-field").removeAttribute("readonly");
      thisNote.querySelector(".note-body-field").removeAttribute("readonly");
      thisNote.querySelector(".note-title-field").classList.add("note-active-field");
      thisNote.querySelector(".note-body-field").classList.add("note-active-field");
      thisNote.querySelector(".update-note").classList.add("update-note--visible");
      thisNote.setAttribute("data-state", "editable");
    }
  }, {
    key: "makeNoteReadOnly",
    value: function makeNoteReadOnly(thisNote) {
      thisNote.querySelector(".edit-note").innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i> Edit';
      thisNote.querySelector(".note-title-field").setAttribute("readonly", "true");
      thisNote.querySelector(".note-body-field").setAttribute("readonly", "true");
      thisNote.querySelector(".note-title-field").classList.remove("note-active-field");
      thisNote.querySelector(".note-body-field").classList.remove("note-active-field");
      thisNote.querySelector(".update-note").classList.remove("update-note--visible");
      thisNote.setAttribute("data-state", "cancel");
    } // delete a note

  }, {
    key: "deleteNote",
    value: function deleteNote(e) {
      var thisNote, response;
      return regeneratorRuntime.async(function deleteNote$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              thisNote = this.findNearestParentLi(e.target);
              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap(_axios["default"]["delete"](universityData.root_url + "/wp-json/wp/v2/note/" + thisNote.getAttribute("data-id")));

            case 4:
              response = _context.sent;
              thisNote.style.height = "".concat(thisNote.offsetHeight, "px");
              setTimeout(function () {
                thisNote.classList.add("fade-out");
              }, 20);
              setTimeout(function () {
                thisNote.remove();
              }, 401);

              if (response.data.userNoteCount < 5) {
                document.querySelector(".note-limit-message").classList.remove("active");
              }

              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);
              console.log("Sorry");

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[1, 11]]);
    } // saves new notes data in wp data base

  }, {
    key: "updateNote",
    value: function updateNote(e) {
      var thisNote, ourUpdatedPost, response;
      return regeneratorRuntime.async(function updateNote$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              thisNote = this.findNearestParentLi(e.target);
              ourUpdatedPost = {
                "title": thisNote.querySelector(".note-title-field").value,
                "content": thisNote.querySelector(".note-body-field").value
              };
              _context2.prev = 2;
              _context2.next = 5;
              return regeneratorRuntime.awrap(_axios["default"].post(universityData.root_url + "/wp-json/wp/v2/note/" + thisNote.getAttribute("data-id"), ourUpdatedPost));

            case 5:
              response = _context2.sent;
              this.makeNoteReadOnly(thisNote);
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](2);
              console.log("Sorry");

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[2, 9]]);
    } // create a new note

  }, {
    key: "createNote",
    value: function createNote() {
      var ourNewPost, response, finalHeight, newlyCreated;
      return regeneratorRuntime.async(function createNote$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              ourNewPost = {
                "title": document.querySelector(".new-note-title").value,
                "content": document.querySelector(".new-note-body").value,
                'status': 'publish'
              };
              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap(_axios["default"].post(universityData.root_url + "/wp-json/wp/v2/note/", ourNewPost));

            case 4:
              response = _context3.sent;

              if (response.data != "You have reached your note limit.") {
                document.querySelector(".new-note-title").value = "";
                document.querySelector(".new-note-body").value = "";
                document.querySelector("#my-notes").insertAdjacentHTML("afterbegin", " <li data-id=\"".concat(response.data.id, "\" class=\"fade-in-calc\">\n                        <input readonly class=\"note-title-field\" value=\"").concat(response.data.title.raw, "\">\n                        <span class=\"edit-note\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Edit</span>\n                        <span class=\"delete-note\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete</span>\n                        <textarea readonly class=\"note-body-field\">").concat(response.data.content.raw, "</textarea>\n                        <span class=\"update-note btn btn--blue btn--small\"><i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i> Save</span>\n                    </li>")); // notice in the above HTML for the new <li> I gave it a class of fade-in-calc which will make it invisible temporarily so we can count its natural height

                // browser needs a specific height to transition to, you can't transition to 'auto' height
                newlyCreated = document.querySelector("#my-notes li"); // give the browser 30 milliseconds to have the invisible element added to the DOM before moving on

                setTimeout(function () {
                  finalHeight = "".concat(newlyCreated.offsetHeight, "px");
                  newlyCreated.style.height = "0px";
                }, 30); // give the browser another 20 milliseconds to count the height of the invisible element before moving on

                setTimeout(function () {
                  newlyCreated.classList.remove("fade-in-calc");
                  newlyCreated.style.height = finalHeight;
                }, 50); // wait the duration of the CSS transition before removing the hardcoded calculated height from the element so that our design is responsive once again

                setTimeout(function () {
                  newlyCreated.style.removeProperty("height");
                }, 450);
              } else {
                document.querySelector(".note-limit-message").classList.add("active");
              }

              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);
              console.error(_context3.t0);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[1, 8]]);
    }
  }]);

  return MyNotes;
}();

var _default = MyNotes;
exports["default"] = _default;