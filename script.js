const socket = io();
const chat = document.getElementById("chat");

socket.on("message", data => {
  chat.innerHTML += `<div>${data}</div>`;
});

function send() {
  const msg = msgInput.value;
  const file = document.getElementById("file");

  if (file.files.length) {
    const form = new FormData();
    form.append("file", file.files[0]);

    fetch("/upload", { method: "POST", body: form })
      .then(r => r.json())
      .then(d => socket.emit("message", `<a href="${d.file}">📎 ملف</a>`));
  }

  if (msg) socket.emit("message", msg);
}
