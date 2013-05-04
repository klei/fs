var should = require('chai').Should(),
    join = require('path').join;

var fs = require('../');

describe('readJson', function () {
  it('reads the file and calls the given callback with the parsed json content', function (done) {
    fs.readJson(join(__dirname, 'testfiles', 'file.json'), function (err, json) {
      should.not.exist(err);
      should.exist(json.prop);
      json.prop.should.equal('val');
      done();
    });
  });
});
