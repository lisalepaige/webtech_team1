var url = "/";



primus = Primus.connect(url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
            ,
        min: 500 // Number: The minimum delay before we try reconnect.
            ,
        retries: 10 // Number: How many times we should try to reconnect.
    }
});


document.querySelector(".question__btn--btn").addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Question posted ...");
    
    var QuestionName = document.querySelector(".question__input").value;
    var searchName = QuestionName.split(" ").join("-");
    searchName = searchName.split("?").join("");

    var loggedInUser = document.getElementById("userid").getAttribute("data-user"); 
    console.log("User: " + loggedInUser);   
    var date = new Date(Date.now()).toLocaleString();
    console.log("Date: "+date);
    console.log("Searchname: "+searchName);
    console.log("Question: "+QuestionName);

    primus.write({
        type: "question",
        search_name: searchName,
        loggedInUser: loggedInUser,
        date : date,
        question : QuestionName
    });
});







primus.on("data", function message(data) {
    console.log("Data received! "+data);
});