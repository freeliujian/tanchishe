import {
  AbstractRenderer,
  Application,
  autoDetectRenderer,
  Container,
  Sprite,
  Loader,
  Graphics,
} from "pixi.js";
import { Shetou, ShetouProps } from "./shetou";
import { keyboard } from "./keyboard";
import Apple from "./assets/apple.jpg";

interface CoreProps {
  element: string;
  width: string | number;
  height: string | number;
  isLoader?: boolean;
}

class Core {
  element: string;
  width: string | number;
  height: string | number;
  //renderer!: AbstractRenderer | null
  renderer!: any;
  food!: any;
  container!: any;
  loader!: any;
  isLoader?: boolean;
  speed: {};
  state: any;
  shetou: any;
  constructor(option: CoreProps) {
    const { element, width, height, isLoader = false } = option;

    this.element = element;
    this.width = width;
    this.height = height;
    this.isLoader = isLoader;
    this.init();
  }

  init() {
    this.renderer = null;
    this.container = null;
    this.food = null;
    this.speed = {
      speedY:0,
      speedX:0
    }
    this.createRender();
  }

  loaderImg(option: {
    imgUrl: string;
    loaded: (loader: any, resources: any) => void;
  }) {
    const { imgUrl, loaded } = option;
    this.loader = Loader.shared;
    this.loader.add("apple", imgUrl).load(loaded);
  }

  createRender() {
    const box = document.querySelector(`#${this.element}`);
    //this.renderer = autoDetectRenderer({width:this.width as number , height:this.height as number ,backgroundColor:0xffffff})
    this.renderer = new Application({
      width: this.width as number,
      height: this.height as number,
      backgroundColor: 0xffffff,
    });
    this.renderer.ticker.add((delta: any) => this.gameLoop(delta));
    box?.appendChild(this.renderer.view);
    this.createApple();
    this.createShetou();
  }
  createdSheTou() {
    console.log("created stage");
  }

  createApple() {
    const container = new Container();
    this.renderer.stage.addChild(container);
    const apple = Sprite.from(Apple);
    apple.width = 25;
    apple.height = 30;
    apple.x = 0;
    apple.y = 600;
    container.addChild(apple);
  }

  createShetou() {
    const that = this;
    const container = new Container();
    this.renderer.stage.addChild(container);
    this.shetou = Sprite.from(Apple);
    this.shetou.width = 25;
    this.shetou.height = 30;
    this.shetou.x = 0;
    this.shetou.y = 0;
    container.addChild(this.shetou);
  }

  gameLoop(delta: number) {
    this.play(delta);
  }

  play(delta: any) {
    this.shetou.x += this.speed;
    this.shetou.y += 
  }

  move(){

    const {speedY,speedX} = this.speed;
    let left = keyboard("ArrowLeft"),
      up = keyboard("ArrowUp"),
      right = keyboard("ArrowRight"),
      down = keyboard("ArrowDown");

      left.press = () => {
        speedY = -5;
        speedX = 0;
      };

      left.release = () => {
        if (!right.isDown && speedY === 0) {
          speedX = 0;
        }
      };

      up.press = () => {
        speedY = -5;
        speedX = 0;
      };

      up.release = () => {
        if (!down.isDown && speedX === 0) {
          speedY = 0;
        }
      };

       //Right
      right.press = () => {
        speedX = 5;
        speedY = 0;
      };

      right.release = () => {
        if (!left.isDown && speedY === 0) {
          speedX = 0;
        }
      };
    
      //Down
      down.press = () => {
        speedY = 5;
        speedX = 0;
      };
      down.release = () => {
        if (!up.isDown && speedX === 0) {
          speedY = 0;
        }
      };
    
  }

}

const tanchishe = new Core({
  element: "container",
  width: "1000",
  height: "1200",
});
