# arithmetic-parser-demo

Arithmetic Parser Demo using parexgram.js

## Grammar

```g4

arithmetic
  : addition
  ;

addition
  : multiplication ( ('+' | '-') addition )*
  ;

multiplication
  : exponentiation ( ('*' | '/') multiplication)*
  ;

exponentiation
  : negation ('^' exponentiation)*
  ;

negation
  : '-'? atom
  ;

atom
  : value
  | '(' addition ')'
  ;

value
  : [0-9]* '.' [0-9]*
  ;
```
