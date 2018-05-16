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
    console.log("user: " + loggedInUser);   
    var date = new Date(Date.now()).toLocaleString();

    primus.write({
        type: "question",
        search_name: searchName,
        loggedInUser: loggedInUser,
        date : date,
        question : QuestionName
    });
});







primus.on("data", function message(data) {


    //lees laatste deel van pagina URL
    var search_name = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);

    //kijk of de pagina die je ziet de pagina is waarop gepost wordt
    if (data.page == search_name) {

        if (data.type == "answer") {
            addReaction(data.content, data.id, data.user, data.img);
            
        } else if (data.type == "comment") {
            addComment(data.content, data.user, data.img);
            
        } else if (data.type == "like") {
            console.log("Dit is data...");
            console.log(data);
            updateLikes(data.img, data.user);

        }
    }

});