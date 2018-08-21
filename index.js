process.title = "NOOBLANG v2.0";

const fs = require('fs');
const rs = require('readline-sync');

const lexer = require('./lexer.js');
const parser = require('./parser.js');

const colors = require('./colors');

rs.setPrompt('');

let filename;
if((filename = process.argv.find(arg => arg.endsWith('.noob')))) runFile(filename);
else runPrompt();

function runFile(name) {
	fs.readFile(name, 'utf8', (err, data) => {
		if (err) return console.log(colors.red, err);
		let code = data.split('\n');
		for (let line of code) 
			parser.run(lexer.scan(line + '\n'));
		if (parser.isError()) return;
	});
}

function runPrompt() {
	console.log(colors.cyan, 'NOOBLANG by Caleb [Version 2.0]\n');
	while (true) {
		rs.setPrompt('>'.repeat(parser.layers * 2 + 1) + ' ');
		let result = parser.run(lexer.scan(rs.prompt() + '\n'), true);
		if (typeof result == 'string') result = '"' + result + '"';
		if (!parser.layers) console.log(colors.green, !parser.isError()? '=> ' + result + '\n': '');
	}
}

