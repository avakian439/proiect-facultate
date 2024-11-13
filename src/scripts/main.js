import { Application, BackgroundLoader, Container, Graphics, Ticker } from "pixi.js";
import { initDevtools } from '@pixi/devtools';

const app = new Application();

await app.init({ background: '#1099bb', resizeTo: window });
app.canvas.style.position = 'absolute';

document.body.appendChild(app.canvas);
initDevtools({ app });

const circleContainer = new Container();
const barContainer = new Container();


let backCircle = new Graphics()
    .circle(app.canvas.width / 2, app.canvas.height / 2, 80)
    .fill(0x5cafe2)

let frontCircle = new Graphics()
    .circle(app.canvas.width / 2, app.canvas.height / 2, 60)
    .fill(0xe8eb34)

circleContainer.addChild(backCircle);

let playerBar = new Graphics()
    .rect(0, 0, 15, 80)
    .fill(0x000000)
    playerBar.x = app.canvas.width / 2;
    playerBar.y = app.canvas.height / 2;   
    
let hitBar = new Graphics()
    .rect(0, 0, 25, 80)
    .fill(0xffffff)
    hitBar.x = app.canvas.width / 2;
    hitBar.y = app.canvas.height / 2;   

    let hitBar2 = new Graphics()
    .rect(0, 0, 25, 80)
    .fill(0xffffff)
    hitBar2.x = app.canvas.width / 2;
    hitBar2.y = app.canvas.height / 2;   

    let hitBar3 = new Graphics()
    .rect(0, 0, 25, 80)
    .fill(0xffffff)
    hitBar3.x = app.canvas.width / 2;
    hitBar3.y = app.canvas.height / 2;   

    
barContainer.addChild(hitBar);
barContainer.addChild(hitBar2);
barContainer.addChild(hitBar3);
barContainer.addChild(playerBar);

playerBar.pivot.set(playerBar.width / 2, 0)
hitBar.pivot.set(hitBar.width / 2, 0)
hitBar2.pivot.set(hitBar.width / 2, 0)
hitBar3.pivot.set(hitBar.width / 2, 0)
    
app.stage.addChild(circleContainer);
app.stage.addChild(barContainer);
app.stage.addChild(frontCircle);

app.ticker.add((ticker) =>  {
    playerBar.rotation += 0.05 * ticker.deltaTime;
    
    if (playerBar.angle > 360){
        playerBar.angle = 0;
    }    
})

addEventListener('keydown', (e) => {
    console.log(e)
    

    if (e.key == " "){
        if (Math.abs(hitBar.angle - playerBar.angle) < hitBar.width + 20){
            console.log('hit')
        }
        hitBar.angle = Math.random() * 360;
    }
})
