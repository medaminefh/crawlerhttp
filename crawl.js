const { JSDOM } = require("jsdom");

function getUrlFromHtml(html, baseURL) {
  const urls = [];
  const linkElements = new JSDOM(html).window.document.querySelectorAll("a");

  for (const linkElement of linkElements) {
    if (linkElement.getAttribute("href").startsWith("/")) {
      try {
        const urlObj = new URL(baseURL + linkElement.getAttribute("href"));
        urls.push(urlObj.href);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const urlObj = new URL(linkElement.getAttribute("href"));
        urls.push(urlObj.href);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  return urls;
}

function normalizeUrl(url) {
  const urlObj = new URL(url);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath && hostPath.endsWith("/")) {
    return hostPath.slice(0, -1);
  }

  return hostPath;
}

module.exports = { normalizeUrl, getUrlFromHtml };
