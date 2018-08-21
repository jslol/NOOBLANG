const colors = require('./colors.js');

const keywords = ['oof', 'noob', 'be', 'add', 'sub', 'mul', 'div', 'pow', 'inc', 'dec', 'str', 'num', 'eq', 'nq', 'las', 'mor', 'laq', 'moq', 'not', 'eef', 'elz', 'wow', 'for', 'in', 'to', 'lol'];

let hasError = false;
exports.scan = line => {
	hasError = false;
	let tokens = [];
	let tmp = '';
	let inQuote = '';
	for (let c of line) {
		if (tmp.match(/\/\/$/)) {
			let token = convert(tmp.slice(0, -2));
			if (token) tokens.push(token);
			break;
		}

		if ((["\t", "\r", "\n", " "].includes(c)) && inQuote == "") {
			let token = convert(tmp);
			if (token) tokens.push(token);
			tmp = '';
			continue;
		}
		tmp += c;
		if (c == '"' || c == "'") {
			if(inQuote == "") inQuote = c; 
			else if(inQuote == c) inQuote = "";
		}
	}
	if (inQuote != "") err('Unterminated String');
	if (hasError) return [];
	else return tokens;
};

function convert(str) {
	if (!str) return;
	if(str.match(/^\s*$/)) return;
	if (keywords.includes(str)) return new Token(str, str);
	if (str == 'true') return new Token('boolean', true);
	if (str == 'false') return new Token('boolean', false);
	if (str == 'undefined') return new Token('undefined', undefined);
	if (str.match(/^("|').*("|')$/))
		return new Token('string', str.substring(1, str.length - 1));
	if (str.match(/^-?[0-9]*\.?[0-9]+$/))
		return new Token('number', parseFloat(str));
	if (str.match(/^[a-z0-9]+$/i)) return new Token('iden', str);
	err('Unexpected token: ' + str);
}

class Token {
	constructor(name, value) {
		this.name = name;
		this.value = value;
	}
}

function err(txt) {
	if (!hasError) {
		console.log(colors.red, txt);
		hasError = true;
	}
}