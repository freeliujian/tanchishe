import { autoDetectRenderer } from 'pixi.js';
var Core = /** @class */ (function () {
    function Core(option) {
        var element = option.element, width = option.width, height = option.height;
        this.element = element;
        this.width = width;
        this.height = height;
        this.init();
    }
    Core.prototype.init = function () {
        this.renderer = null;
        this.createRender();
    };
    Core.prototype.createRender = function () {
        var box = document.querySelector("#" + this.element);
        // let App = new Application({width:this.width as number,height:this.height as number});
        this.renderer = autoDetectRenderer({ width: this.width, height: this.height, backgroundColor: 0x000000 });
        box === null || box === void 0 ? void 0 : box.appendChild(this.renderer.view);
    };
    Core.prototype.createdShe = function () {
        console.log('created stage');
    };
    return Core;
}());
var tanchishe = new Core({
    element: 'container',
    width: '600',
    height: '400'
});
