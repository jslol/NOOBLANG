const rs = require('readline-sync');

const colors = require('./colors.js');

let vars = {};

let hasError = false;

let codeMem = [];

exports.layers = 0;
exports.isError = () => hasError;

function run(tokens, isWholeLine) {
	if (isWholeLine) hasError = false;
	if (!tokens.length || hasError) return;

	let index = 0;

	if (exports.layers) {
		codeMem.push(tokens);
		if (
			tokens.findIndex(name('wow')) != -1 ||
			tokens.findIndex(name('for')) != -1 ||
			tokens.findIndex(name('eef')) != -1 
			)
			exports.layers++;
		else if (tokens.findIndex(name('lol')) != -1) exports.layers--;

		if (!exports.layers) {
			let lines = codeMem.slice();
			codeMem = [];
			lines.pop();
			let first = lines.shift();
			let blockType = first.shift().name;

			if (blockType == 'wow') {
				while (run(first, true)) {
					for (let line of lines) 
						run(line.slice(), true);
						if (hasError) return;
				}
			} else if (blockType == 'for') {
				let inIndex, toIndex, counter;
				if ((inIndex = first.findIndex(name('in'))) != -1) {
					if (first[0].name != 'iden') return err("Expected identifier");
					counter = first[0].value;
				}
				let from, until;
				if((toIndex = first.findIndex(name('to'))) != -1) {
					if(toIndex <= inIndex + 1 || toIndex == first.length - 1) return err("Unexpected token 'to'");
					from = run(first.slice(inIndex + 1, toIndex), true);
					until = run(first.slice(toIndex + 1), true);
				}
				else {
					from = 0;
					until = run(first.slice(inIndex + 1), true);
				}
				if(hasError) return;
				if (!isNum(from) || !isNum(until)) return err("Expected number");
				if (counter) {
					for(vars[counter] = from; vars[counter] < until; vars[counter]++) {
						for(let line of lines) {
							run(line.slice(), true);
							if (hasError) return;
						}
					}
				}
				else {
					for(let i = from; i < until; i++) {
						for(let line of lines) {
							run(line.slice(), true);
							if(hasError) return;
						}
					}
				}

			} else if (blockType == 'eef') {
				let elz = lines.findIndex(line => line.findIndex(name('elz')) != -1);
				if (elz == -1) elz = lines.length;
				if (run(first, true)) {
					for (let line of lines.slice(0, elz)) {
						run(line.slice(), true);
						if (hasError) return;
					}
				}
				else {
					for (let line of lines.slice(elz + 1)) {
						run(line.slice(), true);
						if (hasError) return;
					}
				}
			}
		}
		return;
	}

	index = 0;

	if ((index = tokens.findIndex(name('wow'))) != -1) {
		if(index == 0) {
			exports.layers++;
			codeMem.push(tokens);
			return;
		} else return err("Unexcepted token 'wow'");
	}


	if ((index = tokens.findIndex(name('for'))) != -1) {
		if(index == 0) {
			exports.layers++;
			codeMem.push(tokens);
			return;
		} else return err("Unexcepted token 'for'");
	}

	if (tokens.findIndex(name('in')) != -1) return err("Unexcepted token 'in'");

	if (tokens.findIndex(name('to')) != -1) return err("Unexcepted token 'to'");

	if ((index = tokens.findIndex(name('eef'))) != -1) {
		if(index == 0) {
			exports.layers++;
			codeMem.push(tokens);
			return;
		} else return err("Unexcepted token 'eef'");
	}

	if (tokens.findIndex(name('elz')) != -1) return err("Unexcepted token 'elz'");

	if (tokens.findIndex(name('lol')) != -1) return err("Unexcepted token 'lol'");

	index = 0;

	if ((index = tokens.findIndex(name('oof'))) != -1) {
		if (index == 0 && tokens.length > 1) {
			let res = run(tokens.slice(1));
			if (hasError) return;
			return console.log(res);
		} else return err("Unexcepted token 'oof'");
	}

	if ((index = tokens.findIndex(name('be'))) != -1) {
		if (index == 1 && tokens[0].name == 'iden') {
			let res = run(tokens.slice(2));
			if (hasError) return;
			return (vars[tokens[0].value] = res);
		} else return err("Unexcepted token 'be'");
	}


	if ((index = tokens.findLastIndex(name('eq'))) != -1) {
		if (index > 0 && index < tokens.length - 1) {
			let res = run(tokens.slice(0, index)) == run(tokens.slice(index + 1));
			if (hasError) return;
			return res;
		} else return err("Unexpected token 'eq'");
	}

	if ((index = tokens.findLastIndex(name('nq'))) != -1) {
		if (index > 0 && index < tokens.length - 1) {
			let res = run(tokens.slice(0, index)) != run(tokens.slice(index + 1));
			if (hasError) return;
			return res;
		} else return err("Unexpected token 'nq'");
	}

	if ((index = tokens.findLastIndex(name('las'))) != -1) {
		if (index > 0 && index < tokens.length - 1) {
			let left = run(tokens.slice(0, index));
			let right = run(tokens.slice(index + 1));
			if(hasError) return;
			if (isNum(left) && isNum(right)) return left < right;
			else return err("'las' only works for numbers");
		} else return err("Unexpected token 'las'");
	}

	if ((index = tokens.findLastIndex(name('mor'))) != -1) {
		if (index > 0 && index < tokens.length - 1) {
			let left = run(tokens.slice(0, index));
			let right = run(tokens.slice(index + 1));
			if(hasError) return;
			if (isNum(left) && isNum(right)) return left > right;
			else return err("'mor' only works for numbers");
		} else return err("Unexpected token 'mor'");
	}

	if ((index = tokens.findLastIndex(name('laq'))) != -1) {
		if (index > 0 && index < tokens.length - 1) {
			let left = run(tokens.slice(0, index));
			let right = run(tokens.slice(index + 1));
			if(hasError) return;
			if (isNum(left) && isNum(right)) return left <= right;
			else return err("'laq' only works for numbers");
		} else return err("Unexpected token 'laq'");
	}

	if ((index = tokens.findLastIndex(name('moq'))) != -1) {
		if (index > 0 && index < tokens.length - 1) {
			let left = run(tokens.slice(0, index));
			let right = run(tokens.slice(index + 1));
			if(hasError) return;
			if (isNum(left) && isNum(right)) return left >= right;
			else return err("'moq' only works for numbers");
		} else return err("Unexpected token 'moq'");
	}



	if ((index = tokens.findLastIndex(name('add'))) != -1) {
		if (index > 0 && index < tokens.length - 1) {
			let left = run(tokens.slice(0, index));
			let right = run(tokens.slice(index + 1));
			if(hasError) return;
			if ((isNum(left) || isStr(left)) && (isNum(right) || isStr(right)))
				return left + right;
			else return err("'add' only works on strings and numbers");
		} else return err("Unexpected token 'add'");
	}

	if ((index = tokens.findLastIndex(name('sub'))) != -1) {
		if (index > 0 && index < tokens.length - 1) {
			let left = run(tokens.slice(0, index));
			let right = run(tokens.slice(index + 1));
			if(hasError) return;
			if (isNum(left) && isNum(right)) return left - right;
			else return err("'sub' only works on numbers");
		} else return err("Unexpected token 'sub'");
	}

	if ((index = tokens.findLastIndex(name('mul'))) != -1) {
		if (index > 0 && index < tokens.length - 1) {
			let left = run(tokens.slice(0, index));
			let right = run(tokens.slice(index + 1));
			if(hasError) return;
			if (isNum(left) && isNum(right)) return left * right;
			else return err("'mul' only works on numbers");
		} else return err("Unexpected token 'mul'");
	}

	if ((index = tokens.findLastIndex(name('div'))) != -1) {
		if (index > 0 && index < tokens.length - 1) {
			let nom = run(tokens.slice(0, index));
			let den = run(tokens.slice(index + 1));
			if(hasError) return;
			if (isNum(nom) && isNum(den)) {
				if (den) return nom / den;
				else return err('Division by zero');
			} else return err("'div only works on numbers'");
		} else return err("Unexpected token 'div'");
	}

	if ((index = tokens.findIndex(name('pow'))) != -1) {
		if (index > 0 && index < tokens.length - 1) {
			let left = run(tokens.slice(0, index));
			let right = run(tokens.slice(index + 1));
			if(hasError) return;
			if (isNum(left) && isNum(right)) {
				let result = left ** right;
				if(isNaN(result)) return err("Cannot apply fractional powers on negative numbers");
				else return result;
			}
			else return err("'pow' only works on numbers");
		} else return err("Unexpected token 'pow'");
	}

	if ((index = tokens.findLastIndex(name('not'))) != -1) {
		if (index == 0 && tokens.length > 1) {
			let result = run(tokens.slice(1));
			if(hasError) return;
			if (isBool(result)) return !result;
			else return err("'not' only works for boolean values");
		} else return err("Unexpected token 'not'");
	}

	if ((index = tokens.findIndex(name('inc'))) != -1) {
		if (index == 0 && tokens.length == 2) {
			if (isNum(vars[tokens[1].value])) return vars[tokens[1].value]++;
			else return err("'inc' only works for number variables");
		} else return err("Unexpected token 'inc'");
	}

	if ((index = tokens.findIndex(name('dec'))) != -1) {
		if (index == 0 && tokens.length == 2) {
			if (isNum(vars[tokens[1].value])) return vars[tokens[1].value]--;
			else return err("'dec' only works for number variables");
		} else return err("Unexpected token 'dec'");
	}

	if ((index = tokens.findIndex(name('str'))) != -1) {
		if (index == 0 && tokens.length == 2) {
			let param = run(tokens.slice(1));
			if (hasError) return;
			if (param == undefined) return "undefined";
			else return param.toString();
		} else return err("Unexpected token 'str'");
	}

	if ((index = tokens.findIndex(name('num'))) != -1) {
		if (index == 0 && tokens.length == 2) {
			let res = parseFloat(run(tokens.slice(1)));
			if(hasError) return;
			if (isNaN(res)) {
				err('Cannot parse the value to a number');
				return 0;
			} else return res;
		} else return err("Unexpected token 'num'");
	}

	if (tokens.length == 1) {
		if (tokens[0].name == 'noob') {
			rs.setPrompt('');
			return rs.prompt();
		}

		if (
			tokens[0].name == 'string' ||
			tokens[0].name == 'number' ||
			tokens[0].name == 'boolean' ||
			tokens[0].name == 'undefined'
			)
			return tokens[0].value;

		if (tokens[0].name == 'iden') return vars[tokens[0].value];
	} 
	return err('Invalid syntax');
}


exports.run = run;

function name(str) {
	return e => e.name == str;
}

function isNum(v) {
	return typeof v == 'number';
}

function isStr(v) {
	return typeof v == 'string';
}

function isBool(v) {
	return typeof v == 'boolean';
}
function err(txt) {
	if (!hasError) {
		console.log(colors.red, txt);
		hasError = true;
	}
}

Array.prototype.findLastIndex = function(func) {
	let index = this.slice().reverse().findIndex(func);
	let count = this.length - 1;
	let finalIndex = index >= 0 ? count - index : index;
	return finalIndex;
};
