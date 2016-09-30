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
    module.exports = __webpack_require__(4);
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            current: Number,
            backgroundColor: {
                type: String,
                "default": "#fff"
            },
            gutter: {
                type: String,
                "default": "10px"
            }
        },
        ready: function ready() {
            this._mapPropsToChildComponent();
        },
        watch: {
            current: function current() {
                this._mapPropsToChildComponent();
            }
        },
        methods: {
            _mapPropsToChildComponent: function _mapPropsToChildComponent() {
                var _this = this;
                var len = this.$children.length - 1;
                this.$children.forEach(function(child, index) {
                    child.stepNumber = (index + 1).toString();
                    child.stepLast = index === len;
                    if (index === _this.current) {
                        child.status = "process";
                    } else if (index < _this.current) {
                        child.status = "finish";
                    } else {
                        child.status = "wait";
                    }
                });
            }
        }
    };
}, function(module, exports) {}, function(module, exports) {
    module.exports = "<div class=vux-step> <slot></slot> </div>";
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