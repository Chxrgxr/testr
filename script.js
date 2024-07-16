document.getElementById("searchForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  var searchTerm = document.getElementById("searchInput").value;
  var apiUrl = "https://your-api-endpoint.com/api/script/search?q=" + encodeURIComponent(searchTerm);

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      displayScripts(data.result.scripts);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error.message, error);
      alert('Failed to fetch data. Please try again later.');
    });
});

function displayScripts(scripts) {
  var scriptsContainer = document.getElementById("scripts");
  scriptsContainer.innerHTML = '';

  scripts.forEach(script => {
    var scriptCard = document.createElement('div');
    scriptCard.classList.add('script-card');
    scriptCard.innerHTML = `
      <h3>${script.title}</h3>
      <p>${script.description}</p>
      <p>Views: ${script.views}</p>
    `;
    scriptsContainer.appendChild(scriptCard);
  });
}
