// index.js
var express = require('express');
var loki = require('lokijs');
var db = new loki('mydb.json');
var app = express();
db.loadDatabase({});
var notes = db.getCollection('notes');
/*
var notes = db.addCollection('notes');
for (var index = 1; index <= 10; index++) {
    notes.insert({
        text: "筆記" + index
    });
}
db.saveDatabase();
*/
// 加入靜態檔案資料夾路徑
app.use(express.static(__dirname + '/www'));
app.set('views', __dirname + '/views');
// 設定使用的引擎為ejs
app.set('view engine', 'ejs');



app.get('/home', function (req, res) {
    res.render('home', {
        title: "Hi ejs",
        notes: notes.find({})
    });
    res.end();
});

app.listen(1234);