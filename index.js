var through = require('through2');
var gutil = require('gulp-util');
var fs = require('fs');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-json-wrapper';

function configStream(config) {
  var stream = through();
  stream.write(config);
  return stream;
}

function gulpJsonWrapper(params) {

  if (!params) {
    throw new PluginError(PLUGIN_NAME, 'Missing params!');
  }

  if (!params.src) {
    throw new PluginError(PLUGIN_NAME, 'Missing json file!');
  }

  if (!params.namespace) {
    params.namespace = 'config';
  }

  var stream = through.obj(
    function(file, enc, cb) {
      var self = this;
      fs.readFile(params.src, "utf8", function (err, jsonFile) {
        if (err) throw new PluginError(PLUGIN_NAME, 'Json file not found!');

        var obj = JSON.parse(jsonFile);

        if (params.angular){
          var moduleName = params.module || 'json';
          jsonFile = 'angular.module(\''+moduleName+'\', []).constant(\''+params.namespace+'\', '+JSON.stringify(obj)+');';
        } else {
          jsonFile = 'var ' + params.namespace + '=' + JSON.stringify(obj) + ';';
        }

        var config = new Buffer(jsonFile);

        if (file.isNull()) {
          // do nothing if no contents
        }

        if (file.isBuffer()) {
          file.contents = Buffer.concat([file.contents, config]);
        }

        if (file.isStream()) {
          file.contents = file.contents.pipe(configStream(jsonFile));
        }

        self.push(file);

        return cb();
      });
    }
  );

  return stream;
};

module.exports = gulpJsonWrapper;
