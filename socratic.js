const button = document.querySelector("button");
const chatDisplay = document.querySelector("#chat-display");
const chatInput = document.querySelector("textarea")

button.addEventListener("click", updateButton);

function updateButton() {
	if(!chatInput.value) {
		return;
	}
	text = chatInput.value;
	sendMessage(text, true);
	respond(text);
	chatInput.value="";
}

async function respond(text) {
	response = "I hear you. Tell me more.";
	msg = sendMessage("", false);
	msg.setAttribute("style", "font-family: symbols;");
	await thinking(msg);
	msg.setAttribute("style", "font-family: mspace;");
	typeText(response, msg);
}

function sendMessage(text, user) {
	msg = document.createElement("p");
	msg.textContent = text;
	if(user) {
		msg.setAttribute("class", "user");
	} else {
		msg.setAttribute("class", "bot")
	}
	chatDisplay.appendChild(msg);
	chatDisplay.scrollTo(0, chatDisplay.scrollHeight);

	return msg;
}

async function thinking(parent) {
	bubbles = ["●○○", "○●○", "○○●"];
	for (var i = 0; i <= 11; i++) {
		parent.textContent = bubbles[i%bubbles.length];
		await sleep(300);
	}
}

async function typeText(text, parent) {
	for (var i = 0; i <= text.length; i++) {
		parent.textContent = text.slice(0, i);
		await sleep(Math.random()*100);
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}