var should = require('chai').Should(),
    join = require('path').join;

var fs = require('../');

describe('forEachInDir', function () {
  it('should call the given callback for each file in the given dir, and provide the full path for it', function (done) {
    var count = 0;
    var expected = [join(__dirname, 'testfiles', 'file.json'), join(__dirname, 'testfiles', 'file.md')];
    fs.forEachInDir(join(__dirname, 'testfiles'), function (err, file) {
      should.not.exist(err);
      should.exist(file);
      expected.should.contain(file);
      if (++count === expected.length)
        done();
    });
  });
});
