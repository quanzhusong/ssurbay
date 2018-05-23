exports.search = function(client, callback) {
    
    client.query('SELECT * from topic', function (err, rows) {
        callback(rows);
    });
}

/*
exports.getUserIP = function(req){
    var ipAddress;

    if(!!req.hasOwnProperty('sessionID')){
        ipAddress = req.headers['x-forwarded-for'];
    }
    else{
        if(!ipAddress){
            var forwadedIpsStr = req.headers('x-forwarded-for');
            
            if(forwadedIpsStr){
                var forwardedIps = forwadedIpsStr.split(',');
                ipAddress = forwardedIps[0];
            }
            if(!ipAddress){
                ipAddress = req.connection.remoteAddress;
            }
        }
    }
    return ipAddress;
}*/

/*promise 사용법이라는데 잘 모르겠다.
var _promise = function(param){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            if(param){
                resolve("resolve");
            }
            else{
                reject(Error("Fail"));
            }
        }, 3000);
    });
};

_promise(true).then(function(text){
    console.log(text);
},function(error){
    console.error(error);
});

*/