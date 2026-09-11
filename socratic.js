const button = document.querySelector("button");
const chatDisplay = document.querySelector("#chat-display");
const chatInput = document.querySelector("textarea")

button.addEventListener("click", updateButton);

function updateButton() {
	if(!chatInput.value) {
		return
	}
	msg = document.createElement("p");
	msg.textContent = chatInput.value;
	msg.setAttribute("class", "user");
	chatDisplay.appendChild(msg);
	chatDisplay.scrollTo(0, chatDisplay.scrollHeight);
	chatInput.value="";
}