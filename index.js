var inherits = require('util').inherits,
    join = require('path').join,
    dirname = require('path').dirname,
    fs = require('fs');

var klei = {fs: {}};

/**
 * Inherit from native fs module
 */
Object.keys(fs).forEach(function (key) {
  if (fs.hasOwnProperty(key)) {
    klei.fs[key] = fs[key];
  }
});

/**
 * readdir and forEach in one function
 *
 * @param {String} dir
 * @param {Function} cb
 * @param {Function} emptyCb
 */
klei.fs.forEachInDir = function (dir, cb, emptyCb) {
  klei.fs.readdir(dir, function (err, files) {
    if (err) {
      return cb(err);
    }
    if (files.length) {
      files.forEach(function (file, index) {
        cb(null, join(dir, file), index, files);
      });
    } else if (emptyCb) {
      emptyCb();
    }
  });
};

/**
 * readdir, forEach and filter in one function
 *
 * @param {String} dir
 * @param {Function} filter
 * @param {Function} cb
 */
klei.fs.filterDir = function (dir, filter, cb) {
  klei.fs.forEachInDir(dir, function (err, file) {
    if (err) {
      return cb(err);
    }
    setTimeout(function () {
      if (filter(file))
        cb(null, file);
    }, 0);
  });
};

/**
 * Combined readFile and JSON.parse
 *
 * @param {String} file
 * @param {Function} cb
 */
klei.fs.readJson = function (file, cb) {
  fs.readFile(file, 'utf-8', function (err, source) {
    if (err) return cb(err);
    return cb(null, JSON.parse(source));
  });
};

/**
 * Makedir recursively, aka. mkdirp
 *
 * @param {String} path
 * @param {String} mode
 * @param {Function} cb
 */
klei.fs.mkdirp = function (path, mode, cb) {
  if (typeof mode === 'function' && !cb) {
    cb = mode;
    mode = '0777';
  }

  fs.exists(path, function (exists) {
    if (exists) {
      cb(null);
      return;
    }
    var parent = dirname(path);
    klei.fs.mkdirp(parent, mode, mkdirCallback);
  });

  var mkdirCallback = function (err) {
    if (err) {
      cb(err);
      return;
    }
    fs.mkdir(path, mode, function (err) {
      if (err && err.code == 'EEXIST') {
        cb(null);
        return;
      }
      cb(err);
    });
  };
};

module.exports = exports = klei.fs;
