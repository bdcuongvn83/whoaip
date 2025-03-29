import express from "express"; // Use import instead of require
import cors from "cors";

const app = express();

// Enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
app.use(cors({ optionsSuccessStatus: 200 })); // Some legacy browsers choke on 204

// Serve static files
app.use(express.static("public"));

// Your routes
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/whoaip", function (req, res) {
  const ipaddress = req.ip || req.headers["x-forwarded-for"] || "IP not found";
  const language = req.headers["accept-language"] || "Language not found";
  const software = req.headers["user-agent"] || "Software not found";

  const response = {
    ipaddress,
    language,
    software,
  };

  res.json(response);
});

// Export the app
export default app;
