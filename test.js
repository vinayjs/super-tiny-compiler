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

//   function createAst(){
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
