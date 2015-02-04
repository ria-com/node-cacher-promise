var cacher = require('../'),
    Q = require('q');
    // Емуляція важкого запиту у ms (1 sec)
    fakeDalay = 1000;


var testMethodPromise = function testGenerator (a) {
    return Q.delay(a+1, fakeDalay);
};

describe('myDB Tests', function () {
    it("takes a long time", function(done) {
        var a = 10;

        var start = new Date();
        cacher(testMethodPromise, [a],3).then(function(result) {
            expect((new Date()) - start).toBeGreaterThan(fakeDalay);
            expect(result).toEqual(a+1);

            start = new Date();
            cacher(testMethodPromise, [a],3).then(function(result) {
                expect((new Date()) - start).toBeLessThan(fakeDalay);
                expect(result).toEqual(a+1);
                done();
            });
        });
    });
});

