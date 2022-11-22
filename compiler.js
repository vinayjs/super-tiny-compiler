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
        // console.log(node.params , "hi")
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
  // console.log(ast.body[0].params[1].params)
  return ast;
};

// function accepts an AST and traverse through the nodes depth-first.
// visitor - object that has methods that will accept different node types.
const traverser = (ast, visitor) => {
  let traverseArray = (array, parent) => {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  };
  const traverseNode = (node, parent) => {
    let methods = visitor[node.type];

    if (methods && methods.enter) {
      methods.enter(node, parent);
    }
    switch (node.type) {
      case "Program":
        traverseArray(node.body, node);
        break;

      case "CallExpression":
        traverseArray(node.params, node);
        break;

      case "NumberLiteral":
      case "StringLiteral":
        break;

      default:
        throw new TypeError(node.type);
    }
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  };
  traverseNode(ast, null);
};

//function will take the AST that we have built and pass it to our traverser function and will create a new AST.
const transformer = (ast) => {
  let newAst = {
    type: "Program",
    body: [],
  };

  ast.context = newAst.body;

  traverser(ast, {
    NumberLiteral: {
      enter(node, parent) {
        parent.context.push({
          type: "NumberLiteral",
          value: node.value,
        });
      },
    },

    StringLiteral: {
      enter(node, parent) {
        parent.context.push({
          type: "StringLiteral",
          value: node.value,
        });
      },
    },

    CallExpression: {
      enter(node, parent) {
        let expression = {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: node.name,
          },
          arguments: [],
        };
        node.context = expression.arguments;

        if (parent.type !== "CallExpression") {
          expression = {
            type: "ExpressionStatement",
            expression: expression,
          };
        }
        parent.context.push(expression);
      },
    },
  });
  return newAst;
};

// code generator will print, all of the different nodes  & will recursively call itself to print nested
// nodes until everything is printed into one long string of code.

const codeGenerator = (node) => {
  switch (node.type) {

    case 'Program':
      return node.body.map(codeGenerator)
        .join('\n');

    case 'ExpressionStatement':
      return (
        codeGenerator(node.expression) + ';' 
      );
    case 'CallExpression':
      return (
        codeGenerator(node.callee) +
        '(' +
        node.arguments.map(codeGenerator)
          .join(', ') +
        ')'
      );

    case 'Identifier':
      return node.name;

    case 'NumberLiteral':
      return node.value;

    case 'StringLiteral':
      return '"' + node.value + '"';

    default:
      throw new TypeError(node.type);
  }
}

// the compiler func which calls all the necessary child functions to execute the whole compilation process.
const compiler = (input) => {
  let tokens = tokenizer(input);
  let ast    = parser(tokens);
  let newAst = transformer(ast);
  let output = codeGenerator(newAst);
  return output;
}
