// 1.0 INDEX
// 2.0 EVENT


// 1.0 INDEX
//BUTTONS
document.querySelector('.home-about__button').addEventListener('click', (event) => {
    window.location.href = '{{translation.urlPrefix}}/about';
});

document.querySelector('.partners__button').addEventListener('click', (event) => {
    window.location.href = '{{translation.urlPrefix}}/about';
});



// PRELOAD IMAGES
document.addEventListener('DOMContentLoaded', () => {
    const imageSources = [
        '/Photos/highlights-photo.png',
        '/Photos/highlights-photo-2.png',
    ];

    // Preload images
    imageSources.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Rest of your code for managing highlights
});



// FACILITIES 
const slider = document.querySelector('.facilities__container');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
});

slider.addEventListener('mouseup', () => {
    isDown = false;
});

slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX); //scroll speed
    slider.scrollLeft = scrollLeft - walk;
});



// HIGHLIGHTS
document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    const highlightsSection = document.querySelector('.highlights');
    const features = document.querySelectorAll('.highlights__feature');
    const totalPages = features.length;
    const currentPageSpan = document.querySelector('.highlights__current-page');
    const totalPagesSpan = document.querySelector('.highlights__total-pages');
    totalPagesSpan.textContent = '04'; // As there are 4 features

    // Initialize the first feature as active
    features[currentIndex].classList.add('active');
    features[currentIndex].style.display = 'block';
    currentPageSpan.textContent = '01';

    function updateFeatures(direction) {
        features[currentIndex].classList.remove('active');
        features[currentIndex].style.display = 'none'; // Hide the current feature completely

        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % totalPages;
        } else {
            currentIndex = (currentIndex - 1 + totalPages) % totalPages;
        }

        features[currentIndex].classList.add('active');
        features[currentIndex].style.display = 'block'; // Show the new active feature
        features[currentIndex].style.opacity = '1';
        currentPageSpan.textContent = String(currentIndex + 1).padStart(2, '0');

        updateBackground(currentIndex);
    }

    function updateBackground(index) {
        highlightsSection.classList.remove('highlights__nature', 'highlights__food', 'highlights__meet', 'highlights__activities');
        const backgroundClasses = ['highlights__nature', 'highlights__food', 'highlights__meet', 'highlights__activities'];
        highlightsSection.classList.add(backgroundClasses[index]);
    }

    document.querySelector('.highlights__arrow--right').addEventListener('click', () => {
        updateFeatures('next');
    });

    document.querySelector('.highlights__arrow--left').addEventListener('click', () => {
        updateFeatures('previous');
    });
});



// TESTIMONIALS
document.addEventListener('DOMContentLoaded', function() {
    // Testimonials data
    const testimonials = [
        {
            text: `“The understanding of form, materials and texture and how a sustainably built space can integrate into the natural environment, to create something of beauty, is to be admired. It’s not just what their spaces look like, it’s how they feel – how they work from an aesthetic as well as practical point of view”`,
            author: "Katrine Binne"
        },
        {
            text: `Lokaal 47 is simply the best! Their energy and commitment to excellence are unmatched. I can't recommend their services enough! Every aspect of the interaction was beyond my expectations—truly first-class!”`,
            author: "Client 2"
        },
        {
            text: `“Testimonial 3 text goes here. More kind words from our wonderful clientele!”`,
            author: "Client 3"
        },
        {
            text: `“Testimonial 4 text goes here. They loved our service and support!”`,
            author: "Client 4"
        },
        {
            text: `“Testimonial 5 text goes here. Last but not least, amazing feedback from another valued customer!”`,
            author: "Client 5"
        }
    ];

    let currentIndex = 0;

    // Function to update the testimonial
    function updateTestimonial(index) {
        const testimonialText = document.querySelector('.testimonial__text');
        const testimonialAuthor = document.querySelector('.testimonial__author');
        const currentPageIndicator = document.querySelector('.testimonials__current');

        testimonialText.textContent = testimonials[index].text;
        testimonialAuthor.textContent = testimonials[index].author;
        currentPageIndicator.textContent = index + 1;
    }

    // Click events for arrows
    document.querySelector('.testimonials__arrow--left').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex -= 1;
        } else {
            currentIndex = testimonials.length - 1;  // Go to the last testimonial if at the first
        }
        updateTestimonial(currentIndex);
    });

    document.querySelector('.testimonials__arrow--right').addEventListener('click', function() {
        if (currentIndex < testimonials.length - 1) {
            currentIndex += 1;
        } else {
            currentIndex = 0;  // Go back to the first testimonial if at the last
        }
        updateTestimonial(currentIndex);
    });

    // Initialize the first testimonial
    updateTestimonial(0);
});





// 2.0 EVENT
const dialog = document.querySelector('.dialog--event-registration');
const openDialogButton = document.querySelector('.reserve-btn');
const closeButton = document.querySelector('.dialog__close-btn');
        
openDialogButton.addEventListener('click', () => {
    dialog.showModal();
    document.querySelector('#name').focus();
});

closeButton.addEventListener('click', () => {
    dialog.close();
});

dialog.querySelector('.dialog__form').addEventListener('submit', (e) => {
    e.preventDefault();
    dialog.close();
    console.log('Form submitted');
});



