var pg = require ('pg');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://allapurnima:ice12345@ds151909.mlab.com:51909/iceteam';

var pl;
var express = require('express');

var app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

pg.connect(process.env.DATABASE_URL, function(err, client) {
    if(err) {
        console.log(err);
    }
    client.on('notification', function(msg) {
        if (msg.name === 'notification' && msg.channel === 'watchers') {
            pl = JSON.parse(msg.payload);
            console.log("*========*");
            Object.keys(pl).forEach(function (key) {
                console.log(key, pl[key]);
				
				// insert into mlab
				var insertDocument = function(db, callback) {
				   db.collection('Microservice').insertOne( {
					  "event":{
						  
						  key : pl[key]
					  }
				   }, function(err, result) {
					assert.equal(err, null);
					console.log("Inserted a json object into mlab 'Microservice' collection.");
					callback();
				  });
				};

				MongoClient.connect(url, function(err, db) {
				  assert.equal(null, err);
				  insertDocument(db, function() {
					  db.close();
				  });
				});
            });
            console.log("-========-");
        }
    });
    client.query("LISTEN watchers");
});
