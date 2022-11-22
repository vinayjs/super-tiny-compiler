// THIS IS JUST A ROUGH WORK SPACE TO TEST THE FUNCTIONS/ALTER/REFACTOR THE THE FUNCTIONS !JUST A WORKSPACE TILL THE COMPILER IS COMPLETE


// let tokens = [
//     { type: "paren", value: "(" },
//     { type: "string", value: "add" },
//     { type: "number", value: "2" },
//     { type: "paren", value: "(" },
//     { type: "string", value: "subtract" },
//     { type: "number", value: "4" },
//     { type: "number", value: "2" },
//     { type: "paren", value: ")" },
//     { type: "paren", value: ")" },
//   ];

//   const createAst= () => {
//     let current = 0;
//     let token = tokens[current]
//     console.log(token)
//     if (token.type == 'number') {
//       current += 1
//       return {type: 'numberLiteral', value: token.value}
//     } 
//     if ( token.value == '(' ) {
//       token = tokens[current++]
//       node = {type: 'CallExpression', selector: {type: 'Identifier', name: token.value}, arguments:[]}
//       token = tokens[current++]
//       while (token.value != ')') {
//         node.arguments.push(createAst())
//         token = tokens[current]
//       }
//       current++
//       return node 
//     }
//   }

//   let ast = () => {
//     for (let i = 0; i < tokens.length; i++) {
//         let token = tokens[i]
//         if (token.type == "number") {
//             i++
//             return {type: 'numberLiteral', value: token.value}
//         }
//         if (token.value == '(') {
//             token = tokens[i++]
//             node = {type: 'CallExpression', selector: {type: 'Identifier', name: token.value}, arguments:[]}
//             token = tokens[i++]
//             while (token.value !== ')') {
//                 node.arguments.push(ast(token.value))
//                 token = tokens[i]
//             }
//         }
//         return node
//     }
//   }

//   console.log(createAst(tokens))

// function traverser(ast, visitor) {

//   function traverseArray(array, parent) {
//     array.forEach(child => {
//       traverseNode(child, parent);
//     });
//   }


//   function traverseNode(node, parent) {


//     let methods = visitor[node.type];

//     if (methods && methods.enter) {
//       methods.enter(node, parent);
//     }

//     switch (node.type) {


//       case 'Program':
//         traverseArray(node.body, node);
//         break;

//       case 'CallExpression':
//         traverseArray(node.params, node);
//         break;

//       case 'NumberLiteral':
//       case 'StringLiteral':
//         break;

//       default:
//         throw new TypeError(node.type);
//     }


//     if (methods && methods.exit) {
//       methods.exit(node, parent);
//     }
//   }

//   traverseNode(ast, null);
// }

// const transformer=(ast) => {

//   let newAst = {
//     type: 'Program',
//     body: [],
//   };

//   ast._context = newAst.body;

//   traverser(ast, {

//     NumberLiteral: {
//       enter(node, parent) {
//         parent._context.push({
//           type: 'NumberLiteral',
//           value: node.value,
//         });
//       },
//     },

//     StringLiteral: {
//       enter(node, parent) {
//         parent._context.push({
//           type: 'StringLiteral',
//           value: node.value,
//         });
//       },
//     },

//     CallExpression: {
//       enter(node, parent) {
//         let expression = {
//           type: 'CallExpression',
//           callee: {
//             type: 'Identifier',
//             name: node.name,
//           },
//           arguments: [],
//         };
//         node._context = expression.arguments;

//         if (parent.type !== 'CallExpression') {
//           expression = {
//             type: 'ExpressionStatement',
//             expression: expression,
//           };
//         }
//         parent._context.push(expression);
//       },
//     }
//   });
//   return newAst;
// }

// let tokens = [
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

// console.log(transformer(parser(tokens)));


// const codeGenerator = (node) => {
//     switch (node.type) {

//       case 'Program':
//         return node.body.map(codeGenerator)
//           .join('\n');
  
//       case 'ExpressionStatement':
//         return (
//           codeGenerator(node.expression) + ';' 
//         );
//       case 'CallExpression':
//         return (
//           codeGenerator(node.callee) +
//           '(' +
//           node.arguments.map(codeGenerator)
//             .join(', ') +
//           ')'
//         );

//       case 'Identifier':
//         return node.name;
  
//       case 'NumberLiteral':
//         return node.value;
  
//       case 'StringLiteral':
//         return '"' + node.value + '"';

//       default:
//         throw new TypeError(node.type);
//     }
//   }
  