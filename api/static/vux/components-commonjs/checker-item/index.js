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
            value: {
                type: [ String, Number ],
                required: true
            },
            disabled: Boolean
        },
        computed: {
            classNames: function classNames() {
                var names = {
                    "vux-tap-active": !this.disabled
                };
                if (this.$parent.defaultItemClass) {
                    names[this.$parent.defaultItemClass] = true;
                }
                if (this.$parent.selectedItemClass) {
                    names[this.$parent.selectedItemClass] = this.$parent.type === "radio" ? this.$parent.value === this.value : this.$parent.value.indexOf(this.value) > -1;
                }
                if (this.$parent.disabledItemClass) {
                    names[this.$parent.disabledItemClass] = this.disabled;
                }
                return names;
            }
        },
        methods: {
            select: function select() {
                if (this.$parent.type === "radio") {
                    this.selectRadio();
                } else {
                    this.selectCheckbox();
                }
            },
            selectRadio: function selectRadio() {
                if (!this.disabled) {
                    this.$parent.$set("value", this.value);
                    this.$emit("on-item-click", this.value, this.disabled);
                }
            },
            selectCheckbox: function selectCheckbox() {
                if (!this.disabled) {
                    var index = this.$parent.value.indexOf(this.value);
                    if (index > -1) {
                        this.$parent.value.splice(index, 1);
                    } else {
                        if (!this.$parent.max || this.$parent.max && this.$parent.value.length < this.$parent.max) {
                            this.$parent.value.push(this.value);
                        }
                    }
                    this.$emit("on-item-click", this.value, this.disabled);
                }
            }
        }
    };
}, function(module, exports) {}, function(module, exports) {
    module.exports = "<div class=vux-checker-item :class=classNames @click=select> <slot></slot> </div>";
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