

/*const fs = require("fs");
fs.writeFile(
    "sample.txt",
    "Hello World. Welcome to Node.js File System module.",
    (err) => {
      if (err) throw err;
      console.log("File created!");
    }
  );
  fs.readFile("sample.txt", (err, data) => {
    if (err) throw err;
    console.log(data.toString());
  });
  fs.appendFile("sample.txt", " This is my updated content", (err) => {
    if (err) throw err;
    console.log("File updated!");
  });
  fs.rename("sample.txt", "test.txt", (err) => {
    if (err) throw err;
    console.log("File name updated!");
  });
  fs.unlink("test.txt", (err) => {
    if (err) throw err;
    console.log("File test.txt deleted successfully!");
  });*/
  const fs = require("fs");
const http = require("http");

// Ensure the index.html file exists or create it
if (!fs.existsSync("index.html",)) {
  fs.writeFile(
    "index.html",
    "<!DOCTYPE html><html><head><title>My First HTML Page</title></head><body><h1>Hello World!</h1></body></html>",
    (err) => {
      if (err) throw err;
      console.log("index.html file created!");
    }
  );
}
const server = http.createServer((req, res) => {
  const stream = fs.createReadStream("index.html" ,"utf-8");
  stream.on("error", (err) => {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
    console.error("Error reading index.html:", err);
  });
  stream.pipe(res); // Pipe the read stream to the response object
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
