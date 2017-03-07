var env = function(){
    var self = this

    self.build = function(){
        var env = require('node-ini').parseSync('.env');
        var fs = require('fs');
        var baseUrl = env.AWS_CDN_URL;
        var cdnFolder = env.AWS_CDN_FOLDER;

        var jsCode = `
                        var env = function(){
                            var self = this;
                            self.$baseUrl= "${baseUrl}";
                            self.$cdnFolder= "${cdnFolder}";
                            
                            self.cdn = function($path) {
                                return self.$baseUrl + '/' + self.$cdnFolder + '/' + $path;
                            };
                        }
                        module.exports = (function(){
                            return new env();
                        }());
                    `;
        fs.writeFile("resources/assets/js/env.js", jsCode, function(err) {
            if(err) {
                console.log('Create env.js error：' + err);
            }

            console.log("The env.js was created and saved!");
        });

        var scssCode = `$baseUrl: '${baseUrl}';\r\n$cdnFolder: '${cdnFolder}';`;
        fs.writeFile("resources/assets/sass/base/_env.scss", scssCode, function(err) {
            if(err) {
                console.log('Create _env.scss error：' + err);
            }

            console.log("The _env.scss was created and saved!");
        });
    }
}

module.exports = (function(){
    return new env();
}());






