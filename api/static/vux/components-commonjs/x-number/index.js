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
            min: Number,
            max: Number,
            step: {
                type: Number,
                "default": 1
            },
            value: {
                type: Number,
                "default": 0
            },
            name: String,
            title: String,
            fillable: {
                type: Boolean,
                "default": true
            },
            width: {
                type: Number,
                "default": 50
            }
        },
        computed: {
            disabledMin: function disabledMin() {
                return typeof this.min === "undefined" ? false : this.value <= this.min;
            },
            disabledMax: function disabledMax() {
                return typeof this.max === "undefined" ? false : this.value >= this.max;
            }
        },
        ready: function ready() {},
        watch: {
            value: function value(newValue, old) {
                if (this.min && this.value < this.min) {
                    this.value = this.min;
                }
                if (this.max && this.value > this.max) {
                    this.value = this.max;
                }
                this.$emit("on-change", this.value);
            }
        },
        methods: {
            add: function add() {
                if (!this.disabledMax) {
                    this.value += this.step;
                }
            },
            sub: function sub() {
                if (!this.disabledMin) {
                    this.value -= this.step;
                }
            }
        }
    };
}, function(module, exports) {}, function(module, exports) {
    module.exports = '<div class=weui_cell> <div class="weui_cell_bd weui_cell_primary"> <p>{{title}}</p> </div> <div class=weui_cell_ft v-show=!readonly style=font-size:0> <a @click=sub class="vux-number-selector vux-number-selector-sub" :class="{\'vux-number-disabled\':disabledMin}">-</a> <input v-model=value :name=name class=vux-number-input :style="{width: width+\'px\'}" number :readonly=!fillable pattern=[0-9]* /> <a @click=add class="vux-number-selector vux-number-selector-plus" :class="{\'vux-number-disabled\':disabledMax}">+</a> </div> <div class=weui_cell_ft v-else> {{value}} </div> </div>';
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