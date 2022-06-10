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

interface SpeedProps {
  speedX?: number;
  speedY?: number;
}

class Core {
  element: string;
  width: string | number;
  height: string | number;
  //renderer!: AbstractRenderer | null
  renderer!: any;

  container!: any;
  loader!: any;
  isLoader?: boolean;
  speed: SpeedProps;
  state: any;
  shetou: any;
  sheshen: any[];
  apple?: any;
  wallArr?: any;

  constructor(option: CoreProps) {
    const { element, width, height, isLoader = false } = option;

    this.element = element;
    this.width = width;
    this.height = height;
    this.isLoader = isLoader;
    this.sheshen = [0, 0, 0];
    this.init();
  }

  init() {
    console.log("init");
    this.renderer = null;
    this.container = null;
    this.apple = null;
    this.wallArr = null;
    this.speed = {
      speedY: 0,
      speedX: 0,
    };
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

    box?.appendChild(this.renderer.view);
    this.createWalls();
    this.createApple();
    this.createShetou();
  }

  createWalls() {
    console.log("created Wall");
    const container = new Container();
    this.renderer.stage.addChild(container);
    //LeftWall
    const LeftWall = new Graphics();
    LeftWall.beginFill(0xde3249);
    LeftWall.drawRect(0, 0, 10, this.height as number);
    LeftWall.endFill();
    container.addChild(LeftWall);
    //rightWall
    const rightWall = new Graphics();
    rightWall.beginFill(0xde3249);
    rightWall.drawRect(
      (this.width as number) - 10,
      0,
      10,
      this.height as number
    );
    rightWall.endFill();
    container.addChild(rightWall);
    //topWall
    const topWall = new Graphics();
    topWall.beginFill(0xde3249);
    topWall.drawRect(0, 0, this.width as number, 10 as number);
    topWall.endFill();
    container.addChild(topWall);
    //bottomWall
    const bottomWall = new Graphics();
    bottomWall.beginFill(0xde3249);
    bottomWall.drawRect(
      0,
      (this.height as number) - 10,
      this.width as number,
      this.height as number
    );
    bottomWall.endFill();

    this.wallArr = {
      LeftWall: LeftWall,
      rightWall: rightWall,
      topWall: topWall,
      bottomWall: bottomWall,
    };

    container.addChild(bottomWall);
  }

  createApple() {
    const container = new Container();
    this.renderer.stage.addChild(container);
    this.apple = Sprite.from(Apple);
    this.apple.width = 25;
    this.apple.height = 30;
    this.apple.position.set(10, 600);
    container.addChild(this.apple);
  }

  createShetou() {
    const shetouOption = {
      x: 10,
      y: 100,
      width: 25,
      height: 30,
    };

    const container = new Container();
    this.renderer.stage.addChild(container);
    this.shetou = Sprite.from(Apple);
    this.shetou.width = shetouOption.width;
    this.shetou.height = shetouOption.height;
    this.shetou.position.set(shetouOption.x, shetouOption.y);
    // this.sheshen.forEach((item,index) => {

    //   let sheshen = Sprite.from(Apple);
    //   sheshen.width = shetouOption.width;
    //   sheshen.height = shetouOption.height;
    //   sheshen.position.set(shetouOption.x, shetouOption.y - shetouOption.width);
    //   container.addChild(sheshen);
    // })

    container.addChild(this.shetou);
    this.move();
    this.state = this.play;
    this.renderer.ticker.add((delta: any) => this.gameLoop(delta));
  }

  gameLoop(delta: number) {
    this.play(delta);
  }

  play(_delta: any) {
    const {speed,shetou,apple,wallArr,hitTestRectangle} = this
    const { speedX, speedY } = speed;
    const {LeftWall,rightWall,topWall,bottomWall} = wallArr
    shetou.x += speedX;
    shetou.y += speedY;

    if (hitTestRectangle(shetou, apple)) {
      console.log("你碰到了苹果");
    }
    if (hitTestRectangle(shetou, LeftWall)) {
      console.log("左边墙壁");
    }
    if (hitTestRectangle(shetou, rightWall)) {
      console.log("右边墙壁");
    }
    // if (hitTestRectangle(shetou, topWall)) {
    //   console.log("上面的墙壁");
    // }
    // if (hitTestRectangle(shetou, bottomWall)) {
    //   console.log("下面的墙壁");
    // }
  }

  move() {
    let left = keyboard("ArrowLeft"),
      up = keyboard("ArrowUp"),
      right = keyboard("ArrowRight"),
      down = keyboard("ArrowDown");

    left.press = () => {
      const action = {
        speedX: -5,
        speedY: 0,
      };
      this.speed = action;
    };

    left.release = () => {
      if (!right.isDown && this.speed.speedY === 0) {
        this.speed.speedX = 0;
      }
    };

    up.press = () => {
      const action = {
        speedY: -5,
        speedX: 0,
      };
      this.speed = action;
    };

    up.release = () => {
      if (!down.isDown && this.speed.speedX === 0) {
        this.speed.speedY = 0;
      }
    };

    //Right
    right.press = () => {
      const action = {
        speedX: 5,
        speedY: 0,
      };
      this.speed = action;
    };

    right.release = () => {
      if (!left.isDown && this.speed.speedY === 0) {
        this.speed.speedX = 0;
      }
    };

    //Down
    down.press = () => {
      const action = {
        speedY: 5,
        speedX: 0,
      };
      this.speed = action;
    };
    down.release = () => {
      if (!up.isDown && this.speed.speedX === 0) {
        this.speed.speedY = 0;
      }
    };
  }

  hitTestRectangle(r1: any, r2: any) {
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    hit = false;

    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    if (Math.abs(vx) < combinedHalfWidths) {
      if (Math.abs(vy) < combinedHalfHeights) {
        hit = true;
      } else {
        hit = false;
      }
    } else {
      hit = false;
    }

    return hit;
  }
}

const tanchishe = new Core({
  element: "container",
  width: "1000",
  height: "1200",
});
