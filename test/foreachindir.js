var should = require('chai').Should(),
    join = require('path').join;

var fs = require('../');
var forEachInDir = require('deferred').promisify(fs.forEachInDir);

describe('forEachInDir', function () {
  it('should call the given callback for each file in the given dir, and provide the full path for it', function (done) {
    var count = 0;
    var expected = [join(__dirname, 'testfiles', 'file.json'), join(__dirname, 'testfiles', 'file.md')];
    fs.forEachInDir(join(__dirname, 'testfiles'), function (err, file) {
      should.not.exist(err);
      expected.should.contain(file);
      if (++count === expected.length)
        done();
    });
  });

  it('can be used with deferred', function () {
    var count = 0;
    var expected = [join(__dirname, 'testfiles', 'file.json'), join(__dirname, 'testfiles', 'file.md')];
    forEachInDir(join(__dirname, 'testfiles')).then(function (err, file) {
      should.not.exist(err);
      expected.should.contain(file);
      if (++count === expected.length)
        done();
    });
  });
});
