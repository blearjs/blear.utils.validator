'use strict';

var urlRE = /^https?:\/\/([a-z\d-]+\.)+[a-z]{2,5}(:[1-9]\d{0,4})?(\/|\/[\w#!:.?+=&%@'/-]+)?$/i;
var emailRE = /^\w+[-+.\w]*@([a-z\d-]+\.)+[a-z]{2,5}$/i;

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
var mobileRE = /^(13[0-9]|14[57]|15[012356789]|166|17[0135678]|18[0-9]|19[89])\d{8}$/;
var ipRE = /^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
var numericalRE = /^-?([1-9]\d*|0)(\.(\d*[1-9]|0))?(e[+-]?\d+)?$/i;
var digitalRE = /^\d+$/;
var integerRE = /^-?([1-9]\d*|0)$/;
var unstandardZeroRE = /^-?0\.0$/;
// http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/
// ["北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "重庆市", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区", "台湾省", "香港特别行政区", "澳门特别行政区"]
// ["11", "12", "13", "14", "15",
// "21", "22", "23",
// "31", "32", "33", "34", "35", "36", "37",
// "41", "42", "43", "44", "45", "46",
// "50", "51", "52", "53", "54",
// "61", "62", "63", "64", "65",
// "71",
// "81", "82"]
// 91 国外
var idNoRE = /^(1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5]|7[1]|8[1-2]|9[1])\d{4}(18|19|20)\d{2}[01]\d[0123]\d{4}[\dxX]$/;


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
exports.isHTTP = buildValidator(urlRE);


/**
 * 判断是否为 email 格式
 * @type {Function}
 * @param str {*}
 * @returns {boolean}
 */
exports.isEmail = buildValidator(emailRE);


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
 * 判断是否为数值（numerical）格式
 * @type {Function}
 * @param str {*}
 * @returns {boolean}
 */
exports.isNumerical = function (str) {
    str = stringif(str);
    return numericalRE.test(str) && !unstandardZeroRE.test(str);
};


/**
 * 判断是否为数字（digital）格式
 * @type {Function}
 * @param str {*}
 * @returns {boolean}
 */
exports.isDigital = function (str) {
    str = stringif(str);
    return digitalRE.test(str);
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
exports.isIdNo = function (str) {
    str = stringif(str);

    var isSameRule = idNoRE.test(str);

    if (!isSameRule) {
        return isSameRule;
    }

    var year = str.slice(6, 10) * 1;
    var month = str.slice(10, 12) * 1;
    var date = str.slice(12, 14) * 1;
    var d = new Date(year, month - 1, date);
    var isSameDate = d.getFullYear() === year && d.getMonth() + 1 === month && d.getDate() === date;

    if (!isSameDate) {
        return isSameDate;
    }

    // 将身份证号码前面的17位数分别乘以不同的系数；
    // 从第一位到第十七位的系数分别为：7－9－10－5－8－4－2－1－6－3－7－9－10－5－8－4－2
    // 将这17位数字和系数相乘的结果相加；
    // 用加出来和除以11，看余数是多少；
    // 余数只可能有0－1－2－3－4－5－6－7－8－9－10这11个数字；
    // 其分别对应的最后一位身份证的号码为1－0－X－9－8－7－6－5－4－3－2
    // 通过上面得知如果余数是2，就会在身份证的第18位数字上出现罗马数字的Ⅹ。如果余数是10，身份证的最后一位号码就是2。
    var coefficientList = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var residueList = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    var sum = 0;
    var start = 0;

    for (; start < 17; start++) {
        sum += str.substr(start, 1) * coefficientList[start];
    }

    return residueList[sum % 11] === str.slice(-1);
};
