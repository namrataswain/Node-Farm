const http = require("http");
const url = require("url");
const fs = require("fs");

const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

const tempOverview = fs.readFileSync(
  "./starter/templates/overview.html",
  "utf-8"
);
const tempCard = fs.readFileSync(
  "./starter/templates/template-card.html",
  "utf-8"
);
const tempProduct = fs.readFileSync(
  "./starter/templates/product.html",
  "utf-8"
);

const data = fs.readFileSync("./starter/dev-data/data.json", "utf-8");

const dataObject = JSON.parse(data);

const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  }

  //product page
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  //api
  else if (pathname == "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  //page not found
  else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening on port 8000");
});
