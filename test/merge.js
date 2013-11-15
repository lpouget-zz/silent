var merge = require("../lib/merge");
var assert = require("assert-plus");

describe('Merge', function(){
	var defaultOptions = {};

	beforeEach(function () {
		defaultOptions.test = 1;
		defaultOptions.test2 = 2;
	});

	describe('Nothing to merge', function(){
		it('should return identity when nothing to merge (empty)', function(){
			assert.deepEqual(defaultOptions, merge({}));
		})
		it('should return identity when nothing to merge (null)', function(){
			assert.deepEqual(defaultOptions, merge(null));
		})
	})

	describe('Something to merge', function(){
		var expected = {};

		beforeEach(function () {
			expected.test = 1;
			expected.test2 = 3;
		});
			
		it('should return updated test2', function(){
			assert.deepEqual(expected, merge({test2: 3}));
			assert.deepEqual(defaultOptions, merge({test2: 2}));
		})
		it('should return updated test2 ignoring test3', function(){
			assert.deepEqual(expected, merge({test2: 3, test3: 4}));
		})
		it('should ignore test3', function(){
			assert.deepEqual(defaultOptions, merge({test3: 4}));
		})
	})
})