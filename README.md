# NOOBLANG v2.0 Docs
## An esoteric language for n00bs who hate symbols

## Usage

* `nooblang.exe your-nooblang-file.noob` to run a file  
* `nooblang.exe` for interactive shell  

## Language Documentation

### Keywords

* `oof <any>`  
Prints the value given

* `noob`  
Returns the user input

* `<variable <any>> be <any>`  
Assigns the value to the variable

* `eef <boolean>`  
Executes the code after until `lol` if the boolean expression is `true`

* `elz`
Used inside an `eef` block. If the condition is `false`, then execute the `elz` block

* `for [<variable> in] [<number> to] <number>`  
Loops from (including) the start value to (excluding) the end value and store the value into the variable

* `wow <boolean>`  
Executes the code until `lol` while the boolean expression is `true`

* `lol`  
Ends an `eef`, `for` or `wow` block

### Operators

* `<number|string> add <number|string>`  
Returns the sum of the operands  
Does string concentration if any of them is a `string`

* `<number> sub <number>`  
Returns the difference of the operands

* `<number> mul <number>`  
Returns the product of the operands

* `<number> div <number>`  
Returns the quotient of the operands

* `<number> pow <number>`  
Returns the result of the left operand to the power of the right operand

* `inc <variable <number>>`  
Increases the variable by 1

* `dec <variable <number>>`  
Decreases the variable by 1

* `<any> eq <any>`  
Returns `true` if the two operands are equal or `false` if not

* `<any> nq <any>`  
Returns `false` if the two operands are equal or `true` if not

* `<number> las <number>`  
Returns `true` if the left operand is less than the right operand

* `<number> mor <number>`  
Returns `true` if the left operand is more than the right operand

* `<number> laq <number>`  
Returns `true` if the left operand is less than or equal to the right operand

* `<number> moq <number>`  
Returns `true` if the left operand is more than or equal to the right operand

* `not <boolean>`    
Returns `false` if the boolean expression is `true`, or vice versa

* `num <any>`  
Converts the value to a number

* `str <any>`  
Converts the value to a string

### Literals

* `string`:  
Quoted by a pair of `"` or `'`

* `number`:  
In number format (negative numbers are acceptable)

* `boolean`:  
`true` or `false`

### Comments

* `//`:  
For single-line comments

## Changelog

* Version 2.0:
	- Added `for..in..to`
	- Added `elz`
	- Right-to-left for `pow`
	- Better error reporting
	- Fixed wrong documentation title version

* Version 1.2:
	- Fixed bug where tabs does not work

* Version 1.1:
	- Fixed bug where carriage return does not work
