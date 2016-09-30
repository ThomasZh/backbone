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
        ready: function ready() {
            this.updateStyle();
        },
        props: {
            max: {
                type: Number,
                "default": 5
            },
            value: {
                type: Number,
                "default": 0
            },
            disabled: Boolean,
            star: {
                type: String,
                "default": "★"
            },
            activeColor: {
                type: String,
                "default": "#fc6"
            },
            margin: {
                type: Number,
                "default": 2
            },
            fontSize: {
                type: Number,
                "default": 25
            }
        },
        computed: {
            sliceValue: function sliceValue() {
                var _val = this.value.toString().split(".");
                return _val.length === 1 ? [ _val[0], 0 ] : _val;
            },
            cutIndex: function cutIndex() {
                return this.sliceValue[0] * 1;
            },
            cutPercent: function cutPercent() {
                return this.sliceValue[1] * 10;
            }
        },
        methods: {
            handleClick: function handleClick(i, force) {
                if (!this.disabled || force) {
                    if (this.value === i + 1) {
                        this.value = i;
                        this.updateStyle();
                    } else {
                        this.value = i + 1;
                    }
                }
            },
            updateStyle: function updateStyle() {
                for (var j = 0; j < this.max; j++) {
                    if (j <= this.value - 1) {
                        this.colors.$set(j, this.activeColor);
                    } else {
                        this.colors.$set(j, "#ccc");
                    }
                }
            }
        },
        data: function data() {
            return {
                colors: [],
                cutIndex: -1,
                cutPercent: 0
            };
        },
        watch: {
            value: function value(val) {
                this.updateStyle();
            }
        }
    };
}, function(module, exports) {}, function(module, exports) {
    module.exports = "<div class=vux-rater> <a class=vux-rater-box v-for=\"i in max\" @click=handleClick(i) :class=\"{'is-active':value > i}\" :style=\"{color: colors && colors[i] ? colors[i] : '#ccc',marginRight:margin+'px',fontSize: fontSize + 'px', width: fontSize + 'px', height: fontSize + 'px', lineHeight: fontSize + 'px'}\"> <span class=vux-rater-inner>{{star}}<span class=vux-rater-outer :style=\"{color: activeColor, width: cutPercent + '%'}\" v-if=\"cutPercent > 0 && cutIndex === i\">{{star}}</span></span> </a> </div>";
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