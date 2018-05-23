//server.js에서 사용하기 위해 module.exports
//var func = require('../func.js');

module.exports = function (app, client, topicinfo) {
    app.get('/', function (req, res) {

        if (req.session.sessionId){
            client.query('SELECT * from topic', function(err, rows){
                topicinfo = rows;
                console.log(req.session.sessionId);
                res.render('index', {
                    topicinfo: topicinfo,
                });
                
            });/*
            func.search(client, function(result){
                topicinfo = result;
                console.log(req.session.sessionId);
                res.render('index', {
                    topicinfo: topicinfo
                });
                //res.redirect('/'+req.session.sessionId);
            });*/
        }
        else{
            req.session.sessionId = req.sessionID;
            res.redirect('/');
        }
    });

    app.get('/newtopic', function (req, res) {
        res.render('newtopic', {});
    });

    app.get('/delete', function(req,res){//시험용
        client.query('select * from topic',function(err, rows){//'select count(*) as cnt from test'
            var last = rows[rows.length-1].number;
            client.query('delete from topic where number = ?',last);
            client.query('delete from vote where number = ?',last);
        });
        res.redirect('/');
    });

    app.post('/formrecieve', function (req, res) {

        var newtitle = req.body.title;
        var newtext = req.body.text;
        var item1 = req.body.item1;
        var item2 = req.body.item2;

        var time = new Date();

        client.query('insert into topic (title, text, userId, item1, item2) values (?, ?, ?, ?, ?)', [newtitle, newtext, req.session.sessionId, item1, item2]);

        res.redirect('/');
    });
    app.get('/back', function (req, res) {
        res.redirect('/');
    });

    app.get('/sessiondelete', function(req,res){
        delete req.session.sessionId;
        res.redirect('/');
    });

    app.get('/init', function(req,res){
        client.query('alter table topic auto_increment=1;');
        res.redirect('/');
    });

    app.post('/vote', function(req,res){

        var number = req.body.id*1;
        var voted = "voted" + req.body.s;

        client.query('select userId from vote where number = ? and userId = ?', [number, req.session.sessionId], function(err, rows){
            if(rows.length > 0){
                res.redirect('/');
            }
            else{
                client.query('update topic set ?? = ?? + 1 where number = ?',[voted,voted,number]);
                client.query('insert into vote (number, userId, choice) values (?, ?, ?)',[number,req.session.sessionId,req.body.s]);
                res.redirect('/');
            }
        });
    });

    var mytopic;
    var selected;

    app.get('/mypage',function(req,res){
        /*
        client.query('select number from topic where userId = ?', req.session.sessionId, function(err, rows){
            console.log(rows);
            res.redirect('/');
        });*/
        client.query('select * from topic where userId = ?', req.session.sessionId, function(err, rows){
            mytopic = rows;
            selected = 0;
            res.render('mypage', {
                mytopic: mytopic,
                selected: selected
            });
        });
    });

    app.post('/mypage', function(req,res){
        
        selected = req.body.selected;
        res.render('mypage', {
            mytopic: mytopic,
            selected: selected
        });
    });

    app.post('/decision', function(req,res){
        var decision = req.body.s;
        var number = req.body.id*1;

        client.query('update topic set selected = ? where number = ?',[decision, number]);
        res.redirect('/mypage');
    })
};


    //뭐지
    /*
    app.put('/:user',function(req, res){
        var user = req.session.sessionId;
    })
    app.get('/:user',function(req, res){
        console.log("hello");
        res.render('index', {
            topicinfo: topicinfo
        });
    })
    app.delete('/:user',function(req, res){
        delete req.session.sessionId;
        res.redirect('/');
    });*/
