/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var validator = require('../src/index.js');

describe('index.js', function () {
    it('.isHTTP', function (done) {
        expect(validator.isHTTP()).toBe(false);
        expect(validator.isHTTP('http://aba.com')).toBe(true);
        done();
    });

    it('.isEmail', function (done) {
        expect(validator.isEmail()).toBe(false);
        expect(validator.isEmail('http://aba.com')).toBe(false);
        expect(validator.isEmail('http@aba.com')).toBe(true);
        expect(validator.isEmail('ht.tp@aba.com')).toBe(true);
        done();
    });

    it('.isMobile', function (done) {
        expect(validator.isMobile()).toBe(false);

        expect(validator.isMobile('13012345678')).toBe(true);
        expect(validator.isMobile('13112345678')).toBe(true);
        expect(validator.isMobile('13212345678')).toBe(true);
        expect(validator.isMobile('13312345678')).toBe(true);
        expect(validator.isMobile('13412345678')).toBe(true);
        expect(validator.isMobile('13512345678')).toBe(true);
        expect(validator.isMobile('13612345678')).toBe(true);
        expect(validator.isMobile('13712345678')).toBe(true);
        expect(validator.isMobile('13812345678')).toBe(true);
        expect(validator.isMobile('13912345678')).toBe(true);

        expect(validator.isMobile('14512345678')).toBe(true);
        expect(validator.isMobile('14712345678')).toBe(true);

        expect(validator.isMobile('15012345678')).toBe(true);
        expect(validator.isMobile('15112345678')).toBe(true);
        expect(validator.isMobile('15212345678')).toBe(true);
        expect(validator.isMobile('15312345678')).toBe(true);
        expect(validator.isMobile('15412345678')).toBe(false);
        expect(validator.isMobile('15512345678')).toBe(true);
        expect(validator.isMobile('15612345678')).toBe(true);
        expect(validator.isMobile('15712345678')).toBe(true);
        expect(validator.isMobile('15812345678')).toBe(true);
        expect(validator.isMobile('15912345678')).toBe(true);

        expect(validator.isMobile('16612345678')).toBe(true);

        expect(validator.isMobile('17012345678')).toBe(true);
        expect(validator.isMobile('17112345678')).toBe(false);
        expect(validator.isMobile('17212345678')).toBe(false);
        expect(validator.isMobile('17312345678')).toBe(true);
        expect(validator.isMobile('17412345678')).toBe(false);
        expect(validator.isMobile('17512345678')).toBe(false);
        expect(validator.isMobile('17612345678')).toBe(true);
        expect(validator.isMobile('17712345678')).toBe(true);
        expect(validator.isMobile('17812345678')).toBe(true);
        expect(validator.isMobile('17912345678')).toBe(false);

        expect(validator.isMobile('18012345678')).toBe(true);
        expect(validator.isMobile('18112345678')).toBe(true);
        expect(validator.isMobile('18212345678')).toBe(true);
        expect(validator.isMobile('18312345678')).toBe(true);
        expect(validator.isMobile('18412345678')).toBe(true);
        expect(validator.isMobile('18512345678')).toBe(true);
        expect(validator.isMobile('18612345678')).toBe(true);
        expect(validator.isMobile('18712345678')).toBe(true);
        expect(validator.isMobile('18812345678')).toBe(true);
        expect(validator.isMobile('18912345678')).toBe(true);

        expect(validator.isMobile('19812345678')).toBe(true);
        expect(validator.isMobile('19912345678')).toBe(true);

        done();
    });

    it('.isIP', function (done) {
        expect(validator.isIP()).toBe(false);
        expect(validator.isIP('11.11.111.11')).toBe(true);
        expect(validator.isIP('222.233.455.11')).toBe(false);
        done();
    });

    it('.isNumber', function (done) {
        expect(validator.isNumber()).toBe(false);
        expect(validator.isNumber('11.11')).toBe(true);
        expect(validator.isNumber('11')).toBe(true);
        expect(validator.isNumber('-1')).toBe(true);
        expect(validator.isNumber('-1.1')).toBe(true);
        expect(validator.isNumber('-0.1')).toBe(true);
        expect(validator.isNumber('-0.0')).toBe(false);
        expect(validator.isNumber('-0.10000')).toBe(false);
        expect(validator.isNumber('-0000.1')).toBe(false);
        expect(validator.isNumber('1.5.11')).toBe(false);
        expect(validator.isNumber('1.303')).toBe(true);
        expect(validator.isNumber('1.313')).toBe(true);
        expect(validator.isNumber('1e+1')).toBe(true);
        expect(validator.isNumber('1.1e+1')).toBe(true);
        expect(validator.isNumber('1e1')).toBe(true);
        expect(validator.isNumber('1.1e1')).toBe(true);
        expect(validator.isNumber('1e-12')).toBe(true);
        expect(validator.isNumber('1.1e-12')).toBe(true);
        done();
    });

    it('.isInteger', function (done) {
        expect(validator.isInteger()).toBe(false);
        expect(validator.isInteger(0)).toBe(true);
        expect(validator.isInteger(1)).toBe(true);
        expect(validator.isInteger(-1)).toBe(true);
        expect(validator.isInteger(+1)).toBe(true);
        expect(validator.isInteger('10')).toBe(true);
        expect(validator.isInteger('01')).toBe(false);
        done();
    });

    it('.isIDCard', function (done) {
        expect(validator.isIDCard(''.concat('341341', '1999', '01','01', '0000'))).toBe(true);
        expect(validator.isIDCard(''.concat('341341', '1999', '01','01', '000x'))).toBe(true);
        expect(validator.isIDCard(''.concat('341341', '1999', '01','01', '000X'))).toBe(true);
        expect(validator.isIDCard(''.concat('341341', '1199', '01','01', '0000'))).toBe(false);
        expect(validator.isIDCard(''.concat('341341', '1999', '21','01', '0000'))).toBe(false);
        expect(validator.isIDCard(''.concat('341341', '1999', '11','12', '00xx'))).toBe(false);
        done();
    });
});
