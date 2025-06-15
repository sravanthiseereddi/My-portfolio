document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('button');
  button.addEventListener('click', getNumberFact);
});

function getNumberFact() {
  const num = document.getElementById('numberInput').value;
  const result = document.getElementById('factResult');

  if (num === '') {
    result.textContent = 'Please enter a number.';
    return;
  }

  // Use a CORS proxy to fetch data
  const proxyUrl = 'https://api.allorigins.win/get?url=';
  const targetUrl = `http://numbersapi.com/${num}?json`;

  fetch(proxyUrl + encodeURIComponent(targetUrl))
    .then(response => response.json())
    .then(data => {
      const fact = JSON.parse(data.contents);
      result.textContent = fact.text;
    })
    .catch(error => {
      result.textContent = 'Something went wrong. Please try again.';
      console.error('Error:', error);
    });
}
