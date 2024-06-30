var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://kevinkipkemei:kevin123@gallery.9sf8rrq.mongodb.net/darkroom?retryWrites=true&w=majority&appName=gallery',
    development: 'mongodb+srv://kevinkipkemei:kevin123@gallery.9sf8rrq.mongodb.net/darkroom-dev?retryWrites=true&w=majority&appName=gallery',
    test: 'mongodb+srv://kevinkipkemei:kevin123@gallery.9sf8rrq.mongodb.net/darkroom-test?retryWrites=true&w=majority&appName=gallery',
}
module.exports = config;

