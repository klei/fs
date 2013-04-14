var should = require('chai').Should();

var fs = require('../');

describe('forEachInDir', function () {
  it('should call the given callback for each file in the given dir, and provide the full path for it', function (done) {
    fs.forEachInDir(__dirname, function (err, file) {
      file.should.equal(__filename);
      done();
    });
  });

  it('can be used with deferred', function () {
    var forEachInDir = require('deferred').promisify(fs.forEachInDir);
    forEachInDir(__dirname).then(function (err, file) {
      should.not.exist(err);
      file.should.equal(__filename);
      done();
    });
  });
});
