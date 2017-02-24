var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
//OLD var url = 'mongodb://interface:interface@ds025180.mlab.com:25180/pankajtestmongodb';
var url = 'mongodb://allapurnima:ice12345@ds151909.mlab.com:51909/iceteam';
//NEW mongodb://<dbuser>:<dbpassword>@ds153239.mlab.com:53239/cxnheroku


var insertDocument = function(db, callback) {
   db.collection('ICE').insertOne( {
      "1" : "ICETest2"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a json object into mlab 'ICE' collection.");
    callback();
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});