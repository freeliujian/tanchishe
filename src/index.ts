import {AbstractRenderer, Application, autoDetectRenderer, Container, Sprite, Loader,Graphics} from 'pixi.js'
import Apple from './assets/apple.jpg'


interface CoreProps {
   element:string
   width:string | number
   height:string | number
   isLoader?:boolean
}

class Core {

  element: string
  width: string | number
  height: string | number
  //renderer!: AbstractRenderer | null
  renderer!: any
  food!: any
  container!:any
  loader!:any
  isLoader?:boolean
  speed:number
  constructor(option:CoreProps){
    const {element,width,height,isLoader = false} = option

    this.element = element;
    this.width =width;
    this.height= height;
    this.isLoader =isLoader;
    this.speed = null;
    this.init();
  }

  init(){
    this.renderer = null;
    this.container = null;
    this.food = null;
    this.speed = 1;
    this.createRender();

  }

  loaderImg(option:{imgUrl:string,loaded:(loader: any, resources: any)=>void}) {
    const {imgUrl,loaded} = option
    this.loader = Loader.shared;
    this.loader.add('apple',imgUrl).load(loaded);

  }

  createRender () {
    const box = document.querySelector(`#${this.element}`);
    this.renderer = new Application({width:this.width as number,height:this.height as number,backgroundColor:0xffffff});
    box?.appendChild(this.renderer.view);
    this.createApple();
    this.createShetou();
  }
  createdSheTou(){
    console.log('created stage')
  } 

  createApple(){
    const container =new Container();
    this.renderer.stage.addChild(container);
    const apple = Sprite.from(Apple);
    apple.width = 25;
    apple.height = 30;
    apple.x = 0;
    apple.y = 600
    container.addChild(apple);

  }

  createShetou(){
    const that = this;
    const container =new Container();
    this.renderer.stage.addChild(container);
    const shetou = Sprite.from(Apple);
    shetou.width = 25;
    shetou.height = 30;
    shetou.x = 0;
    shetou.y = 20;
    container.addChild(shetou);

    this.renderer.ticker.add((delta: any) => {

      that.speed += delta;

      shetou.x = that.speed
    });

  }


}

const tanchishe  = new Core({
  element:'container',
  width:'1000',
  height:'1200',

});
