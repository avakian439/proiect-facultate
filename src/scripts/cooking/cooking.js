import { Application, BackgroundLoader, Container, Graphics, Ticker, Text, v8_0_0 } from "pixi.js";
import { app, cookingScene } from "../../app.js";
import { randInt } from "../../util.js";
import { hitbar } from "./bars.js";
import "./shelfUI.js"

//!TODO make it pretty
// difficulty increases the number of bars to hit
let difficulty = 5;
// list with all the hitbar objects
let hitbars = [];
// weather playerbar is rotating or not
let rotating = false;
// weather playerbar has passed half the circle, 
//this is needed because the bar starts at 180 degrees and there's some funky logic when it wraps back around that i don't want to deal with
let halfway = false;

export const barContainer = new Container();
export const circleContainer = new Container();
let backCircle, frontCircle, playerBar, hitText

export function setCookingSceneGraphics(){
    backCircle = new Graphics()
        .circle(0, 0, 80)
        .fill(0x5cafe2)
    
    frontCircle = new Graphics()
        .circle(0, 0, 60)
        .fill(0xe8eb34)
        
    playerBar = new Graphics()
        .rect(0, 0, 15, 80)
        .fill(0x000000)
        playerBar.pivot.set(playerBar.width / 2, 0)

    hitText = new Text({
        text: "0",
        style: {
            fill: 0x000000,
        }
    })
    hitText.position.set(app.screen.width / 2 - hitText.width / 2, app.screen.height / 6 - hitText.height / 2)
    
    circleContainer.addChild(backCircle);
    barContainer.addChild(playerBar);
    
    circleContainer.position.set(app.screen.width / 2, app.screen.height / 6);
    frontCircle.position.set(circleContainer.x, circleContainer.y);
    
    playerBar.x = circleContainer.x;
    playerBar.y = circleContainer.y;   
    playerBar.angle = 180;
    
    cookingScene.addChild(circleContainer);
    cookingScene.addChild(barContainer);
    cookingScene.addChild(frontCircle);
    cookingScene.addChild(hitText);
    app.stage.addChild(cookingScene);
    
    for (let i = 0; i < difficulty; i++){
        const hitbarval = new hitbar(0, 0, 0xffffff);
        circleContainer.addChild(hitbarval);
        hitbars.push(hitbarval);
    }
}
setCookingSceneGraphics();


function startFade(element) { 
    const fadeTicker = new Ticker();
    fadeTicker.start();
    fadeTicker.add((ticker) => {
        element.alpha -= 0.1 * ticker.deltaTime;
        if (element.alpha <= 0){
            element.visible = false;
            fadeTicker.stop();
        }
    })
}

function resetHitbars() {  
    hitbars.forEach(element => {
        element.hit = false;
        element.alpha = 1;
        element.visible = true;
    });
    hitbarsAngles();
}

app.ticker.add((ticker) =>  {
    if (rotating){
        playerBar.rotation += 0.05 * ticker.deltaTime;
        //console.log(playerBar.angle)

        if (playerBar.angle > 360){
            playerBar.angle = 0;
            halfway = true;
        }
    }
    
    
    // logic for when the bar reaches it's initial position
    if (rotating && playerBar.angle > 180 && halfway){
        if (barsHit != difficulty){
            barsHitTotal = 0;
            hitText.text = barsHitTotal;
            hitText.position.set(app.screen.width / 2 - hitText.width / 2, app.screen.height / 6 - hitText.height / 2)
        }
        barsHit = 0;

        playerBar.angle = 180;
        rotating = false;
        halfway = false;
        resetHitbars()
    }    
})

// logic for determening the angles the bars look at
function hitbarsAngles(){
    let attempts = 0;
    let barAngles = [];
    // !TODO i don't think this code actually works
    for (let i = 0; i < hitbars.length; i++){
        let width = hitbars[i].width;
        console.table({dist: Math.abs(playerBar.angle - hitbars[i].angle), bar: hitbars[i].angle})

        hitbars[i].angle = randInt(0,360)
        //if (hitbars[i].collideAngles(hitbars[i], playerBar)){

        if (i == 0){
            barAngles.push(hitbars[i].angle);
        } else {
            barAngles.forEach( (element) =>{
                while (Math.abs(hitbars[i].angle - playerBar.angle) < playerBar.width || Math.abs(hitbars[i].angle - element) < hitbars[i].width + 10){
                    hitbars[i].rotation += playerBar.width
                }
            })
        }

        barAngles.push(hitbars[i].angle);
    }
}
hitbarsAngles()

// logic for hitting bars
let barsHitTotal = 0;
let barsHit = 0;
addEventListener('keydown', (e) => {
    console.log(e)

    if (e.key == " "){
        rotating = true;
        let hitAtleastOne = false;

        let results = [];
        let angleToCheck = playerBar.angle

        hitbars.forEach(element => {
            if (Math.abs(element.angle - angleToCheck) < element.width && !element.hit){
                console.log('hit')
                element.hit = true;
                hitAtleastOne = true;
                startFade(element)

                barsHit += 1;
                barsHitTotal += 1;
                hitText.text = barsHitTotal;
                hitText.position.set(app.screen.width / 2 - hitText.width / 2, app.screen.height / 6 - hitText.height / 2)

                results.push = "hit";
                console.log(barsHitTotal)
            } 
            //element.angle = Math.random() * 360;
        });

        if (!hitAtleastOne && playerBar.angle != 180){
            barsHitTotal = 0;
            hitText.text = barsHitTotal;
            console.log("miss")
        }
        //hitAtleastOne = false;
    }
})
