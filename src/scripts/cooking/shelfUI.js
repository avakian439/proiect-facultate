import { Application, BackgroundLoader, Container, Graphics, Ticker, Text } from "pixi.js";
import { ScrollBox, FancyButton } from "@pixi/ui";
import { app, cookingScene } from "../../app.js";
import { randInt } from "../../util.js";
import { hitbar } from "./bars.js";
import "./cooking.js"

let foods = ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10"];

/// !TODO THIS IS FOR SOME REASON WITHOUT SIZE BUT IT HAS SIZE IT'S DEFINED RIGHT THERE I HAVE NO IDEA 
export class recipeBox extends FancyButton {
    constructor(text){
        super();
        this.options = {
            defaultView: new Graphics()
            .roundRect(0, 0, 400, 200, 20)
            .fill(0xa5e24d),
            hoverView: new Graphics()
            .roundRect(0, 0, 400, 200, 20)
            .fill(0xfec230),
            pressedView: new Graphics()
            .roundRect(0, 0, 400, 200, 20)
            .fill(0xfe6048),
            text: new Text({
                text: text,
                style: {
                    fill: 0XFFFFFF,
                },
        })},
        this.anchor.set(0);
}};

const cookUIContainer = new Container();
const recipeBoxContainer = new Container();

let background = new Graphics()
    .rect(0, app.screen.height / 3 , app.screen.width, app.screen.height / 1)
    .fill(0x595751)

const test = new ScrollBox({
    background: 0XFFFFFF,
    elementsMargin: 10,
    padding: 10,
    width: app.screen.width / 2,
    height: background.height,
});

foods.forEach(element => {
    const recipe = new recipeBox(element);
    test.addItem(recipe);
});

cookUIContainer.addChild(background);
cookUIContainer.addChild(recipeBoxContainer);
recipeBoxContainer.position.set(app.screen.width / 4, app.screen.height / 3);
recipeBoxContainer.addChild(test);
cookingScene.addChild(cookUIContainer);