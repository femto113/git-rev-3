var exec = require('child_process').exec

function _command (cmd, dirname, cb) {
  exec(cmd, { cwd: dirname }, function (err, stdout, stderr) {
    cb(err, !err && stdout.split('\n').join(''));
  })
}

var commands = { 
    short : function (dirname, cb) { 
      _command('git rev-parse --short HEAD', dirname, cb);
    }
  , long : function (dirname, cb) { 
      _command('git rev-parse HEAD', dirname, cb);
    }
  , branch : function (dirname, cb) { 
      _command('git rev-parse --abbrev-ref HEAD', dirname, cb);
    }
  , tag : function (dirname, cb) { 
      _command('git describe --always --tag --abbrev=0', dirname, cb);
    }
  , log : function (dirname, n, cb) { 
      if (typeof(cb) === 'undefined') { cb = n; n = undefined; }
      var cmd = 'git log --no-color --pretty=format:\'[ \01%H\01, \01%s\01, \01%cr\01, \01%an\01 ]\' --abbrev-commit';
      if (n) cmd += ' -n ' + n;
      exec(cmd, { cwd: dirname}, function (error, stdout, stderr) {
        if (error) return cb(error);
        var log = stdout.split('\n').map(function (line) {
          return JSON.parse(line.replace(/"/g, '\\"').replace(/\u0001/g, '"'));
        });
        cb(null, log);
      });
    }
};

exports = module.exports = function (dirname) {
  if (!dirname) dirname = __dirname; 
  return Object.keys(commands).reduce(function (o, method) {
    o[method] = commands[method].bind(module.exports, dirname);
    return o;
  }, {});
};

Object.keys(commands).forEach(function (method) {
  exports[method] = commands[method].bind(module.exports, __dirname);
});
