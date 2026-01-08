const socket = io();
const chat = document.getElementById("chat");

socket.on("message", data => {
  chat.innerHTML += `<div>${data}</div>`;
});

function send() {
  const msg = document.getElementById("msg").value;
  const file = document.getElementById("file");

  if (file.files.length > 0) {
    const form = new FormData();
    form.append("file", file.files[0]);

    fetch("/upload", { method: "POST", body: form })
      .then(res => res.json())
      .then(d => socket.emit("message", `<a href="${d.file}">📎 ملف</a>`));
  }

  if (msg.trim() !== "") {
    socket.emit("message", msg);
    document.getElementById("msg").value = "";
  }
}
