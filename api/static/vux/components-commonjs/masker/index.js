/*!
 * Vux v0.1.3 (https://vux.li)
 * Licensed under the MIT license
 */
module.exports = function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "";
    return __webpack_require__(0);
}([ function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(5);
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _converter = __webpack_require__(2);
    exports.default = {
        props: {
            color: {
                type: String,
                "default": "0, 0, 0"
            },
            opacity: {
                type: Number,
                "default": .5
            }
        },
        computed: {
            style: function style() {
                var color = /,/.test(this.color) ? this.color : (0, _converter.toRGB)(this.color.replace("#", "")).join(",");
                return {
                    backgroundColor: "rgba(" + color + "," + this.opacity + ")"
                };
            }
        }
    };
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.toRGB = toRGB;
    exports.toHex = toHex;
    function toRGB(color) {
        var num = parseInt(color, 16);
        return [ num >> 16, num >> 8 & 255, num & 255 ];
    }
    function toHex(red, green, blue) {
        return (blue | green << 8 | red << 16 | 1 << 24).toString(16).slice(1);
    }
}, function(module, exports) {}, function(module, exports) {
    module.exports = "<div class=vux-masker-box> <slot></slot> <div class=vux-masker :style=style> <slot name=content></slot> </div> </div>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(3);
    __vue_script__ = __webpack_require__(1);
    __vue_template__ = __webpack_require__(4);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);