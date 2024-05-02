// WHAT'S INCLUDED - POP UP DIALOGS
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.booking-form__info-button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the form from submitting
            const dialogId = this.getAttribute('data-dialog');
            const dialog = document.getElementById(dialogId);
            if (dialog) {
                dialog.showModal(); // Open the dialog
                dialog.querySelector('.dialog__close-btn').focus(); // Focus the close button
            }
        });
    });

    // Close functionality for all dialogs
    document.querySelectorAll('.dialog__close-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('dialog').close();
        });
    });

    // Optional: Handle the Escape key to close dialogs
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dialog.close();
            }
        });
    });
});



// ADD ONS NAVIGATION
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.booking-form__nav-item');
    const sections = document.querySelectorAll('#booking__section--add-ons section');

    function hideAllSections() {
        sections.forEach(section => {
            section.style.display = 'none';
        });
        console.log('All sections hidden');
    }

    function showSection(sectionName) {
        const sectionToShow = document.querySelector(`.booking-form__section--${sectionName}`);
        if (sectionToShow) {
            sectionToShow.style.display = 'block'; // Adjust as needed
            console.log(`Showing section: ${sectionName}`);
        } else {
            console.log(`Section not found: ${sectionName}`);
        }
    }

    // Hide all sections initially
    hideAllSections();

    // Show the first section by default
    if(navItems.length > 0) {
        const firstSectionName = navItems[0].getAttribute('data-section');
        showSection(firstSectionName);
        navItems[0].classList.add('booking-form__nav-item--current');
    }

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionName = this.getAttribute('data-section');
            navItems.forEach(nav => nav.classList.remove('booking-form__nav-item--current'));
            this.classList.add('booking-form__nav-item--current');
            hideAllSections();
            showSection(sectionName);
        });
    });
});



// QUANTITY BUTTONS
document.addEventListener('DOMContentLoaded', function () {
    // This code will run after the page is fully loaded
    const quantityButtons = document.querySelectorAll('.booking-form__quantity-btn');

    quantityButtons.forEach(button => {
        button.addEventListener('click', function () {
            const input = this.parentNode.querySelector('.booking-form__quantity-input');
            let currentValue = parseInt(input.value);

            if (this.textContent === '+') {
                currentValue = isNaN(currentValue) ? 0 : currentValue + 1;
            } else if (this.textContent === '-') {
                currentValue = isNaN(currentValue) ? 0 : (currentValue - 1 > 0 ? currentValue - 1 : 0);
            }

            input.value = currentValue;
        });
    });
});



// PARKING INFO TOGGLE
document.addEventListener('DOMContentLoaded', function () {
    const parkingHead = document.querySelector('.booking__parking-head');
    const parkingInfo = document.querySelector('.booking__parking-description');
    const arrowIcon = document.querySelector('.booking__parking-arrow');

    // Initialize the display style to ensure it is set to 'none' initially.
    parkingInfo.style.display = 'none';

    parkingHead.addEventListener('click', function () {
        // Toggle display CSS property
        if (parkingInfo.style.display === 'none') {
            parkingInfo.style.display = 'block';
            arrowIcon.style.transform = 'rotate(180deg)'; // Arrow points down
        } else {
            parkingInfo.style.display = 'none';
            arrowIcon.style.transform = ''; // Arrow resets to point up
        }
    });
});