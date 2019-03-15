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
import {
  Matcher, Feed, Alternation, Sequence, CharSet,
} from 'parexgram-js';
import Value from './value';
import { Addition } from './dependency';


/**
 * @ignore
 */
const OPEN = new CharSet('(');
/**
 * @ignore
 */
const CLOSE = new CharSet(')');

/**
 * @desc
 * Represents a single term (value) or an expression enclosed in a parentheses
 */
export default class Atom extends Matcher {
  /**
   * @desc
   * Given a feed, attempt to match and consume
   * the prefix of a feed.
   * @param {Feed} feed
   * @returns {Number|undefined}
   */
  // eslint-disable-next-line class-methods-use-this
  parse(feed) {
    if (feed instanceof Feed) {
      const r = new Alternation([
        new Value(),
        new Sequence([
          OPEN,
          new Addition(),
          CLOSE,
        ]),
      ]).parse(feed);

      if (r instanceof Array) {
        return r[1];
      }
      return r;
    }
    return undefined;
  }
}
