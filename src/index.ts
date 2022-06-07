import {AbstractRenderer, Application, autoDetectRenderer} from 'pixi.js'
interface CoreProps {
   element:string
   width:string | number
   height:string | number
}

class Core {

  element: string
  width: string | number
  height: string | number
  renderer!: AbstractRenderer | null

  constructor(option:CoreProps){
    const {element,width,height} = option

    this.element = element;
    this.width =width;
    this.height= height;
    
    this.init();
  }

  init(){
    this.renderer = null;
    this.createRender();
  }
  createRender () {
    const box = document.querySelector(`#${this.element}`);
    // let App = new Application({width:this.width as number,height:this.height as number});
    this.renderer = autoDetectRenderer({width:this.width as number,height:this.height as number,backgroundColor:0x000000});
    box?.appendChild(this.renderer.view);
  }
  createdShe(){
    console.log('created stage')

  }
}

const tanchishe = new Core({
  element:'container',
  width:'600',
  height:'400'
});