const normalizeUrl = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeUrl", () => {
  const input = "";
  const output = normalizeUrl(input);
  const expected = "";
  expect(output).toEqual(expected);
});
