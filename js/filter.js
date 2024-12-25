const searchEl = document.querySelector('.input_icon')

searchEl.search.addEventListener("input", () => {
    const searchVal = searchEl.search.value.toLowerCase();
    const cardsItem = document.querySelectorAll('.user__item2')
    const cardsTitle = document.querySelectorAll('.card__title')
    cardsTitle.forEach((title, i) => {
        if(title.textContent.toLowerCase().includes(searchVal)) {
            cardsItem[i].style.display = 'block'
        } else {
            cardsItem[i].style.display = 'none'
        }
    })

    
    
})