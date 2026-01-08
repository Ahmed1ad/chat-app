const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (_, file, cb) => cb(null, Date.now() + file.originalname)
});
const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: `/uploads/${req.file.filename}` });
});

io.on("connection", socket => {
  socket.on("message", msg => io.emit("message", msg));
});

server.listen(process.env.PORT || 3000);
