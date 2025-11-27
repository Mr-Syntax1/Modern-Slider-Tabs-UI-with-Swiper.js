const slideTabs = document.querySelectorAll('.slider-tab');
const slideIndicator = document.querySelector('.slider-indicator');
const sliderControls = document.querySelector('.slide-controls');

const updateindicator = (tab, index) => {
    slideIndicator.style.transform = `translateX(${tab.offsetLeft - 20}px)`;
    slideIndicator.style.width = `${tab.getBoundingClientRect().width}px`;

    // Calculate the scroll position and scroll smoothly
    const scrollLeft = slideTabs[index].offsetLeft - sliderControls.offsetWidth / 2 + slideTabs[index].offsetWidth / 2;
    sliderControls.scrollTo ({ left: scrollLeft, behavior: 'smooth' });

    
    // sliderTabs.forEach(tab => {
    //     tab.classList.remove('active');
    // });
    // sliderTabs[index].classList.add('active');
}

//Initialize Swiper instance
const swiper = new Swiper('.swiper', {
    // Optional parameters
    // loop: true,

    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },

    on: {
        //update the slide and indicator on slide change
        slideChange: () => {
            const currentTabIndex = [...slideTabs].indexOf(slideTabs[swiper.activeIndex]);
            updateindicator(slideTabs[swiper.activeIndex],currentTabIndex);
        }
    },

    effect: "fade",
    speed : 1300,

    navigation: {
    nextEl: '#slider-next',
    prevEl: '#slider-prev',
},
});


//update the slide and indicator on tab click
slideTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        swiper.slideTo(index);
        updateindicator(tab, index);
    });
});
updateindicator(slideTabs[0], 0);

window.addEventListener('resize', () => {
    updateindicator(slideTabs[swiper.activeIndex], 0);
})