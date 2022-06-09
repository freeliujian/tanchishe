import { Container, Sprite} from 'pixi.js'
import Apple from './assets/apple.jpg'


interface AppleProps {
  speed: number | string;
  width: number | string;
  height: number | string;
  parent: any;

}

class Apple {

  parent: any
  width: string | number
  height: string | number

  speed:number | string;

  constructor(option:AppleProps){
    const {speed,width,height,parent} = option
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.parent = parent;
    this.init();
  }

  init(){
    this.createApple();
  }

  createApple(){
    const that = this;
    const container =new Container();
    this.parent.stage.addChild(container);
    const shetou = Sprite.from(Apple);
    shetou.width = this.width as number
    shetou.height = this.height as number
    shetou.x = 0;
    shetou.y = 20;
 
    container.addChild(shetou);

  }
}


export {
  Apple,
  AppleProps
}