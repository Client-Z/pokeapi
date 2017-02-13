const can = require('./canonize');
console.log(can);
const array = [
	'https://github.com/kriasoft/babel-starter-kit/blob/master/src/Greeting.js',
	'https://github.com/kriasoft/babel-starter-kit',
	'https://github.com/kriasoft',
	'https://github.com/kriasoft/babel-starter-kit/blob/master/src',
	'https://github.com/kriasoft/babel',
	'@kriasoft'
];

array.forEach( (url) => {
	const username = can.canonize(url);
	console.log(username[5]);
});