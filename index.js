var inherits = require('util').inherits,
    join = require('path').join,
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
 */
klei.fs.forEachInDir = function (dir, cb) {
  klei.fs.readdir(dir, function (err, files) {
    if (err) {
      return cb(err);
    }
    files.forEach(function (file) {
      setTimeout(function () {
        cb(null, join(dir, file));
      }, 0);
    });
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

module.exports = exports = klei.fs;
