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
    module.exports = __webpack_require__(7);
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            type: String
        },
        computed: {
            className: function className() {
                return "weui_icon weui_icon_" + this.type;
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _icon = __webpack_require__(6);
    var _icon2 = _interopRequireDefault(_icon);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        props: {
            title: String,
            description: String,
            stepNumber: {
                type: Number
            },
            stepLast: {
                type: Boolean,
                "default": false
            },
            icon: String,
            status: String,
            tailWidth: {
                type: Object
            }
        },
        computed: {
            iconName: function iconName() {
                return this.icon || "check";
            }
        },
        components: {
            Icon: _icon2.default
        }
    };
}, function(module, exports) {}, function(module, exports) {
    module.exports = "<i class={{className}}></i>";
}, function(module, exports) {
    module.exports = "<div class=vux-step-item :class=\" { 'vux-step-item-with-tail' : !stepLast} \"> <div :class=\"'vux-step-item-tail ' + 'vux-step-item-tail-' + status\" v-show=!stepLast :style=\"{right: $parent.gutter}\"></div> <div :class=\"'vux-step-item-head ' + 'vux-step-item-head-' + status\"> <div class=vux-step-item-head-inner> <span v-if=\"!icon && status!='finish'\" class=vux-step-item-icon>{{stepNumber}}</span> <span v-else :class=\"'vux-step-item-icon ' + 'vux-step-item-' + iconName\"> <icon type=success_no_circle class=vux-step-item-checked></icon> </span> </div> </div> <div :class=\"'vux-step-item-main ' + 'vux-step-item-main-' + status\" :style=\"{backgroundColor: $parent.backgroundColor, paddingRight: stepLast ? 0 : $parent.gutter}\"> <span class=vux-step-item-title>{{title}}</span> <div class=vux-step-item-description>{{description}}</div> </div> </div>";
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
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __vue_script__ = __webpack_require__(2);
    __vue_template__ = __webpack_require__(5);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);