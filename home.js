const bubbleContainer = document.getElementById('bubbles');
const colors = ['blue', 'pink', 'purple', 'green', 'yellow'];
const bubbleCount = 80;

for (let i = 0; i < bubbleCount; i++) {
  const bubble = document.createElement('span');
  bubble.classList.add('bubble');

  const color = colors[Math.floor(Math.random() * colors.length)];
  bubble.classList.add(color);

 
  const size = Math.random() * 12 + 12; 
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

 
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.bottom = `${Math.random() * 100}%`;

  const duration = Math.random() * 5 + 5; 
  bubble.style.animationDuration = `${duration}s`;

  bubbleContainer.appendChild(bubble);
}

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

function mode() {
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
