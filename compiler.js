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
////////////////////////////////////////////////////////////////////////SOLUTION/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function split the code into tokens
const tokenizer = (input) => {
  if (isValidInput(input) !== "true") return "Not a valid input";
  tokens = identifier(input);
  return tokens;
};

// check whether the input is valid or not
const isValidInput = (input) => {
  if (input[0] == "(" && input[input.length - 1] == ")") return "true";
  else "false";
};

// replaces the special charcters in input
const replacer = (string) => {
  let str = "";
  if (typeof string === "string") {
    str += string.replace(/[(]/g, "( ").replace(/[)]/g, " )");
  }
  return str;
};

// function identifies the elements in the array , divides it and assign a type for each elements.
const identifier = (input) => {
  let token = replacer(input).split(" ");
  let output = [];
  let numbers = /^[0-9]/;
  //   let letters = /[a-z]/i;
  for (let i = 0; i < token.length; i++) {
    if (token[i] === "(") output.push({ type: "paren", value: "(" });
    else if (token[i] === ")") output.push({ type: "paren", value: ")" });
    else if (numbers.test(token[i]))
      output.push({ type: "number", value: token[i] });
    else output.push({ type: "string", value: token[i] });
  }
  return output;
};

// Function converts the Tokens to AST
const parser = (tokens) => {
  let current = 0;
  walk = () => {
    let token = tokens[current];
    if (token.type === "number") {
      current++;
      return {
        type: "NumLiteral",
        value: token.value,
      };
    }
    if (token.type === "string") {
      current++;
      return {
        type: "StringLiteral",
        value: token.value,
      };
    }
    if (token.type === "paren" && token.value === "(") {
      token = tokens[++current];
      let node = {
        type: "CallExpression",
        name: token.value,
        params: [],
      };
      token = tokens[++current];
      while (
        token.type !== "paren" ||
        (token.type === "paren" && token.value !== ")")
      ) {
        node.params.push(walk());
        token = tokens[current];
      }
      current++;
      return node;
    }
    throw new TypeError(token.type);
  };
  let ast = {
    type: "Program",
    body: [],
  };
  while (current < tokens.length) {
    ast.body.push(walk());
  }
};

// let tokenz = [
//   { type: "paren", value: "(" },
//   { type: "string", value: "add" },
//   { type: "number", value: "2" },
//   { type: "paren", value: "(" },
//   { type: "string", value: "subtract" },
//   { type: "number", value: "4" },
//   { type: "number", value: "2" },
//   { type: "paren", value: ")" },
//   { type: "paren", value: ")" },
// ];

// console.log(parser(tokenz));
