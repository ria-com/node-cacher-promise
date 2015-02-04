var Q = require("q"),
    cacher = require("./");

var testMethodPromise = function testGenerator (a) {
    return Q.delay(a+1, 1000);
};

cacher(testMethodPromise,[4],{ cacheTime: 3 }).done(function (data) {
        console.log('first launch: ' + data); // wait 1 sec and get '5'
        cacher(testMethodPromise,[4],3).done(function (data) { // { cacheTime: 3 } equivalent '3'
            console.log('second launch: ' + data); //  get '5' from cache immediately
        },
        function (err) {
            throw err;
        });
    },
    function (err) {
        throw err;
    }
);
