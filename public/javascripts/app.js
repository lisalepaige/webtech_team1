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

document.querySelector(".react__a").addEventListener("click", function (e) {
    e.preventDefault();
    var reactie = document.querySelector(".react__input").value;
    //lees laatste deel van pagina URL
    var search_name = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);

    var answers = document.querySelectorAll(".answer");

    if (answers.length == 0) {
        var last_answer = -1;
    } else {
        var last_answer = answers[answers.length - 1].getAttribute('data-id');
    }

    // id
    //var userid = document.querySelector(".userid").value;
    var loggedInUser = document.getElementsByClassName(".account__p").innerHTML; 
    primus.write({
        type: "answer",
        content: reactie,
        search_name: search_name,
        last_answer: last_answer,
        loggedInUser: loggedInUser
    });

});

document.querySelector(".react__c").addEventListener("keydown", function (e) {
    console.log("Any key...");
    if (e.key === "Enter") {
        e.preventDefault();
        console.log("Enter!");
        var comment = this.value;
        var search_name = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);

        var answers = document.querySelectorAll(".answer");
        var last_answer = answers[answers.length - 1].getAttribute('data-id');
        console.log("This is last answer " + last_answer);

        // id
        //var userid = document.querySelector(".userid").value;

        primus.write({
            type: "comment",
            content: comment,
            search_name: search_name,
            last_answer: last_answer/*,
            userid: userid*/
        });
    }
});

document.querySelector(".likes__like--a").addEventListener("click", function (e) {
    e.preventDefault();
    console.log("like clicked");
    var search_name = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
    primus.write({
        type: "like",
        search_name: search_name
    });
});




function addReaction(data, id) {
    // create new article / give class 'comments'
    var article = document.createElement("article");
    article.classList.add('comments');
    article.classList.add("answer");
    article.setAttribute("data-id", id);

    //create new paragraph / insert value from textfield into paragraph / append paragraph to article
    var par = document.createElement("p");
    par.innerHTML = data;
    article.appendChild(par);

    //create profile image / give image source / add class / append image to article
    var profileimage = document.createElement("img");
    profileimage.src = "img/user9.png";
    profileimage.classList.add('comments__pic');
    article.appendChild(profileimage);

    //create new link (name of user) / add class / insert name of user / append to article
    var usernameLink = document.createElement("a");
    usernameLink.classList.add('.comments__a');
    usernameLink.innerHTML = "Som Wan";
    article.appendChild(usernameLink);

    //add new article to comments
    var container = document.getElementById("listcomments");
    container.appendChild(article);
}

function addComment(data) {
    // create new article / give class 'comments'
    var article = document.createElement("article");
    article.classList.add('comments');
    article.classList.add('right');

    //create new paragraph / insert value from textfield into paragraph / append paragraph to article
    var par = document.createElement("p");
    par.innerHTML = data;
    article.appendChild(par);

    //create profile image / give image source / add class / append image to article
    var profileimage = document.createElement("img");
    profileimage.src = "img/user9.png";
    profileimage.classList.add('comments__pic');
    article.appendChild(profileimage);

    //create new link (name of user) / add class / insert name of user / append to article


    //add new article to comments
    var container = document.getElementById("listcomments");
    container.appendChild(article);
}

function updateLikes(newLikes) {

    var likesElem = document.querySelector(".likes__like--p");
    likesElem.innerHTML = "x " + newLikes;
}



primus.on("data", function message(data) {


    //lees laatste deel van pagina URL
    var search_name = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);

    //kijk of de pagina die je ziet de pagina is waarop gepost wordt
    if (data.page == search_name) {

        if (data.type == "answer") {
            addReaction(data.content, data.id);
        } else if (data.type == "comment") {
            addComment(data.content);
        } else if (data.type == "like") {
            updateLikes(data.likes);

        }
    }

});