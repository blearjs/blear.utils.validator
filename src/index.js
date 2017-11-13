'use strict';

var reURL = /^https?:\/\/([a-z\d-]+\.)+[a-z]{2,5}(:[1-9]\d{0,4})?(\/|\/[\w#!:.?+=&%@!\-\/]+)?$/i;
var reEmail = /^\w+[-+.\w]*@([a-z\d-]+\.)+[a-z]{2,5}$/i;

/**
 * @desc 手机号码段规则
 * 13段：130、131、132、133、134、135、136、137、138、139
 * 14段：145、147
 * 15段：150、151、152、153、155、156、157、158、159
 * 16段：166
 * 17段：170、171、173、175、176、177、178
 * 18段：180、181、182、183、184、185、186、187、188、189
 * 19段：198、199
 */
var mobileRE = /^(13[0-9]|14[57]|15[012356789]|166|17[035678]|18[0-9]|19[89])\d{8}$/;
var ipRE = /^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
var numberRE = /^-?([1-9]\d*|0)(\.(\d*[1-9]|0))?(e[+-]?\d+)?$/i;
var integerRE = /^-?([1-9]\d*|0)$/;
var unstandardZeroRE = /^-?0\.0$/;
//
var idNoRE = /^(\d{6})(18|19|20)\d{2}[01]\d[0123]\d{4}(\d|x)$/i;


/**
 * 字符化
 * @param str
 * @returns {string}
 */
var stringif = function (str) {
    return String(str === undefined || str === null ? '' : str);
};


/**
 * 生成验证规则
 * @param re
 * @returns {Function}
 */
var buildValidator = function (re) {
    return function (str) {
        str = stringif(str);
        return re.test(str);
    }
};


/**
 * 判断是否为 http 格式
 * @type {Function}
 * @param str {*}
 * @returns {boolean}
 */
exports.isHTTP = buildValidator(reURL);


/**
 * 判断是否为 email 格式
 * @type {Function}
 * @param str {*}
 * @returns {boolean}
 */
exports.isEmail = buildValidator(reEmail);


/**
 * 判断是否为 mobile 格式
 * @type {Function}
 * @param str {*}
 * @returns {boolean}
 */
exports.isMobile = buildValidator(mobileRE);


/**
 * 判断是否为 mobile 格式
 * @param str {*}
 * @returns {boolean}
 */
exports.isIP = buildValidator(ipRE);


/**
 * 判断是否为 number 格式
 * @type {Function}
 * @param str {*}
 * @returns {boolean}
 */
exports.isNumber = function (str) {
    str = stringif(str);
    return numberRE.test(str) && !unstandardZeroRE.test(str);
};


/**
 * 判断是否为 整数 格式
 * @type {Function}
 * @param str {*}
 * @returns {boolean}
 */
exports.isInteger = buildValidator(integerRE);


/**
 * 判断是否为 身份证 格式
 * @type {Function}
 * @param str {*}
 * @returns {boolean}
 */
exports.isIdNo = buildValidator(idNoRE);
