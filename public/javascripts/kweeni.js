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
    
    
    var QuestionName = document.querySelector(".question__input").value;
    var searchName = QuestionName.split(" ").join("-");
    //searchName = searchName.split("?").join("");

    var loggedInUser = document.getElementById("userid").getAttribute("data-user"); 
      
    var date = new Date(Date.now()).toLocaleString();
    
    primus.write({
        type: "question",
        search_name: searchName,
        loggedInUser: loggedInUser,
        date : date,
        question : QuestionName
    });
});

function addQuestion(user, img, search_name, text){
    var container = document.createElement("div");
    container.classList.add("topics__question");

    var blockLikes = document.createElement("div");
    blockLikes.classList.add("topics__question--likes");

    var likeImage = document.createElement("img");
    likeImage.classList.add("topics__question--img");
    likeImage.src = 'img/icon-cool.svg';

    var likes = document.createElement("span");
    likes.innerHTML = "x 0";

    blockLikes.appendChild(likeImage);
    blockLikes.appendChild(likes);

    var link = document.createElement("a");
    link.href = "/kweeni/"+search_name;
    link.classList.add("topics__question--p");
    link.innerHTML = text;
    
    var author = document.createElement("p");
    author.classList.add("topics__question--author");
    author.innerHTML = user;

    var userImage = document.createElement("img");
    userImage.classList.add("topics__question--img");
    userImage.src = img;

    container.appendChild(blockLikes);
    container.appendChild(link);
    container.appendChild(author);
    container.appendChild(userImage);
    
    var allQuestions = document.querySelector(".topics");
    allQuestions.insertBefore(container, allQuestions.firstChild);
    console.log("Added block");

    document.querySelector(".question__input").value = "";
}






primus.on("data", function message(data) {
    if(data.type == "question"){
        console.log("Data received! "+data.text);
        addQuestion(data.user, data.img, data.search_name, data.text);
    }
    
});