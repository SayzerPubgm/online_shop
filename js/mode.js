// Dark Mode
const body = document.querySelector('body');
const darkBtn = document.querySelector('#dark-btn');
const lightBtn = document.querySelector('#light-btn');
const allButtons = document.querySelectorAll("button");
const text2 = document.querySelector('.suggested');
const input2 = document.querySelector('.input__search');
const ahref = document.querySelector('.ahref_btn');

// Check localStorage and set the initial mode
const modeLocal = localStorage.getItem('mode')


if (modeLocal === 'dark-mode') {
    body.classList.add('dark-mode');
    darkBtn.classList.add('hidden');
    lightBtn.classList.remove('hidden');
    ahref.classList.add('ahref_bg');
    body.classList.add('bg_black');
    text2.classList.add('text_js');
    input2.classList.add('ingput_bg');
    allButtons.forEach(button => button.classList.add('bg_btn'));
}

// Toggle
const toggleFunc = () => {
    darkBtn.classList.toggle('hidden');
    lightBtn.classList.toggle('hidden');
    ahref.classList.toggle('ahref_bg');
    body.classList.toggle('dark-mode');
    body.classList.toggle('bg_black');
    text2.classList.toggle('text_js');
    input2.classList.toggle('ingput_bg');
};

darkBtn.addEventListener('click', () => {
    toggleFunc();
    localStorage.setItem('mode', 'dark-mode'); // Save mode in localStorage
    allButtons.forEach(button => button.classList.add('bg_btn'));
});

lightBtn.addEventListener('click', () => {
    toggleFunc();
    localStorage.setItem('mode', ''); // Clear the mode in localStorage
    allButtons.forEach(button => button.classList.remove('bg_btn'));
});

// Intro Loader

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const introShown = localStorage.getItem('introShown'); // Loading ekrani ko'rsatilganligini tekshirish
    const isBackNavigation = sessionStorage.getItem('isBackNavigation'); // Orqaga qaytish holati

    // Sahifa ortga qaytish holatini aniqlash
    const isComingBackFromOtherPage = sessionStorage.getItem('isComingBackFromOtherPage');

    if (isComingBackFromOtherPage) {
        // Agar boshqa sahifadan orqaga qaytgan bo'lsak, intro-ni ko'rsatmaslik
        loader.classList.add('loader--hidden');
    } else {
        // Agar birinchi marta kirsangiz va intro ko'rsatilmagan bo'lsa
        if (!introShown) {
            setTimeout(() => {
                loader.classList.add('loader--hidden');  // 2 sekunddan keyin loading-ni yashirish
            }, 3000);

            // Birinchi kirishdan keyin intro ekranini ko'rsatganini localStorage orqali eslab qolish
            localStorage.setItem('introShown', 'true');
        } else {
            // Agar orqaga qaytish holati bo'lmasa, loadingni yashirish
            if (isBackNavigation === null) {
                setTimeout(() => {
                    loader.classList.add('loader--hidden');  // Sayfaga bevosita kirgan bo'lsangiz, loadingni yashirish
                }, 3000);
            } else {
                // Agar orqaga qaytgan bo'lsangiz, loadingni ko'rsatmaslik
                loader.classList.add('loader--hidden');
            }
        }
    }

    // Sayfaga bevosita kirganingizni belgilash
    sessionStorage.setItem('isBackNavigation', 'false');

    // Agar orqaga qaytish bo'lsa, sessionStorage orqali flagni o'zgartirish
    window.onpopstate = () => {
        sessionStorage.setItem('isBackNavigation', 'true');
    };

    // Orqaga qaytgan holda intro ko'rsatilmasligini belgilash
    window.onbeforeunload = () => {
        sessionStorage.setItem('isComingBackFromOtherPage', 'true');
    };
});







