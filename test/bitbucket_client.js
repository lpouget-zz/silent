var client = require("../lib/bitbucket_client");
var assert = require("assert-plus");

describe('Bitbucket Client', function(){
	describe('Changeset', function(){
		it('', function (done) {
			assert.ok(client.authorize());
		})
		it('', function (done) {
			assert.ok(client.changesets('cmd-scripts-for-vega',done));
		})
	});
});
