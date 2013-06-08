var should = require('chai').Should(),
    join = require('path').join,
    dirname = require('path').dirname;

var fs = require('../');

describe('mkdirp', function () {
  var dir = join(__dirname, 'dir1', 'dir2');

  beforeEach(function (done) {
    fs.exists(dir, function (exists) {
      if (exists) {
        fs.rmdir(dir, function (err) {
          if (err)
            throw err;
          fs.rmdir(dirname(dir), function (err) {
            if (err)
              throw err;
            done();
          });
        });
      } else {
        done();
      }
    });
  });

  it('creates directories recursively', function (done) {
    fs.mkdirp(dir, function (err) {
      should.not.exist(err);
      fs.exists(dir, function (exists) {
        exists.should.be.true;
        done();
      });
    });
  });
});
