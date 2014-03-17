var restify = require('restify');

var aws = require('aws-sdk');
aws.config.loadFromPath('./config.json');
//var dynamodb = new aws.DynamoDB.Client();
var dynamodb = new aws.DynamoDB();

var ip_addr = '0.0.0.0';
var port = '8080';

var server = restify.createServer({
    name : "localjobs"
});

server.pre(restify.pre.userAgentConnection());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

function findAllGroups(req, res , next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    var params = {
        TableName: 'Group',
        ReturnConsumedCapacity: 'NONE',
        Segment: 0,
        Select: 'ALL_ATTRIBUTES',
        TotalSegments: 1
    };

    dynamodb.scan(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            return next(err);
        } else {
            console.log(data);           // successful response
            res.send(200 , data);
            return next();
        }
    });
}

function findGroup(req, res , next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    var params = {
        TableName: 'Group',
        Key: {
            Group: {
                S: req.params.hash
            }
        },
        ReturnConsumedCapacity: 'NONE',
    };

    dynamodb.getItem(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            return next(err);
        } else {
            console.log(data);           // successful response
            res.send(200 , data);
            return next();
        }
    });
}

function postNewGroup(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    var item = {
        Group:{S:req.params.hash},
        LastPostDateTime:{S:req.params.datetime},
        LastPostBy:{S:req.params.by}
    };

    var params = {
        TableName: 'Group',
        Item: item
    };

    dynamodb.putItem(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            return next(err);
        } else {
            console.log(data);           // successful response
            res.send(200 , data);
            return next();
        }
    });
}

function putGroup(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    var key = {
        Group:{S:req.params.hash}
    };

    var attributes = {
        LastPostDateTime: {
             Action: 'PUT',
             Value: {
                S:req.params.datetime
            }
        },
        LastPostBy: {
             Action: 'PUT',
             Value: {
                S:req.params.by
            }
        }
    };

    var params = {
        TableName: 'Group',
        Key: key,
        AttributeUpdates: attributes
    };

    dynamodb.updateItem(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            return next(err);
        } else {
            console.log(data);           // successful response
            res.send(200 , data);
            return next();
        }
    });
}

function deleteGroup(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    var params = {
        TableName: 'Group',
        Key: {
            Group: {
                S: req.params.hash
            }
        }
    };

    dynamodb.deleteItem(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            return next(err);
        } else {
            console.log(data);           // successful response
            res.send(200 , data);
            return next();
        }
    });
}

var GROUPS = '/Groups';
var GROUP = '/Group';
server.get({path : GROUPS , version : '0.0.1'} , findAllGroups);
server.post({path : GROUP +'/:hash', version:  '0.0.1'}, postNewGroup);
server.get({path : GROUP +'/:hash' , version : '0.0.1'}, findGroup);
server.put({path : GROUP +'/:hash' , version:  '0.0.1'}, putGroup);
server.del({path : GROUP +'/:hash' , version:  '0.0.1'}, deleteGroup);


server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});
