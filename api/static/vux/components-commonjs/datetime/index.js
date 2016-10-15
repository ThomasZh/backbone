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
    module.exports = __webpack_require__(17);
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _datetimepicker = __webpack_require__(3);
    var _datetimepicker2 = _interopRequireDefault(_datetimepicker);
    var _group = __webpack_require__(18);
    var _group2 = _interopRequireDefault(_group);
    var _inlineDesc = __webpack_require__(19);
    var _inlineDesc2 = _interopRequireDefault(_inlineDesc);
    var _base = __webpack_require__(9);
    var _base2 = _interopRequireDefault(_base);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        mixins: [ _base2.default ],
        components: {
            Group: _group2.default,
            InlineDesc: _inlineDesc2.default
        },
        props: {
            format: {
                type: String,
                "default": "YYYY-MM-DD"
            },
            title: {
                type: String,
                required: true
            },
            value: {
                type: String,
                "default": ""
            },
            inlineDesc: String,
            placeholder: String,
            minYear: Number,
            maxYear: Number,
            confirmText: {
                type: String,
                "default": "ok"
            },
            cancelText: {
                type: String,
                "default": "cancel"
            },
            clearText: {
                type: String,
                "default": ""
            },
            yearRow: {
                type: String,
                "default": "{value}"
            },
            monthRow: {
                type: String,
                "default": "{value}"
            },
            dayRow: {
                type: String,
                "default": "{value}"
            },
            hourRow: {
                type: String,
                "default": "{value}"
            },
            minuteRow: {
                type: String,
                "default": "{value}"
            }
        },
        ready: function ready() {
            var uuid = this.uuid;
            this.$el.setAttribute("id", "vux-datetime-" + uuid);
            this.render();
        },
        computed: {
            pickerOptions: function pickerOptions() {
                var _this = this;
                var options = {
                    trigger: "#vux-datetime-" + this.uuid,
                    format: this.format,
                    value: this.value,
                    output: ".vux-datetime-value",
                    confirmText: this.confirmText,
                    cancelText: _this.cancelText,
                    clearText: _this.clearText,
                    yearRow: this.yearRow,
                    monthRow: this.monthRow,
                    dayRow: this.dayRow,
                    hourRow: this.hourRow,
                    minuteRow: this.minuteRow,
                    onConfirm: function onConfirm(value) {
                        _this.value = value;
                    },
                    onClear: function onClear(value) {
                        _this.$emit("on-clear", value);
                    }
                };
                if (this.minYear) {
                    options.minYear = this.minYear;
                }
                if (this.maxYear) {
                    options.maxYear = this.maxYear;
                }
                return options;
            }
        },
        methods: {
            render: function render() {
                if (this.picker) {
                    this.picker.destroy();
                }
                this.picker = new _datetimepicker2.default(this.pickerOptions);
            }
        },
        watch: {
            value: function value(val) {
                this.$emit("on-change", val);
            }
        },
        beforeDestroy: function beforeDestroy() {
            this.picker.destroy();
        }
    };
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            title: String,
            titleColor: String,
            labelWidth: String,
            labelAlign: String,
            labelMarginRight: String,
            gutter: String
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _scroller = __webpack_require__(7);
    var _scroller2 = _interopRequireDefault(_scroller);
    var _util = __webpack_require__(5);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var MASK_TEMPLATE = '<div class="dp-mask"></div>';
    var TEMPLATE = '<div class="dp-container">\n  <div class="dp-header">\n    <div class="dp-item dp-left" data-role="cancel">cancel</div>\n    <div class="dp-item dp-center" data-role="clear"></div>\n    <div class="dp-item dp-right" data-role="confirm">ok</div>\n  </div>\n  <div class="dp-content">\n    <div class="dp-item" data-role="year"></div>\n    <div class="dp-item" data-role="month"></div>\n    <div class="dp-item" data-role="day"></div>\n    <div class="dp-item" data-role="hour"></div>\n    <div class="dp-item" data-role="minute"></div>\n  </div>\n</div>';
    var SHOW_ANIMATION_TIME = 100;
    var SHOW_CONTAINER_TIME = 300;
    var TYPE_MAP = {
        year: [ "YYYY" ],
        month: [ "MM", "M" ],
        day: [ "DD", "D" ],
        hour: [ "HH", "H" ],
        minute: [ "mm", "m" ]
    };
    var MASK = null;
    var CURRENT_PICKER;
    var NOW = new Date();
    var DEFAULT_CONFIG = {
        template: TEMPLATE,
        trigger: null,
        output: null,
        currentYear: NOW.getFullYear(),
        currentMonth: NOW.getMonth() + 1,
        minYear: 2e3,
        maxYear: 2030,
        yearRow: "{value}",
        monthRow: "{value}",
        dayRow: "{value}",
        hourRow: "{value}",
        minuteRow: "{value}",
        format: "YYYY-MM-DD",
        value: NOW.getFullYear() + "-" + (NOW.getMonth() + 1) + "-" + NOW.getDate(),
        onSelect: function onSelect() {},
        onConfirm: function onConfirm() {},
        onClear: function onClear() {},
        onShow: function onShow() {},
        onHide: function onHide() {},
        confirmText: "ok",
        clearText: "",
        cancelText: "cancel"
    };
    function renderScroller(el, data, value, fn) {
        var scroller = new _scroller2.default(el, {
            data: data,
            defaultValue: value,
            onSelect: fn
        });
        return scroller;
    }
    function showMask() {
        if (!MASK) {
            MASK = (0, _util.toElement)(MASK_TEMPLATE);
            document.body.appendChild(MASK);
            MASK.addEventListener("click", function() {
                CURRENT_PICKER && CURRENT_PICKER.hide();
            }, false);
        }
        MASK.style.display = "block";
        setTimeout(function() {
            MASK && (MASK.style.opacity = .5);
        }, 0);
    }
    function hideMask() {
        if (!MASK) {
            return;
        }
        MASK.style.opacity = 0;
        setTimeout(function() {
            MASK && (MASK.style.display = "none");
        }, SHOW_ANIMATION_TIME);
    }
    function DatetimePicker(config) {
        var self = this;
        self.config = {};
        self.value = config.value || "";
        (0, _util.each)(DEFAULT_CONFIG, function(key, val) {
            self.config[key] = config[key] || val;
        });
        var trigger = self.config.trigger;
        if (trigger) {
            var output = self.config.output || trigger;
            trigger = self.trigger = (0, _util.getElement)(trigger);
            output = self.output = (0, _util.getElement)(output);
            trigger.addEventListener("click", function(e) {
                e.preventDefault();
                self.show(self.value);
            }, false);
        }
    }
    DatetimePicker.prototype = {
        _show: function _show(newValueMap) {
            var self = this;
            self.container.style.display = "block";
            (0, _util.each)(TYPE_MAP, function(type) {
                self[type + "Scroller"] && self[type + "Scroller"].select((0, _util.trimZero)(newValueMap[type]), false);
            });
            setTimeout(function() {
                self.container.style["-webkit-transform"] = "translateY(0)";
                self.container.style.transform = "translateY(0)";
            }, 0);
        },
        show: function show(value) {
            var self = this;
            var config = self.config;
            CURRENT_PICKER = self;
            var valueMap = self.valueMap = (0, _util.parseDate)(config.format, value || config.value);
            var newValueMap = {};
            (0, _util.each)(TYPE_MAP, function(type, list) {
                newValueMap[type] = list.length === 1 ? valueMap[list[0]] : valueMap[list[0]] || valueMap[list[1]];
            });
            if (self.container) {
                self._show(newValueMap);
            } else {
                var container = self.container = (0, _util.toElement)(config.template);
                document.body.appendChild(container);
                self.container.style.display = "block";
                container.addEventListener("touchstart", function(e) {}, false);
                (0, _util.each)(TYPE_MAP, function(type) {
                    var div = self.find("[data-role=" + type + "]");
                    if (newValueMap[type] === undefined) {
                        (0, _util.removeElement)(div);
                        return;
                    }
                    var data;
                    if (type === "day") {
                        data = self._makeData(type, (0, _util.trimZero)(newValueMap.year), (0, _util.trimZero)(newValueMap.month));
                    } else {
                        data = self._makeData(type);
                    }
                    self[type + "Scroller"] = renderScroller(div, data, (0, _util.trimZero)(newValueMap[type]), function(currentValue) {
                        config.onSelect.call(self, type, currentValue);
                        var currentDay;
                        if (!self.dayScroller) {
                            return;
                        }
                        if (type === "year") {
                            var currentMonth = self.monthScroller ? self.monthScroller.value : config.currentMonth;
                            currentDay = self.dayScroller.value;
                            self._setDayScroller(currentValue, currentMonth, currentDay);
                        } else if (type === "month") {
                            var currentYear = self.yearScroller ? self.yearScroller.value : config.currentYear;
                            currentDay = self.dayScroller.value;
                            self._setDayScroller(currentYear, currentValue, currentDay);
                        }
                    });
                });
                if (!self.renderText) {
                    if (self.config.confirmText) {
                        self.find("[data-role=confirm]").innerText = self.config.confirmText;
                    }
                    if (self.config.cancelText) {
                        self.find("[data-role=cancel]").innerText = self.config.cancelText;
                    }
                    if (self.config.clearText) {
                        self.find("[data-role=clear]").innerText = self.config.clearText;
                    }
                    self.renderText = true;
                }
                this._show(newValueMap);
                self.find("[data-role=cancel]").addEventListener("click", function(e) {
                    e.preventDefault();
                    self.hide();
                }, false);
                self.find("[data-role=confirm]").addEventListener("click", function(e) {
                    e.preventDefault();
                    self.confirm();
                }, false);
                if (self.config.clearText) {
                    self.find("[data-role=clear]").addEventListener("click", function(e) {
                        e.preventDefault();
                        self.clear();
                    }, false);
                }
            }
            showMask();
            config.onShow.call(self);
        },
        _makeData: function _makeData(type, year, month) {
            var config = this.config;
            var valueMap = this.valueMap;
            var list = TYPE_MAP[type];
            var data = [];
            var min;
            var max;
            if (type === "year") {
                min = config.minYear;
                max = config.maxYear;
            } else if (type === "month") {
                min = 1;
                max = 12;
            } else if (type === "day") {
                min = 1;
                max = (0, _util.getMaxDay)(year, month);
            } else if (type === "hour") {
                min = 0;
                max = 23;
            } else if (type === "minute") {
                min = 0;
                max = 59;
            }
            for (var i = min; i <= max; i++) {
                var name;
                if (type === "year") {
                    name = (0, _util.parseRow)(config.yearRow, i);
                } else {
                    var val = valueMap[list[0]] ? (0, _util.addZero)(i) : i;
                    name = (0, _util.parseRow)(config[type + "Row"], val);
                }
                data.push({
                    name: name,
                    value: i
                });
            }
            return data;
        },
        _setDayScroller: function _setDayScroller(year, month, day) {
            var self = this;
            var maxDay = (0, _util.getMaxDay)(year, month);
            if (day > maxDay) {
                day = maxDay;
            }
            self.dayScroller.destroy();
            var div = self.find("[data-role=day]");
            self.dayScroller = renderScroller(div, self._makeData("day", year, month), day, function(currentValue) {
                self.config.onSelect.call(self, "day", currentValue);
            });
        },
        find: function find(selector) {
            return this.container.querySelector(selector);
        },
        hide: function hide() {
            var self = this;
            self.container.style.removeProperty("transform");
            self.container.style.removeProperty("-webkit-transform");
            setTimeout(function() {
                self.container.style.display = "none";
            }, SHOW_CONTAINER_TIME);
            hideMask();
            self.config.onHide.call(self);
        },
        select: function select(type, value) {
            this[type + "Scroller"].select(value, false);
        },
        destroy: function destroy() {
            var self = this;
            (0, _util.removeElement)(MASK);
            (0, _util.removeElement)(self.container);
            MASK = null;
            self.container = null;
        },
        getValue: function getValue() {
            var self = this;
            var config = self.config;
            var value = config.format;
            function formatValue(scroller, expr1, expr2) {
                if (scroller) {
                    var val = scroller.value;
                    if (expr1) {
                        value = value.replace(new RegExp(expr1, "g"), (0, _util.addZero)(val));
                    }
                    if (expr2) {
                        value = value.replace(new RegExp(expr2, "g"), (0, _util.trimZero)(val));
                    }
                }
            }
            (0, _util.each)(TYPE_MAP, function(key, list) {
                formatValue(self[key + "Scroller"], list[0], list[1]);
            });
            return value;
        },
        confirm: function confirm() {
            var self = this;
            var value = self.getValue();
            this.value = value;
            if (self.config.onConfirm.call(self, value) === false) {
                return;
            }
            self.hide();
        },
        clear: function clear() {
            var self = this;
            var value = self.getValue();
            if (self.config.onClear.call(self, value) === false) {
                return;
            }
            self.hide();
        }
    };
    exports.default = DatetimePicker;
}, function(module, exports) {
    "use strict";
    module.exports = function(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "D+": date.getDate(),
            "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds()
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(Y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468" : "") + week[date.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return fmt;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.each = each;
    exports.trimZero = trimZero;
    exports.addZero = addZero;
    exports.isLeapYear = isLeapYear;
    exports.getMaxDay = getMaxDay;
    exports.parseRow = parseRow;
    exports.parseDate = parseDate;
    exports.getElement = getElement;
    exports.toElement = toElement;
    exports.removeElement = removeElement;
    var _format = __webpack_require__(4);
    var _format2 = _interopRequireDefault(_format);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function each(obj, fn) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (fn.call(obj[key], key, obj[key]) === false) {
                    break;
                }
            }
        }
    }
    function trimZero(val) {
        val = String(val);
        val = val ? parseFloat(val.replace(/^0+/g, "")) : "";
        val = val || 0;
        val = val + "";
        return val;
    }
    function addZero(val) {
        val = String(val);
        return val.length < 2 ? "0" + val : val;
    }
    function isLeapYear(year) {
        return year % 100 !== 0 && year % 4 === 0 || year % 400 === 0;
    }
    function getMaxDay(year, month) {
        year = parseFloat(year);
        month = parseFloat(month);
        if (month === 2) {
            return isLeapYear(year) ? 29 : 28;
        }
        return [ 4, 6, 9, 11 ].indexOf(month) >= 0 ? 30 : 31;
    }
    function parseRow(tmpl, value) {
        return tmpl.replace(/\{value\}/g, value);
    }
    function parseDate(format, value) {
        var formatParts = format.split(/[^A-Za-z]+/);
        var valueParts = value.split(/\D+/);
        if (formatParts.length !== valueParts.length) {
            var date = (0, _format2.default)(new Date(), format);
            valueParts = date.split(/\D+/);
        }
        var result = {};
        for (var i = 0; i < formatParts.length; i++) {
            if (formatParts[i]) {
                result[formatParts[i]] = valueParts[i];
            }
        }
        return result;
    }
    function getElement(expr) {
        return typeof expr === "string" ? document.querySelector(expr) : expr;
    }
    function toElement(html) {
        var tempContainer = document.createElement("div");
        tempContainer.innerHTML = html;
        return tempContainer.firstElementChild;
    }
    function removeElement(el) {
        el && el.parentNode.removeChild(el);
    }
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var time = Date.now || function() {
        return +new Date();
    };
    var running = {};
    var counter = 1;
    var desiredFrames = 60;
    var millisecondsPerSecond = 1e3;
    exports.default = {
        requestAnimationFrame: function() {
            var requestFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
            return function(callback, root) {
                requestFrame(callback, root);
            };
        }(),
        stop: function stop(id) {
            var cleared = running[id] != null;
            if (cleared) {
                running[id] = null;
            }
            return cleared;
        },
        isRunning: function isRunning(id) {
            return running[id] != null;
        },
        start: function start(stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
            var _this = this;
            var start = time();
            var lastFrame = start;
            var percent = 0;
            var dropCounter = 0;
            var id = counter++;
            if (!root) {
                root = document.body;
            }
            if (id % 20 === 0) {
                var newRunning = {};
                for (var usedId in running) {
                    newRunning[usedId] = true;
                }
                running = newRunning;
            }
            var step = function step(virtual) {
                var render = virtual !== true;
                var now = time();
                if (!running[id] || verifyCallback && !verifyCallback(id)) {
                    running[id] = null;
                    completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, false);
                    return;
                }
                if (render) {
                    var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
                    for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
                        step(true);
                        dropCounter++;
                    }
                }
                if (duration) {
                    percent = (now - start) / duration;
                    if (percent > 1) {
                        percent = 1;
                    }
                }
                var value = easingMethod ? easingMethod(percent) : percent;
                if ((stepCallback(value, now, render) === false || percent === 1) && render) {
                    running[id] = null;
                    completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, percent === 1 || duration == null);
                } else if (render) {
                    lastFrame = now;
                    _this.requestAnimationFrame(step, root);
                }
            };
            running[id] = true;
            _this.requestAnimationFrame(step, root);
            return id;
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var _animate = __webpack_require__(6);
    var _animate2 = _interopRequireDefault(_animate);
    var _util = __webpack_require__(8);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var TEMPLATE = '\n<div class="scroller-component" data-role="component">\n  <div class="scroller-mask" data-role="mask"></div>\n  <div class="scroller-indicator" data-role="indicator"></div>\n  <div class="scroller-content" data-role="content"></div>\n</div>\n';
    var Scroller = function Scroller(container, options) {
        var self = this;
        options = options || {};
        self.options = {
            itemClass: "scroller-item",
            onSelect: function onSelect() {},
            defaultValue: 0,
            data: []
        };
        for (var key in options) {
            if (options[key] !== undefined) {
                self.options[key] = options[key];
            }
        }
        self.__container = (0, _util.getElement)(container);
        var tempContainer = document.createElement("div");
        tempContainer.innerHTML = options.template || TEMPLATE;
        var component = self.__component = tempContainer.querySelector("[data-role=component]");
        var content = self.__content = component.querySelector("[data-role=content]");
        var indicator = component.querySelector("[data-role=indicator]");
        var data = self.options.data;
        var html = "";
        if (data.length && data[0].constructor === Object) {
            data.forEach(function(row) {
                html += '<div class="' + self.options.itemClass + '" data-value="' + row.value + '">' + row.name + "</div>";
            });
        } else {
            data.forEach(function(val) {
                html += '<div class="' + self.options.itemClass + '" data-value="' + val + '">' + val + "</div>";
            });
        }
        content.innerHTML = html;
        self.__container.appendChild(component);
        self.__itemHeight = parseInt((0, _util.getComputedStyle)(indicator, "height"), 10);
        self.__callback = options.callback || function(top) {
            content.style.webkitTransform = "translate3d(0, " + -top + "px, 0)";
        };
        var rect = component.getBoundingClientRect();
        self.__clientTop = rect.top + component.clientTop || 0;
        self.__setDimensions(component.clientHeight, content.offsetHeight);
        if (component.clientHeight === 0) {
            self.__setDimensions(parseInt((0, _util.getComputedStyle)(component, "height"), 10), 204);
        }
        self.select(self.options.defaultValue, false);
        component.addEventListener("touchstart", function(e) {
            if (e.target.tagName.match(/input|textarea|select/i)) {
                return;
            }
            e.preventDefault();
            self.__doTouchStart(e.touches, e.timeStamp);
        }, false);
        component.addEventListener("touchmove", function(e) {
            self.__doTouchMove(e.touches, e.timeStamp);
        }, false);
        component.addEventListener("touchend", function(e) {
            self.__doTouchEnd(e.timeStamp);
        }, false);
    };
    var members = {
        value: null,
        __prevValue: null,
        __isSingleTouch: false,
        __isTracking: false,
        __didDecelerationComplete: false,
        __isGesturing: false,
        __isDragging: false,
        __isDecelerating: false,
        __isAnimating: false,
        __clientTop: 0,
        __clientHeight: 0,
        __contentHeight: 0,
        __itemHeight: 0,
        __scrollTop: 0,
        __minScrollTop: 0,
        __maxScrollTop: 0,
        __scheduledTop: 0,
        __lastTouchTop: null,
        __lastTouchMove: null,
        __positions: null,
        __minDecelerationScrollTop: null,
        __maxDecelerationScrollTop: null,
        __decelerationVelocityY: null,
        __setDimensions: function __setDimensions(clientHeight, contentHeight) {
            var self = this;
            self.__clientHeight = clientHeight;
            self.__contentHeight = contentHeight;
            var totalItemCount = self.options.data.length;
            var clientItemCount = Math.round(self.__clientHeight / self.__itemHeight);
            self.__minScrollTop = -self.__itemHeight * (clientItemCount / 2);
            self.__maxScrollTop = self.__minScrollTop + totalItemCount * self.__itemHeight - .1;
        },
        selectByIndex: function selectByIndex(index, animate) {
            var self = this;
            if (index < 0 || index > self.__content.childElementCount - 1) {
                return;
            }
            self.__scrollTop = self.__minScrollTop + index * self.__itemHeight;
            self.scrollTo(self.__scrollTop, animate);
            self.__selectItem(self.__content.children[index]);
        },
        select: function select(value, animate) {
            var self = this;
            var children = self.__content.children;
            for (var i = 0, len = children.length; i < len; i++) {
                if (children[i].dataset.value === value) {
                    self.selectByIndex(i, animate);
                    return;
                }
            }
            self.selectByIndex(0, animate);
        },
        getValue: function getValue() {
            return this.value;
        },
        scrollTo: function scrollTo(top, animate) {
            var self = this;
            animate = animate === undefined ? true : animate;
            if (self.__isDecelerating) {
                _animate2.default.stop(self.__isDecelerating);
                self.__isDecelerating = false;
            }
            top = Math.round(top / self.__itemHeight) * self.__itemHeight;
            top = Math.max(Math.min(self.__maxScrollTop, top), self.__minScrollTop);
            if (top === self.__scrollTop || !animate) {
                self.__publish(top);
                self.__scrollingComplete();
                return;
            }
            self.__publish(top, 250);
        },
        destroy: function destroy() {
            this.__component.parentNode && this.__component.parentNode.removeChild(this.__component);
        },
        __selectItem: function __selectItem(selectedItem) {
            var self = this;
            var selectedItemClass = self.options.itemClass + "-selected";
            var lastSelectedElem = self.__content.querySelector("." + selectedItemClass);
            if (lastSelectedElem) {
                lastSelectedElem.classList.remove(selectedItemClass);
            }
            selectedItem.classList.add(selectedItemClass);
            if (self.value !== null) {
                self.__prevValue = self.value;
            }
            self.value = selectedItem.dataset.value;
        },
        __scrollingComplete: function __scrollingComplete() {
            var self = this;
            var index = Math.round((self.__scrollTop - self.__minScrollTop - self.__itemHeight / 2) / self.__itemHeight);
            self.__selectItem(self.__content.children[index]);
            if (self.__prevValue !== null && self.__prevValue !== self.value) {
                self.options.onSelect(self.value);
            }
        },
        __doTouchStart: function __doTouchStart(touches, timeStamp) {
            var self = this;
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }
            if (timeStamp instanceof Date) {
                timeStamp = timeStamp.valueOf();
            }
            if (typeof timeStamp !== "number") {
                throw new Error("Invalid timestamp value: " + timeStamp);
            }
            self.__interruptedAnimation = true;
            if (self.__isDecelerating) {
                _animate2.default.stop(self.__isDecelerating);
                self.__isDecelerating = false;
                self.__interruptedAnimation = true;
            }
            if (self.__isAnimating) {
                _animate2.default.stop(self.__isAnimating);
                self.__isAnimating = false;
                self.__interruptedAnimation = true;
            }
            var currentTouchTop;
            var isSingleTouch = touches.length === 1;
            if (isSingleTouch) {
                currentTouchTop = touches[0].pageY;
            } else {
                currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }
            self.__initialTouchTop = currentTouchTop;
            self.__lastTouchTop = currentTouchTop;
            self.__lastTouchMove = timeStamp;
            self.__lastScale = 1;
            self.__enableScrollY = !isSingleTouch;
            self.__isTracking = true;
            self.__didDecelerationComplete = false;
            self.__isDragging = !isSingleTouch;
            self.__isSingleTouch = isSingleTouch;
            self.__positions = [];
        },
        __doTouchMove: function __doTouchMove(touches, timeStamp, scale) {
            var self = this;
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }
            if (timeStamp instanceof Date) {
                timeStamp = timeStamp.valueOf();
            }
            if (typeof timeStamp !== "number") {
                throw new Error("Invalid timestamp value: " + timeStamp);
            }
            if (!self.__isTracking) {
                return;
            }
            var currentTouchTop;
            if (touches.length === 2) {
                currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            } else {
                currentTouchTop = touches[0].pageY;
            }
            var positions = self.__positions;
            if (self.__isDragging) {
                var moveY = currentTouchTop - self.__lastTouchTop;
                var scrollTop = self.__scrollTop;
                if (self.__enableScrollY) {
                    scrollTop -= moveY;
                    var minScrollTop = self.__minScrollTop;
                    var maxScrollTop = self.__maxScrollTop;
                    if (scrollTop > maxScrollTop || scrollTop < minScrollTop) {
                        if (scrollTop > maxScrollTop) {
                            scrollTop = maxScrollTop;
                        } else {
                            scrollTop = minScrollTop;
                        }
                    }
                }
                if (positions.length > 40) {
                    positions.splice(0, 20);
                }
                positions.push(scrollTop, timeStamp);
                self.__publish(scrollTop);
            } else {
                var minimumTrackingForScroll = 0;
                var minimumTrackingForDrag = 5;
                var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);
                self.__enableScrollY = distanceY >= minimumTrackingForScroll;
                positions.push(self.__scrollTop, timeStamp);
                self.__isDragging = self.__enableScrollY && distanceY >= minimumTrackingForDrag;
                if (self.__isDragging) {
                    self.__interruptedAnimation = false;
                }
            }
            self.__lastTouchTop = currentTouchTop;
            self.__lastTouchMove = timeStamp;
            self.__lastScale = scale;
        },
        __doTouchEnd: function __doTouchEnd(timeStamp) {
            var self = this;
            if (timeStamp instanceof Date) {
                timeStamp = timeStamp.valueOf();
            }
            if (typeof timeStamp !== "number") {
                throw new Error("Invalid timestamp value: " + timeStamp);
            }
            if (!self.__isTracking) {
                return;
            }
            self.__isTracking = false;
            if (self.__isDragging) {
                self.__isDragging = false;
                if (self.__isSingleTouch && timeStamp - self.__lastTouchMove <= 100) {
                    var positions = self.__positions;
                    var endPos = positions.length - 1;
                    var startPos = endPos;
                    for (var i = endPos; i > 0 && positions[i] > self.__lastTouchMove - 100; i -= 2) {
                        startPos = i;
                    }
                    if (startPos !== endPos) {
                        var timeOffset = positions[endPos] - positions[startPos];
                        var movedTop = self.__scrollTop - positions[startPos - 1];
                        self.__decelerationVelocityY = movedTop / timeOffset * (1e3 / 60);
                        var minVelocityToStartDeceleration = 4;
                        if (Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {
                            self.__startDeceleration(timeStamp);
                        }
                    }
                }
            }
            if (!self.__isDecelerating) {
                self.scrollTo(self.__scrollTop);
            }
            self.__positions.length = 0;
        },
        __publish: function __publish(top, animationDuration) {
            var self = this;
            var wasAnimating = self.__isAnimating;
            if (wasAnimating) {
                _animate2.default.stop(wasAnimating);
                self.__isAnimating = false;
            }
            if (animationDuration) {
                self.__scheduledTop = top;
                var oldTop = self.__scrollTop;
                var diffTop = top - oldTop;
                var step = function step(percent, now, render) {
                    self.__scrollTop = oldTop + diffTop * percent;
                    if (self.__callback) {
                        self.__callback(self.__scrollTop);
                    }
                };
                var verify = function verify(id) {
                    return self.__isAnimating === id;
                };
                var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
                    if (animationId === self.__isAnimating) {
                        self.__isAnimating = false;
                    }
                    if (self.__didDecelerationComplete || wasFinished) {
                        self.__scrollingComplete();
                    }
                };
                self.__isAnimating = _animate2.default.start(step, verify, completed, animationDuration, wasAnimating ? _util.easeOutCubic : _util.easeInOutCubic);
            } else {
                self.__scheduledTop = self.__scrollTop = top;
                if (self.__callback) {
                    self.__callback(top);
                }
            }
        },
        __startDeceleration: function __startDeceleration(timeStamp) {
            var self = this;
            self.__minDecelerationScrollTop = self.__minScrollTop;
            self.__maxDecelerationScrollTop = self.__maxScrollTop;
            var step = function step(percent, now, render) {
                self.__stepThroughDeceleration(render);
            };
            var minVelocityToKeepDecelerating = .5;
            var verify = function verify() {
                var shouldContinue = Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating;
                if (!shouldContinue) {
                    self.__didDecelerationComplete = true;
                }
                return shouldContinue;
            };
            var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
                self.__isDecelerating = false;
                if (self.__scrollTop <= self.__minScrollTop || self.__scrollTop >= self.__maxScrollTop) {
                    self.scrollTo(self.__scrollTop);
                    return;
                }
                if (self.__didDecelerationComplete) {
                    self.__scrollingComplete();
                }
            };
            self.__isDecelerating = _animate2.default.start(step, verify, completed);
        },
        __stepThroughDeceleration: function __stepThroughDeceleration(render) {
            var self = this;
            var scrollTop = self.__scrollTop + self.__decelerationVelocityY;
            var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);
            if (scrollTopFixed !== scrollTop) {
                scrollTop = scrollTopFixed;
                self.__decelerationVelocityY = 0;
            }
            if (Math.abs(self.__decelerationVelocityY) <= 1) {
                if (Math.abs(scrollTop % self.__itemHeight) < 1) {
                    self.__decelerationVelocityY = 0;
                }
            } else {
                self.__decelerationVelocityY *= .95;
            }
            self.__publish(scrollTop);
        }
    };
    for (var key in members) {
        Scroller.prototype[key] = members[key];
    }
    module.exports = Scroller;
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getElement = getElement;
    exports.getComputedStyle = getComputedStyle;
    exports.easeOutCubic = easeOutCubic;
    exports.easeInOutCubic = easeInOutCubic;
    function getElement(expr) {
        return typeof expr === "string" ? document.querySelector(expr) : expr;
    }
    function getComputedStyle(el, key) {
        var computedStyle = window.getComputedStyle(el);
        return computedStyle[key] || "";
    }
    function easeOutCubic(pos) {
        return Math.pow(pos - 1, 3) + 1;
    }
    function easeInOutCubic(pos) {
        if ((pos /= .5) < 1) {
            return .5 * Math.pow(pos, 3);
        }
        return .5 * (Math.pow(pos - 2, 3) + 2);
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _mixin_uuid = __webpack_require__(10);
    var _mixin_uuid2 = _interopRequireDefault(_mixin_uuid);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        mixins: [ _mixin_uuid2.default ],
        props: {
            required: {
                type: Boolean,
                "default": true
            }
        },
        created: function created() {
            this.handleChangeEvent = false;
        },
        computed: {
            dirty: function dirty() {
                return !this.prisine;
            },
            invalid: function invalid() {
                return !this.valid;
            }
        },
        methods: {
            setTouched: function setTouched() {
                this.touched = true;
            }
        },
        watch: {
            value: function value(newVal) {
                if (this.prisine === true) {
                    this.prisine = false;
                }
                if (!this.handleChangeEvent) {
                    this.$emit("on-change", newVal);
                }
            }
        },
        data: function data() {
            return {
                errors: {},
                prisine: true,
                touched: false,
                valid: true
            };
        }
    };
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        created: function created() {
            this.uuid = Math.random().toString(36).substring(3, 8);
        }
    };
}, function(module, exports) {}, function(module, exports) {}, function(module, exports) {}, function(module, exports) {
    module.exports = '<a class=weui_cell href=javascript:> <div class="weui_cell_bd weui_cell_primary"> <p>{{title}}</p> <inline-desc v-if=inlineDesc>{{inlineDesc}}</inline-desc> </div> <div class="weui_cell_ft with_arrow vux-datetime-value">{{value || placeholder}}</div> </a>';
}, function(module, exports) {
    module.exports = '<div> <div class=weui_cells_title v-if=title :style={color:titleColor} v-html=title></div> <div class=weui_cells :class="{\'vux-no-group-title\':!title}" :style="{marginTop: gutter}"> <slot></slot> </div> </div>';
}, function(module, exports) {
    module.exports = "<span class=vux-label-desc><slot></slot></span>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(12);
    __vue_script__ = __webpack_require__(1);
    __vue_template__ = __webpack_require__(14);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(11);
    __vue_script__ = __webpack_require__(2);
    __vue_template__ = __webpack_require__(15);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(13);
    __vue_template__ = __webpack_require__(16);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);