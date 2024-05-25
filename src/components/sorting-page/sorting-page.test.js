import React from 'react';
import { sortWithBubbles, sortWithSelection } from '../../utils/utils';

describe("Алгоритмы сортировки массива", () => {
  test("Корректная сортировка массива пузырьком", () => {
    const arr = [3, 1, 2, 5, 4];
    const correctAnswer = [[1, 2, 3, 4, 5], -1, -1, [4, 3, 2, 1, 0]];
    const res = sortWithBubbles(arr, true);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректная сортировка массива выбором", () => {
    const arr = [3, 1, 2, 5, 4];
    const correctAnswer = [[1, 2, 3, 4, 5], -1, -1, [0, 1, 2, 3, 4]];
    const res = sortWithSelection(arr,true);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректная сортировка пузырьком массива с одним элементом", () => {
    const arr = [1];
    const correctAnswer = [[1,], -1, -1, [0,]];
    const res = sortWithBubbles(arr);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректная сортировка выбором массива с одним элементом", () => {
    const arr = [1];
    const correctAnswer = [[1,], -1, -1, [0,]];
    const res = sortWithSelection(arr);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректная сортировка пузырьком пустого массива", () => {
    const arr = [];
    const res = sortWithBubbles(arr);
    expect(res).toStrictEqual([[[], -1, -1, []]]);
  });

  test("Корректная сортировка выбором пустого массива", () => {
    const arr = [];
    const res = sortWithSelection(arr);
    expect(res).toStrictEqual([[[], -1, -1, [-1,]]]);
  });
});