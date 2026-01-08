const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/config.js", (req, res) => {
  res.type("application/javascript");
  res.send(`
    window.FIREBASE_CONFIG = {
      apiKey: "${process.env.FB_API_KEY}",
      authDomain: "${process.env.FB_AUTH_DOMAIN}",
      projectId: "${process.env.FB_PROJECT_ID}",
      storageBucket: "${process.env.FB_STORAGE_BUCKET}",
      messagingSenderId: "${process.env.FB_SENDER_ID}",
      appId: "${process.env.FB_APP_ID}"
    };
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
