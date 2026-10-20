import http from "node:http";

const server = http.createServer((req, res) => {
  /**
   * Logging Requests
   */
  if (req.method.toLowerCase() === "post") {
    console.log("Posting");
    readBody(req).then((body) => {
        const obj = JSON.parse(body)
        console.log(obj.name);
    });
  }
  /**
   * Sending Response
   */
  //   res.setHeader("Content-Type", "text/plain")
  res.setHeader("Content-Type", "text/html");
  res.write("Request: " + req.url);
  res.write("<hr>");
  res.write("<h1>Hello World</h1>");
  res.end();
});

server.listen(3000);

/**
 * @returns Promise<String>
 */
async function readBody(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
  }
  return body;
}
