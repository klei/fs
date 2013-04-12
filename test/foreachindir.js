var should = require('chai').Should();

var fs = require('../');

describe('forEachInDir', function () {
  it('should call the given callback for each file in the given dir, and provide the full path for it', function (done) {
    fs.forEachInDir(__dirname, function (err, file) {
      file.should.equal(__filename);
      done();
    });
  });
});
