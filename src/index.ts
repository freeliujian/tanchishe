import {
  Application,
  Container,
  Sprite,
  Loader,
  Graphics,
  Text,
  TextStyle,
  ParticleContainer,
} from "pixi.js";
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
  element: Element;
  width: string | number;
  height: string | number;
  renderer!: any;
  loader!: any;
  isLoader?: boolean;
  isVisible: boolean;
  speed: SpeedProps;
  snake: any;
  apple?: any;
  wallArr?: any;
  state: any;
  score: number;

  constructor(option: CoreProps) {
    const { element, width, height, isLoader = false } = option;
    this.element = document.querySelector(`#${element}`);
    this.width = width;
    this.height = height;
    this.isLoader = isLoader;
    this.snake = null;
    this.apple = null;
    this.score = 0;
    this.isVisible = false;
    this.renderer = null;
    this.init();
  }

  init() {
    console.log("init");
    this.apple = null;
    this.wallArr = null;
    this.speed = {
      speedY: 0,
      speedX: 0,
    };
    this.renderer = new Application({
      width: this.width as number,
      height: this.height as number,
      backgroundColor: 0xffffff,
    });
    this.getScore();
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
    this.renderer.stage.removeChildren();
    this.element?.appendChild(this.renderer.view);
    if (this.isVisible) {
      this.createWalls();
      this.createApple();
      this.createSnake();
    } else {
      this.startPage();
    }
  }

  getScore() {
    const body = document.body;
    const scoreWrapper = document.createElement("div");
    scoreWrapper.innerHTML = `
      <span>分数：</span><span id="Score">0</span>
    `;
    body.appendChild(scoreWrapper);

  }

  setScore() {
    this.score++;
    const Score = document.querySelector("#Score");
    Score.innerHTML = `${this.score}`;
  }

  over() {
    this.renderer.stage.removeChildren();
    this.endPage();
  }
  endPage() {
    const { width, height,renderer,score } = this;
    const graphics = new Graphics();
    graphics.beginFill(0x000000);
    graphics.drawRect(0, 0, width as number, height as number);
    graphics.endFill();
    renderer.stage.addChild(graphics);

    const endText = new Text(`游戏结束，你的分数为:${score}`,new TextStyle({
      fill:0xcccccc,
    }));
    renderer.stage.addChild(endText);
  }

  startPage() {
    const { width, height,renderer } = this;
    const startContainer = new Container();
    const graphics = new Graphics();
    graphics.beginFill(0x000000);
    graphics.drawRect(0, 0, width as number, height as number);
    graphics.endFill();
    startContainer.addChild(graphics);
    const style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 36,
      fill: "white",
      stroke: "#ff3300",
      strokeThickness: 4,
      dropShadow: true,
      dropShadowColor: "#cccccc",
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    });
    const message = new Text("贪吃蛇（乞丐版）", style);
    message.position.set((width as number) / 3, (height as number) / 4);
    startContainer.addChild(message);
    const border = new Graphics();
    border.beginFill(0xcccccc);
    border.lineStyle({ color: 0xffffff, width: 4, alignment: 0 });
    border.drawRect(0, 0, 120, 60);
    border.endFill();
    border.position.set((this.width as number) / 2.5, (height as number) / 2);
    startContainer.addChild(border);
    const button = new Text("游戏开始");
    border.interactive = true;
    border.on("pointerdown", (e) => {
      this.isVisible = true;
      this.createRender();
    });
    button.position.set(
      (width as number) / 2.45,
      (height as number) / 1.9
    );
    startContainer.addChild(button);

    renderer.stage.addChild(startContainer);
  }

  createWalls() {
    console.log("created Wall");
    const container = new Container();
    this.renderer.stage.addChild(container);
    //eftWall
    const leftWall = new Graphics();
    leftWall.beginFill(0xde3249);
    leftWall.drawRect(0, 0, 10, this.height as number);
    leftWall.position.set(0, 0);
    leftWall.endFill();
    container.addChild(leftWall);
    //rightWall
    const rightWall = new Graphics();
    rightWall.beginFill(0xde3249);
    rightWall.drawRect(0, 0, 10, this.height as number);
    rightWall.endFill();
    rightWall.position.set((this.width as number) - 10, 0);
    container.addChild(rightWall);
    //topWall
    const topWall = new Graphics();
    topWall.beginFill(0xde3249);
    topWall.drawRect(0, 0, this.width as number, 10 as number);
    topWall.position.set(0, 0);
    topWall.endFill();
    container.addChild(topWall);
    //bottomWall
    const bottomWall = new Graphics();
    bottomWall.beginFill(0xde3249);
    bottomWall.drawRect(0, 0, this.width as number, 10);
    topWall.position.set(0, (this.height as number) - 10);
    bottomWall.endFill();

    this.wallArr = {
      wall: container,
      leftWall: leftWall,
      rightWall: rightWall,
      topWall: topWall,
      bottomWall: bottomWall,
    };

    container.addChild(bottomWall);
  }

  createApple() {
    const { width, height } = this;
    this.apple = new Container();
    this.renderer.stage.addChild(this.apple);
    const sprite = Sprite.from(Apple);
    sprite.width = 25;
    sprite.height = 30;
    this.apple.position.set(
      Math.floor(Math.random() * (width as number)),
      Math.floor(Math.random() * (height as number))
    );
    this.apple.addChild(sprite);
  }

  createSnake() {
    const snakeOption = {
      x: 10,
      y: 100,
      width: 25,
      height: 30,
    };

    this.snake = new ParticleContainer();
    this.snake.position.set(10, 10);
    this.renderer.stage.addChild(this.snake);
    for (let i = 0; i < 1; i++) {
      let sprite = Sprite.from(Apple);
      sprite.width = snakeOption.width;
      sprite.height = snakeOption.height;
      this.snake.addChild(sprite);
    }
    console.log(this.snake);
    this.move();
    this.state = this.play;
    this.renderer.ticker.add((delta: any) => this.gameLoop(delta));
  }

  gameLoop(delta: number) {
    this.play(delta);
  }

  play(_delta: any) {
    const { speed, snake, apple, wallArr, hitTestRectangle } = this;
    const { speedX, speedY } = speed;
    const { leftWall, rightWall, topWall, bottomWall } = wallArr;
    snake.x += speedX;
    snake.y += speedY;

    if (hitTestRectangle(snake, apple)) {
      this.apple.removeChildren();
      this.createApple();
      this.setScore();
    }
    if (hitTestRectangle(snake, leftWall)) {
      this.over();
    }
    if (hitTestRectangle(snake, rightWall)) {
      this.over();
    }
    if (hitTestRectangle(snake, topWall)) {
      this.over();
    }
    if (hitTestRectangle(snake, bottomWall)) {
      this.over();
    }
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

    // left.release = () => {
    //   if (!right.isDown && this.speed.speedY === 0) {
    //     this.speed.speedX = 0;
    //   }
    // };

    up.press = () => {
      const action = {
        speedY: -5,
        speedX: 0,
      };
      this.speed = action;
    };

    // up.release = () => {
    //   if (!down.isDown && this.speed.speedX === 0) {
    //     this.speed.speedY = 0;
    //   }
    // };

    //Right
    right.press = () => {
      const action = {
        speedX: 5,
        speedY: 0,
      };
      this.speed = action;
    };

    // right.release = () => {
    //   if (!left.isDown && this.speed.speedY === 0) {
    //     this.speed.speedX = 0;
    //   }
    // };

    //Down
    down.press = () => {
      const action = {
        speedY: 5,
        speedX: 0,
      };
      this.speed = action;
    };

    // down.release = () => {
    //   if (!up.isDown && this.speed.speedX === 0) {
    //     this.speed.speedY = 0;
    //   }
    // };
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
  width: "800",
  height: "600",
});
