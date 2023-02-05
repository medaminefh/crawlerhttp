function normalizeUrl(url) {
  const urlObj = new URL(url);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath && hostPath.endsWith("/")) {
    return hostPath.slice(0, -1);
  }

  return hostPath;
}

module.exports = normalizeUrl;
