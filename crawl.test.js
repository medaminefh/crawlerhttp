import { normalizeUrl, getUrlFromHtml } from "./crawl";
import { test, expect } from "@jest/globals";

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

test("getURLsfromHTML", () => {
  const inputHTMLBody = `
    <html>
    <head></head>
        <body>
          <a href="https://www.google.com/path">Google</a>
        </body>
    </html>`;

  const inputBaseURL = "https://www.google.com/path";
  const output = getUrlFromHtml(inputHTMLBody, inputBaseURL);
  const expected = ["https://www.google.com/path"];
  expect(output).toEqual(expected);
});

test("getURLsfromHTML with paths", () => {
  const inputHTMLBody = `
    <html>
    <head></head>
        <body>
          <a href="/path">Google</a>
        </body>
    </html>`;

  const inputBaseURL = "https://www.google.com";
  const output = getUrlFromHtml(inputHTMLBody, inputBaseURL);
  const expected = ["https://www.google.com/path"];
  expect(output).toEqual(expected);
});

test("getURLsfromHTML with multiple links", () => {
  const inputHTMLBody = `
    <html>
    <head></head>
        <body>
          <a href="https://www.google.com/path1">Google path 1</a>
          <a href="/path2">Google path 2</a>
        </body>
    </html>`;

  const inputBaseURL = "https://www.google.com";
  const output = getUrlFromHtml(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://www.google.com/path1",
    "https://www.google.com/path2",
  ];
  expect(output).toEqual(expected);
});

test("getURLsfromHTML with Invalid links", () => {
  const inputHTMLBody = `
    <html>
    <head></head>
        <body>
          <a href="invalid">Invalid link</a>
        </body>
    </html>`;

  const inputBaseURL = "https://www.google.com";
  const output = getUrlFromHtml(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(output).toEqual(expected);
});
