import { Application, BackgroundLoader, Container, Graphics, Ticker, Text, v8_0_0 } from "pixi.js";
import { app, cookingScene } from "../../app.js";
import { randInt } from "../../util.js";
import { hitbar } from "./bars.js";
import "./shelfUI.js"


//!TODO make it pretty
let difficulty = 3;

export const circleContainer = new Container();
export const barContainer = new Container();

let backCircle = new Graphics()
    .circle(0, 0, 80)
    .fill(0x5cafe2)

let frontCircle = new Graphics()
    .circle(0, 0, 60)
    .fill(0xe8eb34)

let hitText = new Text({
    text: "0",
    style: {
        fill: 0x000000,
    }
})
hitText.position.set(app.screen.width / 2 - hitText.width / 2, app.screen.height / 6 - hitText.height / 2)

circleContainer.addChild(backCircle);

let playerBar = new Graphics()
    .rect(0, 0, 15, 80)
    .fill(0x000000)

barContainer.addChild(playerBar);
playerBar.pivot.set(playerBar.width / 2, 0)


let hitbars = [];
for (let i = 0; i < difficulty; i++){
    const hitbarval = new hitbar(0, 0, 0xffffff);
    circleContainer.addChild(hitbarval);
    hitbars.push(hitbarval);
}

circleContainer.position.set(app.screen.width / 2, app.screen.height / 6);
frontCircle.position.set(circleContainer.x, circleContainer.y);
playerBar.x = circleContainer.x;
playerBar.y = circleContainer.y;   

cookingScene.addChild(circleContainer);
cookingScene.addChild(barContainer);
cookingScene.addChild(frontCircle);
app.stage.addChild(cookingScene);
app.stage.addChild(hitText);

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

let rotating = false;
let halfway = false;
playerBar.angle = 180;
app.ticker.add((ticker) =>  {
    if (rotating){
        playerBar.rotation += 0.05 * ticker.deltaTime;
        //console.log(playerBar.angle)
    }
    
    if (playerBar.angle > 360){
        playerBar.angle = 0;
        halfway = true;
    }
    
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

let barAngles = [];

function hitbarsAngles(){
    let attempts = 0;
    barAngles = [];
    for (let i = 0; i < hitbars.length; i++){
        let width = hitbars[i].width;

        hitbars[i].angle = Math.random() * 360;

        console.table({dist: Math.abs(playerBar.angle - hitbars[i].angle), bar: hitbars[i].angle})

        while(Math.abs(playerBar.angle  - hitbars[i].angle) < 20 + width){
            hitbars[i].angle = Math.random() * 360;
            console.log("finding another angle (player bar overlap)")
            attempts += 1;

            if (attempts > 50){
                console.error("could not find a valid angle")
                hitbars[i].visible = false;
                break;
            }
        }

        if (!barAngles.length == 0){
            barAngles.forEach(element => {
                while(Math.abs(hitbars[i].angle - element) < 15 + width){
                    hitbars[i].angle = Math.random() * 360;
                    console.log("finding another angle (other bar overlap)")
                    attempts += 1;
                        while(Math.abs(playerBar.angle  - hitbars[i].angle) < 20 + width){
                            hitbars[i].angle = Math.random() * 360;
                            console.log("finding another angle (player bar overlap)")
                            attempts += 1;
                
                            if (attempts > 50){
                                console.error("could not find a valid angle")
                                hitbars[i].visible = false;
                                break;
                            }
                        }
                    if (attempts > 50){
                        console.error("could not find a valid angle")
                        hitbars[i].visible = false;
                        break;
                    }
                }
            })
        }

        barAngles.push(hitbars[i].angle);
    }
}

hitbarsAngles();

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
