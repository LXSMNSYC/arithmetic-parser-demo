# arithmetic-parser-demo

Arithmetic Parser Demo using parexgram.js

| Platform | Build Status |
| --- | --- |
| Linux | [![Build Status](https://travis-ci.org/LXSMNSYC/arithmetic-parser-demo.svg?branch=master)](https://travis-ci.org/LXSMNSYC/arithmetic-parser-demo) |
| Windows | [![Build status](https://ci.appveyor.com/api/projects/status/83gevhwpk1atlbsd?svg=true)](https://ci.appveyor.com/project/LXSMNSYC/arithmetic-parser-demo) |

[![codecov](https://codecov.io/gh/LXSMNSYC/arithmetic-parser-demo/branch/master/graph/badge.svg)](https://codecov.io/gh/LXSMNSYC/arithmetic-parser-demo)


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

## Build

```bash
npm install
npm run build
```