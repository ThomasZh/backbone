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
    module.exports = __webpack_require__(4);
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            show: {
                type: Boolean,
                "default": false
            },
            content: {
                type: String,
                required: true
            }
        },
        watch: {
            show: function show(val) {
                if (val) {
                    document.querySelector(this.content).classList.add("has-transition");
                    document.querySelector(this.content).classList.add("is-open");
                } else {
                    document.querySelector(this.content).classList.remove("is-open");
                }
            }
        }
    };
}, function(module, exports) {}, function(module, exports) {
    module.exports = '<div class="vux-off-canvas-menu has-transition" :class="{\'is-open\': show}"> </div> <div id=vux-off-canvas> <slot></slot> </div>';
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(2);
    __vue_script__ = __webpack_require__(1);
    __vue_template__ = __webpack_require__(3);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);