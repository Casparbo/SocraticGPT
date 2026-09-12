const button = document.querySelector("button");
const chatDisplay = document.querySelector("#chat-display");
const chatInput = document.querySelector("textarea")

botSays("Hello. I am Socratic GPT! How can I help you today?");
button.addEventListener("click", updateButton);
let contextRequired = true;

function updateButton() {
	if(!chatInput.value) {
		return;
	}
	text = chatInput.value;
	sendMessage(text, true);
	botSays(generateResponse(text));
	chatInput.value="";
}

function generateResponse(text) {
	if(text.length >= 50)
		contextRequired = false;

	if(contextRequired)
		return "I hear you. Please provide additional context so I know exactly how to assist you.";
	else if(text.length > 10)
		return "Thank you for explaining yourself. This is a little chaotic. Can you pinpoint the exact issue?";
	else
		return "Thank you for breaking it down. But it seems like you have already arrived at the solution yourself.";
}

async function botSays(text) {
	msg = sendMessage("○○○", false);
	msg.setAttribute("style", "font-family: symbols;");
	await thinking(msg);
	msg.setAttribute("style", "font-family: mspace;");
	typeText(text, msg);
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