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
    var _format = __webpack_require__(1);
    var _format2 = _interopRequireDefault(_format);
    var _util = __webpack_require__(4);
    var _props = __webpack_require__(3);
    var _props2 = _interopRequireDefault(_props);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        props: (0, _props2.default)(),
        data: function data() {
            return {
                year: 0,
                month: 0,
                days: [],
                current: [],
                today: (0, _format2.default)(new Date(), "YYYY-MM-DD"),
                months: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ]
            };
        },
        ready: function ready() {
            this.value = this.convertDate(this.value);
            this.render(this.renderMonth[0], this.renderMonth[1] - 1);
        },
        computed: {
            _replaceTextList: function _replaceTextList() {
                var rs = {};
                for (var i in this.replaceTextList) {
                    rs[this.convertDate(i)] = this.replaceTextList[i];
                }
                return rs;
            }
        },
        watch: {
            value: function value(val) {
                this.value = this.convertDate(val);
                if (this.renderOnValueChange) {
                    this.render(null, null, val);
                } else {
                    this.render(this.year, this.month, this.value);
                }
                this.$emit("on-change", val);
            },
            returnSixRows: function returnSixRows(val) {
                this.render(this.year, this.month, this.value);
            },
            disablePast: function disablePast() {
                this.render(this.year, this.month, this.value);
            },
            disableFuture: function disableFuture() {
                this.render(this.year, this.month, this.value);
            }
        },
        methods: {
            replaceText: function replaceText(day, formatDay) {
                return this._replaceTextList[formatDay] || day;
            },
            convertDate: function convertDate(date) {
                return date === "TODAY" ? this.today : date;
            },
            buildClass: function buildClass(index, child, isCurrent) {
                var className = {
                    current: child.current || isCurrent,
                    "is-disabled": child.disabled,
                    "is-today": child.isToday
                };
                className["is-week-" + index] = true;
                return className;
            },
            render: function render(year, month) {
                var data = (0, _util.getDays)({
                    year: year,
                    month: month,
                    value: this.value,
                    rangeBegin: this.convertDate(this.startDate),
                    rangeEnd: this.convertDate(this.endDate),
                    returnSixRows: this.returnSixRows,
                    disablePast: this.disablePast,
                    disableFuture: this.disableFuture
                });
                this.days = data.days;
                this.year = data.year;
                this.month = data.month;
            },
            formatDate: function formatDate(year, month, child) {
                return [ year, (0, _util.zero)(month + 1), (0, _util.zero)(child.day) ].join("-");
            },
            prev: function prev() {
                if (this.month === 0) {
                    this.month = 11;
                    this.year = this.year - 1;
                } else {
                    this.month = this.month - 1;
                }
                this.render(this.year, this.month);
            },
            next: function next() {
                if (this.month === 11) {
                    this.month = 0;
                    this.year = this.year + 1;
                } else {
                    this.month = this.month + 1;
                }
                this.render(this.year, this.month);
            },
            go: function go(year, month) {
                this.render(year, month);
            },
            select: function select(k1, k2) {
                if (this.current.length > 0) {
                    this.days[this.current[0]][this.current[1]].isCurrent = false;
                }
                this.days[k1][k2].current = true;
                this.current = [ k1, k2 ];
                this.value = [ this.year, (0, _util.zero)(this.month + 1), (0, _util.zero)(this.days[k1][k2].day) ].join("-");
            }
        }
    };
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = function() {
        return {
            value: {
                type: String,
                twoWay: true,
                "default": ""
            },
            renderMonth: {
                type: Array,
                "default": function _default() {
                    return [ null, null ];
                }
            },
            startDate: {
                type: String
            },
            endDate: {
                type: String
            },
            showLastMonth: {
                type: Boolean,
                "default": true
            },
            showNextMonth: {
                type: Boolean,
                "default": true
            },
            highlightWeekend: {
                type: Boolean,
                "default": false
            },
            returnSixRows: {
                type: Boolean,
                "default": true
            },
            hideHeader: {
                type: Boolean,
                "default": false
            },
            hideWeekList: {
                type: Boolean,
                "default": false
            },
            replaceTextList: {
                type: Object,
                "default": function _default() {
                    return {};
                }
            },
            weeksList: {
                type: Array,
                "default": function _default() {
                    return [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ];
                }
            },
            customSlotFn: {
                type: Function,
                "default": function _default() {
                    return "";
                }
            },
            renderOnValueChange: {
                type: Boolean,
                "default": true
            },
            disablePast: {
                type: Boolean,
                "default": false
            },
            disableFuture: {
                type: Boolean,
                "default": false
            }
        };
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.zero = zero;
    exports.splitValue = splitValue;
    exports.getPrevTime = getPrevTime;
    exports.getNextTime = getNextTime;
    exports.getDays = getDays;
    var _format2 = __webpack_require__(1);
    var _format3 = _interopRequireDefault(_format2);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function zero(n) {
        return n < 10 ? "0" + n : n;
    }
    function splitValue(value) {
        var split = value.split("-");
        return {
            year: parseInt(split[0], 10),
            month: parseInt(split[1], 10) - 1,
            day: parseInt(split[2], 10)
        };
    }
    function getPrevTime(year, month) {
        if (month === 0) {
            return {
                month: 11,
                year: year - 1
            };
        } else {
            return {
                year: year,
                month: month - 1
            };
        }
    }
    function getNextTime(year, month) {
        if (month === 11) {
            return {
                month: 0,
                year: year + 1
            };
        } else {
            return {
                year: year,
                month: month + 1
            };
        }
    }
    function getTime(str) {
        if (typeof str === "number") {
            return str;
        }
        return typeof str === "string" ? new Date(str.replace(/-/g, "/")).getTime() : str.getTime();
    }
    function isBetween(value, start, end) {
        value = getTime(value);
        var isGte = start ? value >= getTime(start) : true;
        var isLte = end ? value <= getTime(end) : true;
        return isGte && isLte;
    }
    function getDays(_ref) {
        var year = _ref.year;
        var month = _ref.month;
        var value = _ref.value;
        var _ref$isRange = _ref.isRange;
        var isRange = _ref$isRange === undefined ? false : _ref$isRange;
        var rangeBegin = _ref.rangeBegin;
        var rangeEnd = _ref.rangeEnd;
        var _ref$returnSixRows = _ref.returnSixRows;
        var returnSixRows = _ref$returnSixRows === undefined ? true : _ref$returnSixRows;
        var _ref$disablePast = _ref.disablePast;
        var disablePast = _ref$disablePast === undefined ? false : _ref$disablePast;
        var _ref$disableFuture = _ref.disableFuture;
        var disableFuture = _ref$disableFuture === undefined ? false : _ref$disableFuture;
        var today = (0, _format3.default)(new Date(), "YYYY-MM-DD");
        var startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        var _splitValue = splitValue(value || today);
        if (typeof year !== "number" || typeof month !== "number" || month < 0) {
            year = _splitValue.year;
            month = _splitValue.month;
        }
        if (disablePast) {
            if (!rangeBegin) {
                rangeBegin = startOfToday;
            } else {
                rangeBegin = Math.max(startOfToday.getTime(), getTime(rangeBegin));
            }
        }
        if (disableFuture) {
            if (!rangeEnd) {
                rangeEnd = startOfToday;
            } else {
                rangeEnd = Math.min(startOfToday.getTime(), getTime(rangeEnd));
            }
        }
        var firstDayOfMonth = new Date(year, month, 1).getDay();
        var lastDateOfMonth = new Date(year, month + 1, 0).getDate();
        var lastDayOfLastMonth = new Date(year, month, 0).getDate();
        var i;
        var line = 0;
        var temp = [];
        for (i = 1; i <= lastDateOfMonth; i++) {
            var dow = new Date(year, month, i).getDay();
            if (dow === 0) {
                temp[line] = [];
            } else if (i === 1) {
                temp[line] = [];
                var k = lastDayOfLastMonth - firstDayOfMonth + 1;
                for (var j = 0; j < firstDayOfMonth; j++) {
                    var rs = getPrevTime(year, month);
                    temp[line].push({
                        year: rs.year,
                        month: rs.month,
                        month_str: rs.month + 1,
                        day: k,
                        disabled: true,
                        isLastMonth: true
                    });
                    k++;
                }
            }
            var _format = (0, _format3.default)(new Date(year + "/" + (month + 1) + "/" + i), "YYYY/MM/DD");
            var options = {
                year: year,
                month: month,
                month_str: month + 1,
                day: i,
                isCurrent: value && (0, _format3.default)(new Date(value), "YYYY/MM/DD") === _format,
                disabled: !isBetween(_format, rangeBegin, rangeEnd),
                isToday: (0, _format3.default)(new Date(), "YYYY/MM/DD") === _format
            };
            temp[line].push(options);
            if (dow === 6) {
                line++;
            } else if (i === lastDateOfMonth) {
                var _k = 1;
                for (dow; dow < 6; dow++) {
                    var _rs = getNextTime(year, month);
                    temp[line].push({
                        year: _rs.year,
                        month: _rs.month,
                        month_str: _rs.month + 1,
                        day: _k,
                        disabled: true,
                        isNextMonth: true
                    });
                    _k++;
                }
            }
        }
        if (returnSixRows && temp.length === 5) {
            var _rs2 = getNextTime(year, month);
            var start = temp[4][6].isNextMonth ? temp[4][6].day : 0;
            temp[6] = [];
            for (var _i = 0; _i < 7; _i++) {
                temp[6].push({
                    year: _rs2.year,
                    month: _rs2.month,
                    month_str: _rs2.month + 1,
                    day: ++start,
                    disabled: true,
                    isNextMonth: true
                });
            }
        }
        if (returnSixRows && temp.length === 4) {
            var _rs3 = getNextTime(year, month);
            var _start = 0;
            temp[5] = [];
            temp[6] = [];
            for (var _i2 = 0; _i2 < 7; _i2++) {
                temp[5].push({
                    year: _rs3.year,
                    month: _rs3.month,
                    month_str: _rs3.month + 1,
                    day: ++_start,
                    disabled: true,
                    isNextMonth: true
                });
                temp[6].push({
                    year: _rs3.year,
                    month: _rs3.month,
                    month_str: _rs3.month + 1,
                    day: ++_start,
                    disabled: true,
                    isNextMonth: true
                });
            }
        }
        return {
            year: year,
            month: month,
            month_str: month + 1,
            days: temp
        };
    }
}, function(module, exports) {}, function(module, exports) {
    module.exports = '<div class=inline-calendar :class="{\'is-weekend-highlight\': highlightWeekend}"> <div class=calendar-header v-show=!hideHeader> <div class=calendar-year> <a class="year-prev vux-prev-icon" href=javascript: @click="go(year - 1, month)"></a> <a class="calendar-year-txt calendar-title" href=javascript:>{{year}}</a> <a class="year-next vux-next-icon" href=javascript: @click="go(year + 1, month)"></a> </div> <div class=calendar-month> <a @click=prev class="month-prev vux-prev-icon" href=javascript:></a> <a class="calendar-month-txt calendar-title" href=javascript:>{{months[month]}}</a> <a @click=next class="month-next vux-next-icon" href=javascript:></a> </div> </div> <table> <thead v-show=!hideWeekList> <tr> <th v-for="(index, week) in weeksList" class="week is-week-list-{{index}}">{{week}}</th> </tr> </thead> <tbody> <tr v-for="(k1,day) in days"> <td :data-date="formatDate(year, month, child)" :data-current=value v-for="(k2,child) in day" :class="buildClass(k2, child, formatDate(year, month, child) === value && !child.isLastMonth && !child.isNextMonth)" @click=select(k1,k2,$event)> <span v-show="(!child.isLastMonth && !child.isNextMonth ) || (child.isLastMonth && showLastMonth) || (child.isNextMonth && showNextMonth)">{{replaceText(child.day, formatDate(year, month, child))}}</span> {{{customSlotFn(k1, k2, child)}}} </td> </tr> </tbody> </table> </div>';
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(5);
    __vue_script__ = __webpack_require__(2);
    __vue_template__ = __webpack_require__(6);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);