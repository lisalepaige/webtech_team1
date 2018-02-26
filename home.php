<?php
    include_once("data.inc.php");
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Kweeni</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" href="stylehome.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
</head>
    <body>
        <section id="homeheader">
            
            <div class="grid">        
            <a href="home.php" id="logoxl"></a>
                        
            <h1>Eerste hulp bij design &amp; development hoofdpijn. Kweeni hoe handig.</h1>
            
            <a href="#" id="inloggen"></a>
            </div> 
            <div id="userpictures">
                
                <?php foreach($users as $key => $user): ?>
                
                  <div id="key<?php echo $key; ?>" class="userpicture" style="background-image:url(img/<?php echo $user; ?>)"></div>
                <?php endforeach; ?>
                <div class="filler"></div>
                <div class="filler"></div>
                <div class="filler"></div>
                <div class="filler"></div>
                <div class="filler"></div>
                <div class="filler"></div>
                <div class="filler"></div>
            </div>
            
        </section>
        
        <main id="homemain">
            <article id="firstarticle">
                <div class="align">
                    <img src="img/icon-cool.svg" alt="smiley1">
                    <h2>Samen slimmer</h2>
                </div>
                <p>Iedereen kan een nieuw KWEENI-topic aanmaken en de link delen.</p><p>Daarna kunnen vragen gesteld worden tijdens lessen, demo’s, …</p>
            </article>
            
            <article>
                <div class="align">
                    <img src="img/icon-love.svg" alt="smiley2">
                    <h2>Kweeni coins</h2>
                </div>
                <p>Verdien KWEENI coins door anderen te helpen. Met je KWEENI coins kan je andere bedanken die je helpen.</p><p>Da’s kweeni hoe handig.</p>
            </article>
            
            <article>
                <div class="align">
                    <img src="img/icon-rainbow.svg" alt="smiley3">
                    <h2>Made by imd</h2>
                </div>
                <p>Een project van #WeAreIMD en GoodBytes.be</p>
            </article>
        
        </main>
    
    </body>
</html>