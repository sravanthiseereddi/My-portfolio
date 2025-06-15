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

      const url = `https://api.allorigins.win/get?url=${encodeURIComponent('https://numbersapi.com/' + num)}`;

      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          result.textContent = data.contents;
        })
        .catch(error => {
          result.textContent = 'Something went wrong. Please try again.';
          console.error('Error:', error);
        });
    }