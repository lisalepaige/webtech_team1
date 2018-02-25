<?php
    include_once("data.inc.php");
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Kweeni</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
</head>
    <body>
        <section id="homeheader">
            
                       
            <a href="home.php" id="logoxl"></a>
                        
            <p>Eerste hulp bij design &amp; development hoofdpijn. Kweeni hoe handig.</p>
            
            <a href="#" id="inloggen">></a>
            
            <div id="userpictures">
                <?php foreach($users as $user): ?>
                <div><img src="img/<?php echo $user; ?>"></div>
      
                <?php endforeach; ?>
            </div>
            
        </section>
        
        <main>
            <article>
                <img src="img/icon-cool.svg" alt="smiley1">
                <h1>Samen slimmer</h1>
                <p>Iedereen kan een nieuw KWEENI-topic aanmaken en de link delen. Daarna kunnen vragen gesteld worden tijdens lessen, demo’s, …</p>
            </article>
            
            <article>
                <img src="img/icon-love.svg" alt="smiley2">
                <h1>Kweeni coins</h1>
                <p>Verdien KWEENI coins door anderen te helpen. Met je KWEENI coins kan je andere bedanken die je helpen. Da’s kweeni hoe handig.</p>
            </article>
            
            <article>
                <img src="img/icon-rainbow.svg" alt="smiley3">
                <h1>Made by imd</h1>
                <p>Een project van #WeAreIMD en GoodBytes.be/p>
            </article>
        
        </main>
    
    </body>
</html>