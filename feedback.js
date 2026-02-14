
const bubbleContainer = document.getElementById('bubbles');
const colors = ['blue-bubble', 'pink-bubble', 'purple-bubble', 'green-bubble', 'yellow-bubble'];
const bubbleCount = 40;

for (let i = 0; i < bubbleCount; i++) {
  const bubble = document.createElement('span');
  bubble.classList.add('bubble', colors[Math.floor(Math.random() * colors.length)]);
  const size = Math.random() * 20 + 10;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.bottom = `${Math.random() * 100}%`;
  bubble.style.animationDuration = `${Math.random() * 5 + 5}s`;
  bubbleContainer.appendChild(bubble);
}


const inp1 = document.getElementById("inp1");
const inp2 = document.getElementById("inp2");
const inp3 = document.getElementById("inp3");
const cont = document.getElementById("container2");


function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function refresh() { location.reload(); }

async function submitFeedback(event) {
  event.preventDefault();

  if (!inp1.value.trim() || !inp2.value.trim() || !inp3.value.trim()) return alert("Please fill in all fields.");
  if (inp1.value.length <= 4) return alert("Your name must be more than 4 characters.");
  if (!isValidEmail(inp2.value)) return alert("Please enter a valid email address.");

  const color = getRandomColor();
  const data = { name: inp1.value, email: inp2.value, message: inp3.value, color };

  try {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!result.success) return alert("Error: " + (result.error || "Failed to save message"));

  
    inp1.value = inp2.value = inp3.value = "";

    fetchMessages();
  } catch (err) {
    console.error("Error saving data:", err);
    alert("Error saving message!");
  }
}

async function fetchMessages() {
  try {
    const res = await fetch("/api/messages");
    const data = await res.json();

    cont.innerHTML = "";
    data.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("umbrella");

      const name = document.createElement("p");
      name.classList.add("head1");
      name.style.setProperty('--before-bg', item.color);
      name.textContent = item.name;

      const email = document.createElement("p");
      email.classList.add("head2");
      email.textContent = item.email;

      const msg = document.createElement("p");
      msg.classList.add("head3");
      msg.textContent = item.message;

      const date = document.createElement("p");
      date.classList.add("head4");
      date.textContent = new Date(item.createdAt).toLocaleString();

      div.append(name, email, msg, date);
      cont.appendChild(div);
    });
  } catch (err) {
    console.error("Error fetching messages:", err);
  }
}

fetchMessages();


window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  const icon = document.getElementById("but1");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    document.body.classList.remove("dark-theme");
    icon.classList.replace("fa-sun", "fa-moon");
  }
};

function toggleMode() {
  const body = document.body;
  const icon = document.getElementById("but1");
  const isDark = body.classList.toggle("dark-theme");

  if (isDark) {
    localStorage.setItem("theme", "dark");
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    localStorage.setItem("theme", "light");
    icon.classList.replace("fa-sun", "fa-moon");
  }
}
