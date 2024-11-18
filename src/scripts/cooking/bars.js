import { Application, BackgroundLoader, Container, Graphics, Ticker } from "pixi.js";

export class hitbar extends Graphics {
    constructor(x, y, color){
        super();
        this.rect(x, y, 25, 80)
        this.fill(color)
        this.x = x;
        this.y = y;
        this.pivot.set(this.width / 2, 0);
        this.hit = false;
    }

    collideAngles(a, b){
        const angleA = a.angle
        const angleB = b.angle;

        return (
            Math.abs(angleA - angleB) < angleA.width && Math.abs(angleA - angleB) < angleB.width 
        );
    }
}