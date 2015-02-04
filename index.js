/**
 * @module cache-promise
 */
(function () {
    "use strict";
    var config = require('config'),
        Q = require("q"),
        utils = require("cacher-utils"),
        cacheStorage = utils.getCacheStorage();

    /**
     * Cahe wrapper
     *
     * @param {(function)} myFunction
     * @param {Array} args
     * @param {number|object} options (if number options = cacheTime)
     * @return {*}
     *
     * @example
     * var co = require('co'),
     *     wait = require('co-wait'),
     *     cacher = require('co-cacher');
     *
     * var testGenerator = function* testGenerator (a) {
     *     yield wait(1000);
     *     return a+1;
     * };
     *
     * co(function *(){
     *     var result = yield cacher(testGenerator, [4], {cacheTime: 30});
     *     console.log(result);
     * }).catch(function(e) {throw e; });
     *
     */
    module.exports = function (myFunction, args, options) {
        if (typeof options == 'object') {
        } else {
            var cacheTime = options;
            options = {};
            options.cacheTime = cacheTime;
        }
        var time = options.cacheTime || config.cache.expires;
        var salt = options.salt || '';
        var key = utils.keyMaker(myFunction.name, salt, args);

        var deferred = Q.defer();

        cacheStorage.get(key).then(function (value) {
                if (typeof value != 'undefined' ) {
                    deferred.resolve(value);
                } else {
                    myFunction.apply(myFunction,args).done(function (value) {
                            cacheStorage.set(key,value,time).done();
                            deferred.resolve(value);
                        },
                        deferred.reject
                    )
                }
            },
            deferred.reject
        );
        return deferred.promise;
    }
}());
