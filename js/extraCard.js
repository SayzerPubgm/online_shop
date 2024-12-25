document.addEventListener('DOMContentLoaded', () => {
  const API = 'https://raw.githubusercontent.com/SayzerPubgm/ProductData/refs/heads/main/public/data.json'; // The API endpoint for products
  const procardsContainer = document.querySelector('.procards'); // Container to append product cards

  // Fetch data from the API and render products
  async function fetchProducts() {
      try {
          const response = await fetch(API); // Fetch the products data from the API
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json(); // Parse the response JSON

          // Check if the data is structured properly
          const products = Array.isArray(data) ? data : data.onlineShop; // Adjust based on API response structure

          console.log(products); // Debug: Check the response

          renderProducts(products); // Call render function to display products
      } catch (error) {
          console.error('Error fetching products:', error); // Handle any errors
      }
  }

  // Render products into HTML cards
  function renderProducts(products) {
      if (!products || products.length === 0) {
          console.log('No products available to render.');
          return;
      }

      products.forEach(product => {
          const card = document.createElement('div');
          card.className = 'pro_card';

          card.innerHTML = `
              <div class="user__item2">
                  <img src="${product.image}" class="card__image" alt="${product.title}">
                  <div class="card__data">
                      <h1 class="card__title">${product.title}</h1>
                      <span class="card__price">$${product.price}</span>
                      <p class="card__description">${product.description}</p>
                      <a href="./product.html" class="card__button">Buy now!</a>
                  </div>
              </div>
          `;
          procardsContainer.appendChild(card); // Append each product card to the container
      });
  }

  // Trigger the fetch process when DOM is loaded
  fetchProducts();
});


// QUANTITY JS
document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById('numberDropdown');
  for (let i = 2; i <= 12; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      dropdown.appendChild(option);
  }
});


// MODAL CONTACT

const modal = document.getElementById('contactModal');
const open = document.getElementById('supportBtn');
const closeModalButton = document.getElementById('closeModal');

 open.addEventListener('click', () => {
    modal.classList.remove('hidden')
    
});

closeModalButton.addEventListener('click', () => {
  modal.classList.add('hidden')
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden')
  }
});

document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for reaching out!');
  modal.style.display = 'none';
});

// SHOW MORE BUTTON

let currentPage = 1;
const itemsPerPage = 15; // Adjust the number of items to load per page

document.getElementById('show_more').addEventListener('click', () => {
  fetchData(currentPage);  // Fetch next set of products when clicked
});

function fetchData(page) {
  fetch('https://raw.githubusercontent.com/SayzerPubgm/ProductData/refs/heads/main/public/data.json')
    .then(response => response.json())
    .then(data => {

      if (!Array.isArray(data.onlineShop)) {
        console.error('onlineShop is not an array:', data.onlineShop);
        return;  // If onlineShop isn't an array, stop further processing
      }

      const container = document.getElementById('data-container');

      // Calculate the start and end indices based on the current page
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // Slice the onlineShop array for the current page
      const paginatedData = data.onlineShop.slice(startIndex, endIndex);

      // Render the paginated items
      paginatedData.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
          <div class="user__item2">
            <img src="${item.image}" class="card__image">
            <div class="card__data">
              <h1 class="card__title">${item.title}</h1>
              <span class="card__price">$${item.price}</span>
              <p class="card__description">${item.description}</p>
              <a href="./product.html" class="card__button">buy now!</a>
            </div>
          </div>
        `;
        container.appendChild(div);  // Append the new product cards
      });

      currentPage++;  // Increment page number for next fetch
    })
    .catch(error => {
      console.error('Error:', error);
    });
}







