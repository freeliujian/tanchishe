"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pixi_js_1 = require("pixi.js");
var Core = /** @class */ (function () {
    function Core(option) {
        var element = option.element, width = option.width, height = option.height;
        this.element = element;
        this.width = width;
        this.height = height;
        this.init();
    }
    Core.prototype.init = function () {
        var box = document.querySelector("#" + this.element);
        var App = new pixi_js_1.Application({ width: this.width, height: this.height });
        box === null || box === void 0 ? void 0 : box.appendChild(App.view);
        // box?.setAttribute('width',this.width as string);
        // box?.setAttribute('height',this.height as string);
    };
    Core.prototype.createdShe = function () {
    };
    return Core;
}());
