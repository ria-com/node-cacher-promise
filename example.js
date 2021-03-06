var Q = require("q"),
    cacher = require("./");

var testMethodPromise = function testMethodPromise (a) {
    return Q.delay(a+1, 1000);
};

cacher(testMethodPromise,[4],{ expires: 3 }).then(function (data) {
    console.log('first launch: ' + data); // wait 1 sec and get '5'
    cacher(testMethodPromise,[4],3).then(function (data) { // { expires: 3 } equivalent '3'
        console.log('second launch: ' + data); //  get '5' from cache immediately
    },onerror);
},onerror);

function onerror(err) {
    console.error(err.stack);
}
