import { crawlDOM } from "./crawl.js";

function main() {
  if (process.argv.length < 3) {
    console.log("No arguments");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("Too many arguments");
    process.exit(1);
  }

  for (const arg of process.argv) {
    console.log(arg);
  }

  const baseURL = process.argv[2];
  console.log("Starting process...");
  crawlDOM(baseURL);
}

main();
