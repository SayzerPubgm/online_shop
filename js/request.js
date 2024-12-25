const API = 'https://raw.githubusercontent.com/SayzerPubgm/ProductData/refs/heads/main/public/data.json';
const overlay = document.getElementById('overlay');

// Function to toggle loader visibility
const loaderToggle = (togg) => {
  if (togg) {
    overlay.classList.remove('hidden');
  } else {
    overlay.classList.add('hidden');
  }
};

// Fetch data from the API
const getData = (resource) => {
  loaderToggle(true);  // Show the loader before fetching data

  return fetch(resource)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();  // Parse the JSON data from the response
    })
    .then((data) => {
      loaderToggle(false);  // Hide the loader after the data is fetched
      console.log(data);  // Log the response structure to check it
      return data.onlineShop || [];  // Return the onlineShop array
    })
    .catch((error) => {
      loaderToggle(false); 
      console.error('Error fetching data:', error);  
      throw error;  
    });
};


// Function to reload data and update the UI
const reload = () => {
  getData(API)
    .then((data) => {
      updateUI(data);  // Update the UI with the fetched data
    })
    .catch((error) => {
      console.error('Failed to reload data:', error);  // Handle errors
    });
};

// Fetch and reload the UI when the page is loaded
document.addEventListener('DOMContentLoaded', reload);
