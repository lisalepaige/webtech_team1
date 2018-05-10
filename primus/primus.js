var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// blueprint (define layout)
var questionsDataSchema = Schema.questionsDataSchema;

var QuestionsData = mongoose.model('QuestionsData', questionsDataSchema);

function saveAnswer(lengte, content, search_name) {
    console.log("Aantal Antw", lengte);
    var newId = lengte + 1;
    console.log("New Id", newId);

    QuestionsData.update({ search_name: search_name }, { $push: { 'answers': { _id: newId, text: content, count: null } } }, function (err, raw) {
      /*var searchname;
      if (err) {
        res.send(err);
      } else {
        var id = req.params.id;
        QuestionsData.findOne({
          search_name: id
        })
          .then(function (result) {
            if (result == null) {
              res.render('error', {
                message: 'id not found'
              });
            } else {
              searchname = result.search_name;
            }
          });*/
          if (err) {
            res.send(err);
          } else {
            var id = search_name;
            
          }
        console.log(raw);
    });
  }

  function saveComment(lengte) {
    console.log("Saving comment on ", lengte);
    QuestionsData.update({ search_name: req.params.id, 'answers._id': lengte }, { $push: { 'answers.$.comments': { text: req.body.comment } } }, function (err, raw) {
      if (err) {
        res.send(err);
      } else {
        res.end();
      }

      console.log(raw);
    });

  }


exports.kickstart = function(server) {
    
    const Primus = require("primus");
    let primus = new Primus(server, { /* options */});
    
    // primus.save(__dirname + '/primuslib.js'); // GENERATE CLIENT 1 TIME

    primus.on("connection", function(spark) { // spark = 1 connection
        console.log("spark connected");

        

        spark.on("data", function(data) {
            QuestionsData.distinct('answers').exec(function (err, res) {
                console.log("Lengte", res.length);
                var lengte = res.length;
            
                if (data.type == "answer") {
                  saveAnswer(lengte, data.content, data.search_name);
                  //console.log("Saving answer =", answer);
                }
                
                if (data.type == "comment") {
                  saveComment(lengte);
                  console.log("Saving comment =", comment);
                }
            
            });
            
            
            primus.write({page : data.search_name, content : data.content});
        });
    } );
}