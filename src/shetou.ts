import { Container, Sprite} from 'pixi.js'
import Apple from './assets/apple.jpg'


interface ShetouProps {
  x?: number;
  y?: number;

  width: number | string;
  height: number | string;
  parent: any;

}

class Shetou {

  parent: any
  width: string | number
  height: string | number
  x?:number;
  y?:number;


  constructor(option:ShetouProps){
    const {width,height,parent} = option
    console.log(1)
    this.width = width;
    this.height = height;
    this.parent = parent;
    this.init();
  }

  init(){
    this.x = null;
    this.y = null;
    this.createShetou();

  }

  createShetou(){
    const that = this;
    const container =new Container();
    this.parent.stage.addChild(container);
    const shetou = Sprite.from(Apple);
    shetou.width = this.width as number
    shetou.height = this.height as number
    shetou.x = this.x;
    shetou.y = this.y;

    container.addChild(shetou);

  }
}


export {
  Shetou,
  ShetouProps
}