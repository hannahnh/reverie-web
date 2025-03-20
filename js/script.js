document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close-menu");

    mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    closeMenu.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });

    // About dropdown toggle (Desktop)
    const aboutBtn = document.getElementById("about-btn");
    const aboutDropdown = document.getElementById("about-dropdown");

    aboutBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        aboutDropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (event) => {
        if (!aboutBtn.contains(event.target)) {
            aboutDropdown.classList.add("hidden");
        }
    });

    // Mobile About dropdown toggle
    const mobileAboutBtn = document.getElementById("mobile-about-btn");
    const mobileAboutMenu = document.getElementById("mobile-about-menu");

    mobileAboutBtn.addEventListener("click", () => {
        mobileAboutMenu.classList.toggle("hidden");
    });
});

// Chatbot 
document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const micButton = document.getElementById("mic-button");
    const micStatus = document.createElement("p"); // Mic status message
    micStatus.className = "text-gray-500 text-sm mt-2 text-center";
    micButton.parentElement.appendChild(micStatus);

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.className = `p-2 my-1 rounded-md ${sender === "user" ? "bg-[#C5BCCE] text-black self-end text-right" : "bg-[#6F5588] text-white self-start text-left"}`;
        messageElement.textContent = message;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    // Initial chatbot welcome message
    appendMessage("bot", "Hi! Welcome to Reverie. Take your time and speak whenever you're ready.");

    sendButton.addEventListener("click", () => {
        if (userInput.value.trim() !== "") {
            appendMessage("user", userInput.value);
            chatbotResponse(userInput.value);
            userInput.value = "";
        }
    });

    micButton.addEventListener("click", () => {
        if (micButton.classList.contains("mic-active")) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });

    recognition.onstart = function () {
        micButton.classList.add("mic-active");
        micButton.style.backgroundColor = "#5D76A9"; 
    };

    recognition.onend = function () {
        micButton.classList.remove("mic-active");
        micButton.style.backgroundColor = "#D6DCE1"; 
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
    };

    async function chatbotResponse(userMessage) {
        try {
            const response = await fetch("https://reverie-lvha49xqw-hannahs-projects-30b1845c.vercel.app/api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();
            appendMessage("bot", data.response || "I'm here to listen.");
        } catch (error) {
            console.error("Error:", error);
            appendMessage("bot", "Oops! Something went wrong.");
        }
    }
});