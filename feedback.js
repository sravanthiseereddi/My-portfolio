const bubbleContainer = document.getElementById('bubbles');
const colors = ['blue-bubble', 'pink-bubble', 'purple-bubble', 'green-bubble', 'yellow-bubble'];
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

let inp1 = document.getElementById("inp1");
let inp2 = document.getElementById("inp2");
let inp3 = document.getElementById("inp3");
let cont = document.getElementById("container2");


function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function hehe() {
  if (inp1.value.trim() === "" || inp2.value.trim() === "" || inp3.value.trim() === "") {
    alert("Please fill in all fields.");
    return;
  }

  if (inp1.value.length <= 4) {
    alert("Your name must be more than 6 characters.");
    return;
  }

  let hey = document.createElement("div");
  hey.classList.add("umbrella");
  cont.appendChild(hey);

  let head = document.createElement("p");
  head.classList.add("head1");

  
  const randomColor = getRandomColor();
  head.style.setProperty('--before-bg', randomColor);

  head.innerHTML = inp1.value;
  hey.appendChild(head);

  let mail = document.createElement("p");
  mail.classList.add("head2");
  mail.innerHTML = inp2.value;
  hey.appendChild(mail);

  let message = document.createElement("p");
  message.classList.add("head3");
  message.innerHTML = inp3.value;
  hey.appendChild(message);

  inp1.value = "";
  inp2.value = "";
  inp3.value = "";

  saveData();
}

function saveData() {
  localStorage.setItem("name1", cont.innerHTML);
}

function showData() {
  cont.innerHTML = localStorage.getItem("name1");
}
showData();

function refresh() {
  location.reload();
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
