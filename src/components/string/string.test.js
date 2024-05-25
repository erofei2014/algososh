import React from 'react';
import { reverseString } from '../../utils/utils';

describe("Алгоритм разворота строки", () => {
  test("Корректный разворот строки с четным числом символов", () => {
    const str = 'abcd';
    const correctAnswer = ['d', 'c', 'b', 'a'];
    const res = reverseString(str);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректный разворот строки с нечетным числом символов", () => {
    const str = 'abcde';
    const correctAnswer = ['e', 'd', 'c', 'b', 'a'];
    const res = reverseString(str);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректный разворот строки с одним символом", () => {
    const str = 'a';
    const correctAnswer = ['a'];
    const res = reverseString(str);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректный разворот пустой строки", () => {
    const str = '';
    const res = reverseString(str);
    expect(res).toStrictEqual([[]]);
  });
});