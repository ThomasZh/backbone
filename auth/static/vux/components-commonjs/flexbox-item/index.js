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
    module.exports = __webpack_require__(3);
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var prefixList = [ "-moz-box-", "-webkit-box-", "" ];
    exports.default = {
        props: {
            span: [ Number, String ],
            order: [ Number, String ]
        },
        methods: {
            buildWidth: function buildWidth(width) {
                if (typeof width === "number") {
                    if (width < 1) {
                        return width;
                    } else {
                        return width / 12;
                    }
                } else if (typeof width === "string") {
                    return width.replace("px", "") / this.bodyWidth;
                }
            }
        },
        computed: {
            style: function style() {
                var styles = {};
                var marginName = this.$parent.orient === "horizontal" ? "marginLeft" : "marginTop";
                styles[marginName] = this.$parent.gutter + "px";
                if (this.span) {
                    for (var i = 0; i < prefixList.length; i++) {
                        styles[prefixList[i] + "flex"] = "0 0 " + this.buildWidth(this.span) * 100 + "%";
                    }
                }
                if (typeof this.order !== "undefined") {
                    styles.order = this.order;
                }
                return styles;
            }
        },
        data: function data() {
            return {
                bodyWidth: document.documentElement.offsetWidth
            };
        }
    };
}, function(module, exports) {
    module.exports = "<div class=vux-flexbox-item :style=style> <slot></slot> </div>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __vue_script__ = __webpack_require__(1);
    __vue_template__ = __webpack_require__(2);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);