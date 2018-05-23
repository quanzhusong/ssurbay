var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var MySQLStore = require('express-mysql-session')(session);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


//topicinfo
let title;
let text;
let n;

let topicinfo = {
    title,
    text,
    n
};

var dbconfig = {
    hostname: "localhost:3306",
    user: 'root',
    password: '1111',
    database: 'hello'
};

var client = mysql.createConnection(dbconfig);

/*
CREATE TABLE `kkk` (

  `bdid` bigint(11) unsigned NOT NULL,

  `name` varchar(80) NOT NULL,

  PRIMARY KEY (`bdid`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

//바디파서 post방식 데이터 전달
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));//css,js 적용할 수 있게 해줌
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.enable('trust proxy');

//세션
var sessionStore = new MySQLStore(dbconfig);
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

//bodyparser설정의 위에 있으면 제대로 작동 안함
var router = require('./router/main.js')(app, client, topicinfo);

//맨 위에 있던 코드 그냥 옮겨봄 **별 문제 없나보네
var server = app.listen(3000, function () {
    console.log("Express server has started on port 3000")
});
