const tg = Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe.user.first_name;
const chat = document.getElementById("chat");

function render(messages) {
  chat.innerHTML = "";
  messages.forEach(m => {
    const d = document.createElement("div");
    d.className = "msg" + (m.user === user ? " me" : "");
    d.innerText = `${m.user}: ${m.text}`;
    chat.appendChild(d);
  });
  chat.scrollTop = chat.scrollHeight;
}

function send() {
  const text = msg.value.trim();
  if (!text) return;

  tg.sendData(JSON.stringify({
    type: "send",
    user,
    text
  }));

  msg.value = "";
}

tg.onEvent("viewportChanged", () => {
  tg.sendData(JSON.stringify({ type: "get" }));
});

tg.onEvent("message", e => {
  try {
    render(JSON.parse(e.data));
  } catch {}
});

tg.sendData(JSON.stringify({ type: "get" }));
