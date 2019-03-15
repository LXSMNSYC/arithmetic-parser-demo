var ArithmeticParser = (function (parexgramJs) {
  'use strict';

  /**
   * @license
   * MIT License
   *
   * Copyright (c) 2019 Alexis Munsayac
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   *
   * @author Alexis Munsayac <alexis.munsayac@gmail.com>
   * @copyright Alexis Munsayac 2019
   */

  const Decimal = new parexgramJs.CharSet('.');

  const Number = new parexgramJs.Range('0', '9');

  const Digit = new parexgramJs.Sequence([
    Number,
    new parexgramJs.Quantifier(Decimal, 0, 1),
    new parexgramJs.Quantifier(Number, 0),
  ]);


  class Value extends parexgramJs.Matcher {
    // eslint-disable-next-line class-methods-use-this
    parse(feed) {
      if (feed instanceof parexgramJs.Feed) {
        const r = Digit.parse(feed);

        if (typeof r === 'undefined') {
          return r;
        }

        return parseFloat(r.flat(2).reduce((arr, c) => arr + c));
      }
      return undefined;
    }
  }

  /**
   * @license
   * MIT License
   *
   * Copyright (c) 2019 Alexis Munsayac
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   *
   * @author Alexis Munsayac <alexis.munsayac@gmail.com>
   * @copyright Alexis Munsayac 2019
   */


  const OPEN = new parexgramJs.CharSet('(');
  const CLOSE = new parexgramJs.CharSet(')');

  class Atom extends parexgramJs.Matcher {
    // eslint-disable-next-line class-methods-use-this
    parse(feed) {
      if (feed instanceof parexgramJs.Feed) {
        return new parexgramJs.Alternation([
          new Value(),
          new parexgramJs.Sequence([
            OPEN,
            new Addition(),
            CLOSE,
          ]),
        ]).parse(feed);
      }
      return undefined;
    }
  }

  /**
   * @license
   * MIT License
   *
   * Copyright (c) 2019 Alexis Munsayac
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   *
   * @author Alexis Munsayac <alexis.munsayac@gmail.com>
   * @copyright Alexis Munsayac 2019
   */


  const Neg = new parexgramJs.CharSet('-');

  class Negation extends parexgramJs.Matcher {
    // eslint-disable-next-line class-methods-use-this
    parse(feed) {
      if (feed instanceof parexgramJs.Feed) {
        const r = new parexgramJs.Sequence([
          new parexgramJs.Quantifier(Neg, 0, 1),
          new Atom(),
        ]).parse(feed);

        if (r[0][0] === '-') {
          return -r[1];
        }
        return r[1];
      }
      return undefined;
    }
  }

  /**
   * @license
   * MIT License
   *
   * Copyright (c) 2019 Alexis Munsayac
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   *
   * @author Alexis Munsayac <alexis.munsayac@gmail.com>
   * @copyright Alexis Munsayac 2019
   */

  const Pow = new parexgramJs.CharSet('^');

  class Exponentiation extends parexgramJs.Matcher {
    // eslint-disable-next-line class-methods-use-this
    parse(feed) {
      // eslint-disable-next-line class-methods-use-this
      if (feed instanceof parexgramJs.Feed) {
        const r = new parexgramJs.Sequence([
          new Negation(),
          new parexgramJs.Quantifier(
            new parexgramJs.Sequence([
              Pow,
              new Exponentiation(),
            ]),
            0,
          ),
        ]).parse(feed);

        const quantified = r[1];
        const sequence = quantified[0];
        if (sequence instanceof Array) {
          return r[0] ** sequence[1];
        }
        return r[0];
      }
      return undefined;
    }
  }

  /**
   * @license
   * MIT License
   *
   * Copyright (c) 2019 Alexis Munsayac
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   *
   * @author Alexis Munsayac <alexis.munsayac@gmail.com>
   * @copyright Alexis Munsayac 2019
   */


  const Mul = new parexgramJs.CharSet('*');
  const Div = new parexgramJs.CharSet('/');

  class Multiplication extends parexgramJs.Matcher {
    // eslint-disable-next-line class-methods-use-this
    parse(feed) {
      // eslint-disable-next-line class-methods-use-this
      if (feed instanceof parexgramJs.Feed) {
        const r = new parexgramJs.Sequence([
          // eslint-disable-next-line class-methods-use-this
          new Exponentiation(),
          new parexgramJs.Quantifier(
            new parexgramJs.Sequence([
              new parexgramJs.Alternation([Mul, Div]),
              new Multiplication(),
            ]),
            0,
          ),
        ]).parse(feed);
        const quantified = r[1];
        const sequence = quantified[0];
        if (sequence instanceof Array) {
          if (sequence[0] === '*') {
            return r[0] * sequence[1];
          }
          if (sequence[0] === '/') {
            return r[0] / sequence[1];
          }
        }
        return r[0];
      }
      return undefined;
    }
  }

  /**
   * @license
   * MIT License
   *
   * Copyright (c) 2019 Alexis Munsayac
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   *
   * @author Alexis Munsayac <alexis.munsayac@gmail.com>
   * @copyright Alexis Munsayac 2019
   */

  const Add = new parexgramJs.CharSet('+');
  const Sub = new parexgramJs.CharSet('-');

  class Addition extends parexgramJs.Matcher {
    // eslint-disable-next-line class-methods-use-this
    parse(feed) {
      // eslint-disable-next-line class-methods-use-this
      if (feed instanceof parexgramJs.Feed) {
        const r = new parexgramJs.Sequence([
          new Multiplication(),
          new parexgramJs.Quantifier(
            new parexgramJs.Sequence([
              new parexgramJs.Alternation([Add, Sub]),
              new Addition(),
            ]),
            0,
          ),
        ]).parse(feed);
        const quantified = r[1];
        const sequence = quantified[0];
        if (sequence instanceof Array) {
          if (sequence[0] === '-') {
            return r[0] - sequence[1];
          }
          if (sequence[0] === '+') {
            return r[0] + sequence[1];
          }
        }
        return r[0];
      }
      return undefined;
    }
  }

  /**
   * @license
   * MIT License
   *
   * Copyright (c) 2019 Alexis Munsayac
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   *
   * @author Alexis Munsayac <alexis.munsayac@gmail.com>
   * @copyright Alexis Munsayac 2019
   */

  class ArithmeticParser extends parexgramJs.Matcher {
    // eslint-disable-next-line class-methods-use-this
    parse(feed) {
      return new Addition().parse(feed);
    }
  }

  return ArithmeticParser;

}(parexgramJs));
