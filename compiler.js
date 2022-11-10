// Three Stages / Refactoring the whole process :
//    > Parsing => raw code into abstract representation of the code(AST)
//         > Lexical Analysis => raw code to  tokens
//         > Syntactic Analysis => tokens to AST
//    > Transformation => abstract representation to whatever the compiler's process is mean to do.
//    > Code Generation => transformed represntation of the code  into new code.

//    LISP                      C
// (add 2 2)                 add(2, 2)
// (subtract 4 2)            subtract(4, 2)
// add 2 (subtract 4 2))    add(2, subtract(4, 2))

const tokenizer = (input) => {
  if (isValidInput(input) !== "true") return "Not a valid input";
  tokens = identifier(input);
  return tokens;
};

const isValidInput = (input) => {
    if (input[0] == "(" && input[input.length - 1] == ")") return "true";
    else "false";
  };
  
  // console.log(isValidInput(input))

const replacer = (string) => {
  let str = "";
  if (typeof string === "string") {
    str += string
    .replace(/[(]/g, '( ')
    .replace(/[)]/g, ' )')
  }
  return str;
};

const identifier = (input) => {
  let token = replacer(input).split(" ");
  let output = [];
  let numbers = /^[0-9]/;
//   let letters = /[a-z]/i;
  for (let i = 0; i < token.length; i++) {
    if(token[i] === '(') output.push({type: "paren",value: "("})
    else if(token[i] === ')') output.push({type: "paren",value: ")"})
    else if(numbers.test(token[i])) output.push({type: "number",value: token[i]})
    else output.push({type: "letters",value: token[i]})
 };
 return output;
}


let input = "(add 2 (subtract 4 2))";
console.log(tokenizer(input));