# super-tiny-compiler

A compiler is a special program that translates a programming language's source code into machine code, bytecode or another programming language.

## Three Stages / Refactoring the whole process :
   > Parsing => raw code into abstract representation of the code(AST)
        > Lexical Analysis => raw code to  tokens
        > Syntactic Analysis => tokens to AST
   > Transformation => abstract representation to whatever the compiler's process is mean to do.
   > Code Generation => transformed represntation of the code  into new code.