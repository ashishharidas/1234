const http = require("http");
const fs = require("fs");

const homeContent = fs.readFileSync("home.html", "utf-8");
const projectContent = fs.readFileSync("project.html", "utf-8");

http
  .createServer((request, response) => {
    const url = request.url;
    response.writeHead(200, { "Content-Type": "text/html" });

    switch (url) {
      case "/project":
        response.end(projectContent);
        break;
      default:
        response.end(homeContent);
        break;
    }
  })
  .listen(3001, () => {
    console.log("Server running at http://localhost:3000");
  });
