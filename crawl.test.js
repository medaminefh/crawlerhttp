const normalizeUrl = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeUrl", () => {
  const input = "https://www.google.com/path";
  const output = normalizeUrl(input);
  const expected = "www.google.com/path";
  expect(output).toEqual(expected);
});

test("normalizeUrl with slashes /", () => {
  const input = "https://www.google.com/path/";
  const output = normalizeUrl(input);
  const expected = "www.google.com/path";
  expect(output).toEqual(expected);
});

test("normalizeUrl with Capitals", () => {
  const input = "https://www.GOOGLE.com/path";
  const output = normalizeUrl(input);
  const expected = "www.google.com/path";
  expect(output).toEqual(expected);
});

test("normalizeUrl with http", () => {
  const input = "http://www.GOOGLE.com/path";
  const output = normalizeUrl(input);
  const expected = "www.google.com/path";
  expect(output).toEqual(expected);
});
