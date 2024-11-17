import { Application, BackgroundLoader, Container, Graphics, Ticker } from "pixi.js";
import { initDevtools } from '@pixi/devtools';
import "./util.js";

export const app = new Application();

await app.init({ background: '#1099bb', resizeTo: window });
app.canvas.style.position = 'absolute';

document.body.appendChild(app.canvas);
initDevtools({ app });

export let cookingScene = new Container();

console.log('app.js loaded');