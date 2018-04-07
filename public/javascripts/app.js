var url = "/";

primus = Primus.connect(url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
  });



document.querySelector(".react__a").addEventListener("click", function(e) {
    var reactie = document.querySelector(".react__input").innerHTML;
    primus.write(reactie);
    console.log("clicked");
    
});



primus.on("data", function message(data) {
    

    alert("data received");
    
    var reactie = data;
    
    
    if( reactie ) {
        percent(optie);
        //title.innerHTML = optie;
    }
    
});