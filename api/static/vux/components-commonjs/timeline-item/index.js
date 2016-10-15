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
        data: function data() {
            return {
                isLast: true,
                isFirst: true,
                headStyle: {
                    backgroundColor: this.$parent.color
                }
            };
        },
        ready: function ready() {
            this.$parent.setChildProps();
        },
        beforeDestroy: function beforeDestroy() {
            var $parent = this.$parent;
            this.$nextTick(function() {
                $parent.setChildProps();
            });
        },
        components: {
            Icon: _icon2.default
        },
        computed: {
            tailStyle: function tailStyle() {
                return this.isLast ? {
                    display: "none",
                    backgroundColor: this.$parent.color
                } : {
                    display: "block",
                    backgroundColor: this.$parent.color
                };
            }
        }
    };
}, function(module, exports) {}, function(module, exports) {
    module.exports = "<i class={{className}}></i>";
}, function(module, exports) {
    module.exports = "<li class=vux-timeline-item> <div :class=\"['vux-timeline-item-color', {'vux-timeline-item-head': !isFirst,'vux-timeline-item-head-first': isFirst }]\" :style=headStyle> <icon v-show=isFirst type=success_no_circle class=vux-timeline-item-checked></icon> </div> <div class=vux-timeline-item-tail :style=tailStyle></div> <div class=vux-timeline-item-content> <slot></slot> </div> </li>";
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