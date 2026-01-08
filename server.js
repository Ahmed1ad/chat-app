const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

/* 🔹 هنا بنخزن الرسائل */
let messages = [];

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (_, file, cb) => cb(null, Date.now() + file.originalname)
});
const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: `/uploads/${req.file.filename}` });
});

io.on("connection", socket => {

  /* 🔹 ابعت الشات القديم للي داخل */
  socket.emit("chat-history", messages);

  socket.on("message", msg => {
    messages.push(msg);        // حفظ الرسالة
    io.emit("message", msg);   // بثها لكل الناس
  });

});

server.listen(process.env.PORT || 3000);
