/* eslint-disable no-undef */

import assert from 'assert';
import { Feed } from 'parexgram-js';
import ArithmeticParser from '../src';

const { parseInt } = Number;

const rand = () => parseInt(Math.random() * 100);

describe('ArithmeticParser', () => {
  const parser = new ArithmeticParser();
  it('should negate', () => {
    const x = rand();
    assert(parser.parse(new Feed(`-${x}`)) === -x);
  });
  it('should add', () => {
    const x = rand();
    const y = rand();
    assert(parser.parse(new Feed(`${x}+${y}`)) === x + y);
  });
  it('should subtract', () => {
    const x = rand();
    const y = rand();
    assert(parser.parse(new Feed(`${x}-${y}`)) === x - y);
  });
  it('should multiply', () => {
    const x = rand();
    const y = rand();
    assert(parser.parse(new Feed(`${x}*${y}`)) === x * y);
  });
  it('should divide', () => {
    const x = rand();
    const y = rand();
    assert(parser.parse(new Feed(`${x}/${y}`)) === x / y);
  });
  it('should power', () => {
    const x = rand();
    const y = rand();
    assert(parser.parse(new Feed(`${x}^${y}`)) === x ** y);
  });
  it('should multiply before add', () => {
    const x = rand();
    const y = rand();
    const z = rand();
    assert(parser.parse(new Feed(`${x}*${y}+${z}`)) === x * y + z);
    assert(parser.parse(new Feed(`${x}+${y}*${z}`)) === x + y * z);
  });
  it('should divide before add', () => {
    const x = rand();
    const y = rand();
    const z = rand();
    assert(parser.parse(new Feed(`${x}/${y}+${z}`)) === x / y + z);
    assert(parser.parse(new Feed(`${x}+${y}/${z}`)) === x + y / z);
  });
  it('should multiply before subtract', () => {
    const x = rand();
    const y = rand();
    const z = rand();
    assert(parser.parse(new Feed(`${x}*${y}-${z}`)) === x * y - z);
    assert(parser.parse(new Feed(`${x}-${y}*${z}`)) === x - y * z);
  });
  it('should divide before subtract', () => {
    const x = rand();
    const y = rand();
    const z = rand();
    assert(parser.parse(new Feed(`${x}/${y}-${z}`)) === x / y - z);
    assert(parser.parse(new Feed(`${x}-${y}/${z}`)) === x - y / z);
  });
  it('should exponentiate before multiply', () => {
    const x = rand();
    const y = rand();
    const z = rand();
    assert(parser.parse(new Feed(`${x}^${y}*${z}`)) === x ** y * z);
    assert(parser.parse(new Feed(`${x}*${y}^${z}`)) === x * y ** z);
  });
  it('should exponentiate before divide', () => {
    const x = rand();
    const y = rand();
    const z = rand();
    assert(parser.parse(new Feed(`${x}^${y}/${z}`)) === x ** y / z);
    assert(parser.parse(new Feed(`${x}/${y}^${z}`)) === x / y ** z);
  });
  it('should negate before exponentiate', () => {
    const x = rand();
    const y = rand();
    assert(parser.parse(new Feed(`-${x}^${y}`)) === (-x) ** y);
  });
});
