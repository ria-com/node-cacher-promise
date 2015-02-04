module.exports = {
    // https://github.com/3rd-Eden/node-memcached
    memcached: {
        servers: 'localhost:11211', // You can either use: String, Array, Object
        options: {
            poolSize: 20
        }
    },
    cache: {
        defaultTime: 120, // Default cache time in seconds
        key: {
            prefix: 'cw_',
            crc32: false
        }
    }
};