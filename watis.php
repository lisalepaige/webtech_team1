<?php
    include_once("data.inc.php");

?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Wat is  express.js</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
   
   <?php include_once("nav.inc.php"); ?>
    
    	
    
    <main id="main">
      
      <div id="head">
       
       <h1>"Wat is express.js en waarvoor dient het?"</h1>
       
        </div>
       
       <div class="auteur">
           <p>12 minuten geleden gevraagd door</p>
            <img src="img/user8.png" alt="active_user" class="avatar">
            <span>Anneke Kodeur</span>
        </div>
        
       
       
        <div class="likes">
           <div class="like">
            <img src="img/icon-cool.svg" alt="smiley_cool"> 
            <p id="like_p">x20</p>
            <a href="#">like deze vraag</a>
            </div>
        </div>
        
        <div class="users">
            <?php foreach ($users as $u): ?>
            
            <img id="users_pic" src="img/<?php echo $u ?>" />
            <?php endforeach; ?>    
        </div>
        
    </main>
    <div class="container">
    <section>
            <article class="comments">
                <p>
                    Op de site staat: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
                </p>
                <img src="img/user10.png" alt="user10" class="comments_pic"> <a href="#">Jay Ba-Kend</a>
            </article>
            
            <div class="right">
            <article class="comments right">
                <p>
                    Thanks. Maar maarvoor dient dat eigenlijk? Frontend?
                </p>
                <img src="img/user8.png" alt="user8" class="comments_pic right_pic"> <a href="#" class="author">Anneke Kodeur</a>
            </article>
            <article class="comments right">
                <p>
                    Nee het is puur voor de backend. Vergelijk het met PHP. In je frontend kan je nog altijd gebruik maken van jQuery ofzo als je dat wil.
                </p>
                <img src="img/user20.jpg" alt="user20" class="comments_pic right_pic"> <a href="#">Jef Dev</a>
            </article>
        </div>
            
            <div class="place-comment">
                <input type="text" placeholder="Plaats commentaar...">
            </div>
    
            <article class="comments">
                <p>
                    Express.js is eigenlijk gewoon een soort van bibliotheek met een hele hoop functies die het makkelijker maken om app ste schrijven in nodejs. Een beetje zoals jQuery in frontend. Maar dan voor je back-end werk.
                </p>
                <img src="img/user5.png" alt="user5" class="comments_pic"> <a href="#">Som Wan</a>
            </article>
            
            <div class="place-comment">
                <input type="text" placeholder="Plaats commentaar...">
            </div>
        
        <div class="react">
            <form action="" method="post">
                <img src="img/user12.png" alt="user12" class="user-avatar">
                <input class="text-input" type="text" name="new-comment" value="Reageer hier op deze vraag">
                <input class="button-input" type="submit" value="reageren">
            </form>
        </div>
    </section>
    </div>
</body>
</html>