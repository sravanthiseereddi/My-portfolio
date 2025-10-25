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

  
  const apiURL = `https://api.allorigins.win/raw?url=${encodeURIComponent('http://numbersapi.com/' + num)}`;

  fetch(apiURL)
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.text();
    })
    .then(data => {
      result.textContent = data;
    })
    .catch(error => {
      result.textContent = 'Something went wrong. Please try again.';
      console.error('Fetch error:', error);
    });
}

