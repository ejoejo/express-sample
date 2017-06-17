var Note = require('./note');
var $ = require('jquery');
var Storage = require('./my-storage');

$(function () {
    var db = new Storage("localStorage");
    var notes = db.getCollection('notes');

    if (notes.length > 0) {

        var $stickies = $('#stickies');
        var note = [];
        for (var index = 0; index < notes.length; index++) {
            var $note = $('<li>');
            note = db.getItem(notes[index]);
            $note.text(note.text);
            $note.css('background-color', note.color);
            $note.appendTo($stickies);
        }
    }

    $('#add_button').click(function () {
        var note = {
            color: $('#note_color').val(),
            text: $('#note_text').val()
        };

        db.insert('notes', note);
        var $stickies = $('#stickies');
        var $note = $('<li>');
        $note.text(note.text);
        $note.css('background-color', note.color);
        $note.appendTo($stickies);
    });
    $('#clear_button').click(function () {
        window.localStorage.clear();
        location.reload();
        return false;
    });
});