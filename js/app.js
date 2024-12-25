 
// refresh buttons
const refreshBtn = document.querySelector('.popular_btn');
const refreshButton = document.querySelector('#top_btn');

refreshBtn.addEventListener('click', (e) => {
  e.preventDefault();
  reload();
})

refreshButton.addEventListener('click', (e) => {
  e.preventDefault();
  reload();
})

//containers
const container = document.querySelector('.blog_items');



// Update UI with API data
const updateUI = (data) => {
  console.log(data);  // Log the data to check its structure
  container.innerHTML = ''; 
  
  // Ensure the data is an array before using .map
  if (Array.isArray(data)) {
    data.map((item) => {
      const { image, description, price, title } = item;

      const productCard = `
        <div class="user__item2">
          <img src="${image}" class="card__image">
          <div class="card__data">
            <h1 class="card__title">${title}</h1>
            <span class="card__price">$${price}</span>
            <p class="card__description">${description}</p>
            <a href="./product.html" class="card__button">buy now!</a>
          </div>
        </div>
      `;

      // Append the product card to the container
      container.innerHTML += productCard;
    });
  } else {
    console.error('Expected an array of products, but received:', data);
  }
};



// REgister MOdal

const modal = document.getElementById('contactModal');
const open = document.getElementById('btnSignIn');
const closeModalButton = document.getElementById('closeModal');

 open.addEventListener('click', () => {
    setTimeout(() => {
      modal.classList.remove('hidden')
    }, 1100)
    
});

closeModalButton.addEventListener('click', () => {
  modal.classList.add('hidden')
});

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden')
  }
});

// Handle form submission (optional)
const continueBtn = document.getElementById('continue_btn');

continueBtn.addEventListener('click', (e) => {
  e.preventDefault(); 
  alert('Successfully connected!');
  modal.style.display = 'none'; 
});


// REGEX Sign up

const EmailPhone = document.querySelector('#email-phone');
const EmPh = document.querySelector('#warning-emph')

EmailPhone.addEventListener('keyup', (e) => {
  e.preventDefault()
    const regExEmailPh = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const emailPhVal = EmailPhone.value

    EmailPhone.classList.remove('input_bg_correct', 'input_bg_error');


    if(regExEmailPh.test(emailPhVal)) {
      EmPh.textContent = ''
      EmailPhone.classList.add('input_bg_correct')
    } else {
      EmPh.textContent = 'Please enter a valid Gmail address @gmail.com';
      EmPh.classList.add('error');
      EmailPhone.classList.add('input_bg_error')
    }

})



//  login page sign in to register

const password = document.querySelector('#created-password');
const warning = document.querySelector('#warning');
const registerMod = document.getElementById('register__modal')
const logInBtn = document.querySelector('#log-in')
const email = document.querySelector('#email')
const warEmail = document.querySelector('#warning-email')
const confirmPassword = document.querySelector('#confirm-password')
const warningConfirm = document.querySelector('#warning-confirm')

email.addEventListener('keyup', (e) => {
  e.preventDefault();
  const regExEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const emailVal = email.value

  warEmail.classList.remove('correct', 'error');

  if (regExEmail.test(emailVal)) {
    warEmail.textContent = 'Email is correct!';
    warEmail.classList.add('correct');
  } else {
    warEmail.textContent = 'Please enter a valid Gmail address @gmail.com';
    warEmail.classList.add('error');
  }


})

password.addEventListener('keyup', (e) => {
  e.preventDefault();
  
  const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/;
  const inputVal = password.value;

  warning.classList.remove('correct', 'error');
  
  if (regEx.test(inputVal)) {
    warning.textContent = 'Your password is perfect!';
    warning.classList.add('correct');
        logInBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Thank you for registration!');
        registerMod.style.display = 'none';
      })
       
  } else {
    warning.textContent = 'Password must be 6-12 characters long, contain at least one uppercase letter, one lowercase letter, and one number.';
    warning.classList.add('error');

  }


  confirmPassword.addEventListener('keyup', (e) => {
    e.preventDefault();

    const inputVal = password.value;
    const confirmVal = confirmPassword.value;


    if (inputVal !== confirmVal) {
      warningConfirm.textContent = 'Passwords do not match!';
      warningConfirm.classList.add('error');
    } else {
      warningConfirm.textContent = 'Password matched!'
      warningConfirm.classList.add('correct');
    }
  })


});



const createAcc = document.getElementById('create_account')
const registerModal = document.getElementById('register__modal')
const closeModalButton2 = document.getElementById('closeModal2');


createAcc.addEventListener('click', (e) => {
    e.preventDefault();
   modal.classList.add('hidden') 
   registerModal.classList.remove('hidden')
})

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
  if (e.target === registerModal) {
    registerModal.classList.add('hidden')
  }
});

closeModalButton2.addEventListener('click', () => {
  registerModal.classList.add('hidden')
});

// SHOW MORE BUTTON
let currentPage = 1;
const itemsPerPage = 15; // Set how many items to show per page

// Event listener for the "Show More" button
document.getElementById('show_more').addEventListener('click', () => {
    fetchData(currentPage);
});

// Function to fetch data and generate cards
function fetchData(page) {
    fetch('https://raw.githubusercontent.com/SayzerPubgm/ProductData/refs/heads/main/public/data.json')
        .then(response => response.json())
        .then(data => {
            // Log the data to inspect its structure
            console.log(data);

            // Check if the data is an object with the expected array (e.g., data.onlineShop)
            const products = Array.isArray(data) ? data : data.onlineShop; // Adjust this based on the actual data structure
            
            if (!Array.isArray(products)) {
                console.error('Expected an array, but got:', products);
                return;
            }

            const container = document.getElementById('data-container');

            // Calculate the start and end index for the current page
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            // Slice the data to show only the items for the current page
            const paginatedData = products.slice(startIndex, endIndex);

            paginatedData.forEach(item => {
                const card = document.createElement('div');
                card.className = 'user__item2';

                card.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="card__image">
                    <div class="card__data">
                        <h1 class="card__title">${item.title}</h1>
                        <span class="card__price">$${item.price}</span>
                        <p class="card__description">${item.description}</p>
                        <a href="./product.html" class="card__button">Buy Now!</a>
                    </div>
                `;

                container.appendChild(card);
            });

            currentPage++; // Increment to fetch the next page on subsequent clicks
        })
        .catch(error => console.error('Error fetching data:', error));
}



// PAYMENT MODAL

const modalPaymey = () => {
  const creditBtn = document.querySelector('.credit_btn')
const modalPay = document.querySelector('.modal-payment');
const closeModalButton1 = document.querySelector('#closeModal');
const cancelBtn = document.querySelector('#cancel-btn-payment');
creditBtn.addEventListener('click', () => {
modalPay.classList.remove('hidden')
})

window.addEventListener('click', (e) => {
if (e.target === modalPay) {
modalPay.classList.add('hidden')
     }
});

closeModalButton2.addEventListener('click', () => {
    modalPay.classList.add('hidden')
});

cancelBtn.addEventListener('click', () => {
    modalPay.classList.add('hidden')
});
}


















