<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Kweeni</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
   
   <?php include_once("nav.inc.php"); ?>
   
    <section id="vraag">
        <div class="container">
        <h1>Iets kweeni hoe moeilijk? Stel hier je vraag.</h1>
    
        <input type="text" placeholder="Wat is expressjs?">
        <button>NU VRAGEN</button>
        </div>
    </section>
    
    <div class="container">
    
    <section id="topics">
        <h2>Hot topics!</h2>
        
        <div class="question 1">
            <div class="likes">
                <img src="img/icon-cool.svg" alt="icon">
                <span>x33</span>
            </div>
            <p class="q">Wat is ES6 en waarvoor dient het?</p>
            <p class="author">Yves Dehipster</p>
            <img src="img/user1.png" alt="Yves">
        </div>
        <hr>
        <div class="question 2">
            <div class="likes">
                <img src="img/icon-cool.svg" alt="icon">
                <span>x28</span>
            </div>
            <p class="q">Wat is het verschil tussen let, var en const</p>
            <p class="author">Jerold Venard</p>
            <img src="img/user2.png" alt="Jerold">
        </div>
        <hr>
        <div class="question 1">
            <div class="likes">
                <img src="img/icon-cool.svg" alt="icon">
                <span>x33</span>
            </div>
            <p class="q">Wat is ES6 en waarvoor dient het?</p>
            <p class="author">Yves Dehipster</p>
            <img src="img/user1.png" alt="Yves">
        </div>
        <hr>
        <div class="question 2">
            <div class="likes">
                <img src="img/icon-cool.svg" alt="icon">
                <span>x28</span>
            </div>
            <p class="q">Wat is het verschil tussen let, var en const</p>
            <p class="author">Jerold Venard</p>
            <img src="img/user2.png" alt="Jerold">
        </div>
        
        <a href="#">Toon 10 extra topics</a>
    </section>
    
    </div>
</body>
</html>