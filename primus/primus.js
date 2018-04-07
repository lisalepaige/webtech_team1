exports.kickstart = function(server) {
    
    const Primus = require("primus");
    let primus = new Primus(server, { /* options */});
    
    // primus.save(__dirname + '/primuslib.js'); // GENERATE CLIENT 1 TIME

    primus.on("connection", function(spark) { // spark = 1 connection
        console.log("spark connected");

        spark.on("data", function(data) {
            primus.write(data);
        });
    } );
}