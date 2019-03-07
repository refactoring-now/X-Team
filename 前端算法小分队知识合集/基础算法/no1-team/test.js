// 测试
import { gakki } from './波比小金刚'

const assert = (desc, condition) => {
  condition = typeof condition === "function" ? condition() : condition;
  console.info(`[Test] %c${desc}`, "color: orange");
  if (!condition) {
    throw new Error(`[Error] %c${desc} failed.`, "color: pink");
  }
  console.info(`[Success] %c${desc} success.`, "color: #198");
}

const mock_a = Array.from({ length: 4 }, (item, index) => index);
const mock_b = Array.from({ length: 6 }, (item, index) => index - 3);
const mock_c = Array.from({ length: 4 }, () => 0);

assert(`正整数情况测试`, () => {
  const res = gakki(mock_a, 2, 3);
  const lengthTest = res.length === 2;
  const resTest = JSON.stringify(res) === JSON.stringify([[1, 2], [0, 3]]);
  return lengthTest && resTest;
});

assert(`负数情况测试`, () => {
  const res = gakki(mock_b, 2, 0);
  const lengthTest = res.length === 2;
  const resTest = JSON.stringify(res) === JSON.stringify([[-1, 1], [-2, 2]]);
  return lengthTest && resTest;
});

assert(`未找到结果情况测试`, () => {
  const res = gakki(mock_b, 2, 500);
  const lengthTest = res.length === 0;
  const resTest = JSON.stringify(res) === JSON.stringify([]);
  return lengthTest && resTest;
});

assert(`重复值情况测试`, () => {
  const res = gakki(mock_c, 2, 0);
  const lengthTest = res.length === 6;
  const resTest =
    JSON.stringify(res) ===
    JSON.stringify([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]);
  return lengthTest && resTest;
});

