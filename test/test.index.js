/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var lang = require('../src/index.js');

describe('index.js', function () {
    it('.isHTTP', function (done) {
        expect(lang.isHTTP()).toBe(false);
        expect(lang.isHTTP('http://aba.com')).toBe(true);
        done();
    });

    it('.isEmail', function (done) {
        expect(lang.isEmail()).toBe(false);
        expect(lang.isEmail('http://aba.com')).toBe(false);
        expect(lang.isEmail('http@aba.com')).toBe(true);
        expect(lang.isEmail('ht.tp@aba.com')).toBe(true);
        done();
    });

    it('.isMobile', function (done) {
        expect(lang.isMobile()).toBe(false);
        expect(lang.isMobile('18112345678')).toBe(true);
        expect(lang.isMobile('11112345678')).toBe(false);
        done();
    });

    it('.isIP', function (done) {
        expect(lang.isIP()).toBe(false);
        expect(lang.isIP('11.11.111.11')).toBe(true);
        expect(lang.isIP('222.233.455.11')).toBe(false);
        done();
    });

    it('.isNumber', function (done) {
        expect(lang.isNumber()).toBe(false);
        expect(lang.isNumber('11.11')).toBe(true);
        expect(lang.isNumber('11')).toBe(true);
        expect(lang.isNumber('-1')).toBe(true);
        expect(lang.isNumber('-1.1')).toBe(true);
        expect(lang.isNumber('-0.1')).toBe(true);
        expect(lang.isNumber('-0.0')).toBe(false);
        expect(lang.isNumber('-0.10000')).toBe(false);
        expect(lang.isNumber('-0000.1')).toBe(false);
        expect(lang.isNumber('1.5.11')).toBe(false);
        expect(lang.isNumber('1.303')).toBe(true);
        expect(lang.isNumber('1.313')).toBe(true);
        done();
    });

    it('.isInteger', function (done) {
        expect(lang.isInteger()).toBe(false);
        expect(lang.isInteger(0)).toBe(true);
        expect(lang.isInteger(1)).toBe(true);
        expect(lang.isInteger(-1)).toBe(true);
        expect(lang.isInteger(+1)).toBe(true);
        expect(lang.isInteger('10')).toBe(true);
        expect(lang.isInteger('01')).toBe(false);
        done();
    });

    it('.isIDCard', function (done) {
        expect(lang.isIDCard(''.concat('341341', '1999', '01','01', '0000'))).toBe(true);
        expect(lang.isIDCard(''.concat('341341', '1999', '01','01', '000x'))).toBe(true);
        expect(lang.isIDCard(''.concat('341341', '1999', '01','01', '000X'))).toBe(true);
        expect(lang.isIDCard(''.concat('341341', '1199', '01','01', '0000'))).toBe(false);
        expect(lang.isIDCard(''.concat('341341', '1999', '21','01', '0000'))).toBe(false);
        expect(lang.isIDCard(''.concat('341341', '1999', '11','12', '00xx'))).toBe(false);
        done();
    });
});
