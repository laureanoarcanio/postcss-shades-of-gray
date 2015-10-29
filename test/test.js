var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts, done) {
    postcss([ plugin(opts) ]).process(input).then(function (result) {
        expect(result.css).to.eql(output);
        expect(result.warnings()).to.be.empty;
        done();
    }).catch(function (error) {
        done(error);
    });
};

describe('postcss-shades-of-gray', function () {
    it('Replace closest color of #555', function (done) {
        test('a{color:#555;}', 'a{color:#444444;}', {
            shades: ['#FFF', '#BBBBBB', '#444444', '#000000']
        }, done);
    });

    it('Replace closest color of #ACACAC', function (done) {
        test('a{color:#ACACAC;}', 'a{color:#BBBBBB;}', {
            shades: ['#FFF', '#BBBBBB', '#444444', '#000000']
        }, done);
    });

    it('Replace closest color of #555 in multiple lines', function (done) {
        test('a{color:#555;background-color:#555555;}', 'a{color:#444444;background-color:#444444;}', {
            shades: ['#FFF', '#BBBBBB', '#444444', '#000000']
        }, done);
    });

    it('Convert color to 6 digit hexa', function (done) {
        test('a{color:#F00;}', 'a{color:#FF0000;}', {
            normalizeHexaTo6: true
        }, done);
    });    

    it('Convert color to 6 digit hexa and find closest match', function (done) {
        test('a{color:#EEE;}', 'a{color:#FFFFFF;}', {
            shades: ['#FFF', '#BBBBBB', '#444444', '#000000']
        }, done);
    });
});
