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

    // get user
    var loggedInUser = document.getElementById("userid").getAttribute("data-user"); 
    console.log("user: " + loggedInUser);
    
    primus.write({
        type: "answer",
        content: reactie,
        search_name: search_name,
        last_answer: last_answer,
        loggedInUser: loggedInUser
    });

});

document.querySelector(".react__c").addEventListener("keydown", function (e) {
    
    if (e.key === "Enter") {
        e.preventDefault();
        
        var comment = this.value;
        var search_name = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);

        var answers = document.querySelectorAll(".answer");
        var last_answer = answers[answers.length - 1].getAttribute('data-id');
        console.log("This is last answer " + last_answer);

        // get user
        var loggedInUser = document.getElementById("userid").getAttribute("data-user"); 
        console.log("user: " + loggedInUser);

        primus.write({
            type: "comment",
            content: comment,
            search_name: search_name,
            last_answer: last_answer,
            loggedInUser: loggedInUser
        });
    }
});

document.querySelector(".likes__like--a").addEventListener("click", function (e) {
    e.preventDefault();
    
    var search_name = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);

    var loggedInUser = document.getElementById("userid").getAttribute("data-user"); 
    console.log("user: " + loggedInUser);   

    primus.write({
        type: "like",
        search_name: search_name,
        loggedInUser: loggedInUser
    });
});




function addReaction(data, id, user, img) {
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
    profileimage.src = img;
    profileimage.classList.add('comments__pic');
    article.appendChild(profileimage);

    //create new link (name of user) / add class / insert name of user / append to article
    var usernameLink = document.createElement("a");
    usernameLink.classList.add('.comments__a');
    usernameLink.innerHTML = user;
    article.appendChild(usernameLink);

    //add new article to comments
    var container = document.getElementById("listcomments");
    container.appendChild(article);
}

function addComment(data, user, img) {
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
    profileimage.src = img;
    profileimage.classList.add('comments__pic');
    article.appendChild(profileimage);

    //create new link (name of user) / add class / insert name of user / append to article
    var usernameLink = document.createElement("a");
    usernameLink.classList.add('.comments__a');
    usernameLink.innerHTML = user;
    article.appendChild(usernameLink);


    //add new article to comments
    var container = document.getElementById("listcomments");
    container.appendChild(article);
}

function updateLikes(img, user) {

    var likesElem = document.querySelector(".likes__like--p");
    var count = likesElem.innerHTML;
    var newCount = parseInt(count)+1;
    likesElem.innerHTML = newCount;

    var userImage = document.createElement("img");
    userImage.classList.add('users__pic');
    userImage.src = img;

    var imageBlock = document.querySelector('.users');
    imageBlock.appendChild(userImage);
}



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