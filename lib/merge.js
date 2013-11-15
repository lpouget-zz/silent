var _ = require("underscore");

var defaultOptions = {
	test: 1,
	test2: 2
};

function merge (propertiesToMerge) {
	var origin = {};
	_.extend(origin, defaultOptions);

	if(!propertiesToMerge) {
		return origin;
	}

	_.each(origin, function (element, index, array) {
		_.contains(_.keys(propertiesToMerge), index) && (origin[index] = propertiesToMerge[index]);
	});

	return origin;
}

module.exports = merge;