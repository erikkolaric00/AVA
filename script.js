function sendMessage() {
  const input = document.getElementById("userInput");
  const messages = document.getElementById("messages");

  const text = input.value.trim();

  if (text === "") return;

  const userMessage = document.createElement("div");
  userMessage.className = "user";
  userMessage.innerText = text;

  messages.appendChild(userMessage);

  setTimeout(() => {
    const botMessage = document.createElement("div");
    botMessage.className = "bot";

    botMessage.innerText =
      "AVA demo response: I understand your message.";

    messages.appendChild(botMessage);

    messages.scrollTop = messages.scrollHeight;
  }, 500);

  input.value = "";
}
