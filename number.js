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

  fetch(`https://numbersapi.com/${num}`)
    .then(response => response.text())
    .then(data => {
      result.textContent = data;
    })
    .catch(error => {
      result.textContent = 'Something went wrong. Please try again.';
      console.error('Error:', error);
    });
}
