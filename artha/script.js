const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatContainer = document.getElementById("chat-container");
const toggleTheme = document.getElementById("toggle-theme");

window.addEventListener("load", () => {
  input.disabled = false;
  sendBtn.disabled = false;
  input.focus();
});

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  input.value = "";
  input.disabled = true;
  sendBtn.disabled = true;

  const loadingBubble = addMessage("bot", "<em>...</em>");
  let timeoutId = setTimeout(() => {
    loadingBubble.innerHTML = "⚠️ Response timed out.";
    input.disabled = false;
    sendBtn.disabled = false;
  }, 60000);

  fetch("https://api.vyxm.in/artha/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text }),
  })
    .then(res => res.json())
    .then(data => {
      clearTimeout(timeoutId);
      loadingBubble.innerHTML = data.reply;
    })
    .catch(() => {
      clearTimeout(timeoutId);
      loadingBubble.innerHTML = "❌ Error occurred.";
    })
    .finally(() => {
      input.disabled = false;
      sendBtn.disabled = false;
    });
}

function addMessage(sender, text) {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${sender}`;
  bubble.innerHTML = text;
  chatContainer.appendChild(bubble);

  // Wait for DOM to render before scrolling
  requestAnimationFrame(() => {
    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "smooth",
    });
  });

  return bubble;
}
