import { JSDOM } from "jsdom";

export async function crawlDOM(url) {
  console.log(`Crawling ${url}`);
  try {
    const res = await fetch(url);
    if (res.status > 399) {
      console.log(`Error in fetching ${url}`);
      return;
    }
    if (!res.headers.get("content-type").includes("text/html")) {
      console.log(`Error in fetching ${url}`);
      return;
    }
    const parsedRes = await res.text();
    const links = getUrlFromHtml(parsedRes, "https://wagslane.dev");
    console.log({ links });
  } catch (error) {
    console.error(error.message);
  }
}

export function getUrlFromHtml(html, baseURL) {
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

export function normalizeUrl(url) {
  const urlObj = new URL(url);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath && hostPath.endsWith("/")) {
    return hostPath.slice(0, -1);
  }

  return hostPath;
}
