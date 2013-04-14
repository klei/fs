var should = require('chai').Should(),
    join = require('path').join,
    ext = require('path').extname;

var fs = require('../');

var isMarkdown = function (file) { return ext(file) === '.md'; };

describe('filterDir', function () {
  it('calls the given callback for each file in the given dir, that meets the conditions, and provide the full path for it', function (done) {
    var count = 0;
    var expected = [join(__dirname, 'testfiles', 'file.md')];
    fs.filterDir(join(__dirname, 'testfiles'), isMarkdown, function (err, file) {
      should.not.exist(err);
      expected.should.contain(file);
      if (++count === expected.length)
        done();
    });
  });
});
