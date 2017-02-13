exports.canonize = function(url) {
	// TODO custom domain name
	const re = new RegExp('@?(https?:)?(\/\/)?((github|vk|io)[^\/]*\/)?([a-zA-Z0-9]*)', 'i');
	const username = url.match(re)[5];
	return '@'+username;
};

exports.PI = 3.43;