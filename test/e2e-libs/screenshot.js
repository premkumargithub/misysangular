var fs = require('fs');
var mkdirp = require('mkdirp');

exports.takeScreenshot = function(spec, subdir) {
	var name, path;
	name = spec.description.split(' ').join('_');
	
	if(subdir !== null) {
		path = 'screenshots'+subdir
		
		if(path.charAt(path.length - 1) !== '/') {
			path += '/';
		}
		
	} else {
		path = 'screenshots/';
	}
	
	mkdirp.sync(path);
	
	browser.takeScreenshot().then(function(png) {
		var stream = fs.createWriteStream(path+name+'.png');
		stream.write(new Buffer(png, 'base64'));
		stream.end();
	});
};