document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav__links');

    toggleButton.addEventListener('click', function () {
        console.log('Clicked!'); // Check if this message appears in your console.
        navLinks.classList.toggle('nav-active');
        this.classList.toggle('nav-active'); // Toggles the class on the button itself.
    });
});




// CALENDAR
let todaysDateObject = new Date();
let monthDateObject = new Date();

// Sample data for booked dates; you would replace this with your actual data source
const bookings = {
    '2024-04-10': { morning: true, evening: false },
    '2024-04-15': { morning: false, evening: true },
    '2024-04-20': { morning: true, evening: true }, // Full day
};

const renderCalendar = (monthDate) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthDays = document.querySelector('.days');

    const lastDateThisMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate(); // Day 0 gets the last day of the previous month
    const lastDatePrevMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 0).getDate(); // Day 0 gets the last day of the previous month

    const firstDayThisMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1).getDay(); // Day 1 gets the first day of the month
    const lastDayThisMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDay(); // Day 0 gets the last day of the month
    const todayDate = new Date();

    document.querySelector('.current-month').innerHTML = months[monthDate.getMonth()];


    // Calculate how many days of the previous month to show
    let daysOfPreviousMonthToShow = 0;
    if (firstDayThisMonth == 0) {
        daysOfPreviousMonthToShow = 6;
    } else {
        daysOfPreviousMonthToShow = firstDayThisMonth - 1;
    }


    // Calculate how many days of the next month to show
    let daysOfNextMonthToShow = 0;
    if (lastDayThisMonth == 0) {
        daysOfNextMonthToShow = 0;
    } else {
        daysOfNextMonthToShow = 7 - lastDayThisMonth;
    }


    let daysHtml = '';

    // Add days of the previous month
    for (let i = daysOfPreviousMonthToShow - 1; i >= 0; i--) { 
        let day = lastDatePrevMonth - i;
        daysHtml += `<div class="prev-date">${day}</div>`;
    }


    // Add days of the current month
    for (let i = 1; i <= lastDateThisMonth; i++) {
        
        let dateStr = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        let booking = bookings[dateStr];

        let calendarDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), i);
        let classes = [];

        // Check if the date is today
        if (todayDate.getDate() === calendarDate.getDate() && todayDate.getMonth() === calendarDate.getMonth() && todayDate.getFullYear() === calendarDate.getFullYear()) {
            classes.push('today');
        }

        // Check if the date is booked
        if (booking) {
            if (booking.morning && booking.evening) {
                classes.push('fully-booked'); // Full day booked
            } else if (booking.morning) {
                classes.push('morning-booked');
            } else if (booking.evening) {
                classes.push('evening-booked');
            }
        }

        daysHtml += `<div ${classes.length > 0 ? `class="${classes.join(' ')}"` : ''}>${i}</div>`;
    }

    // Add days of the next month
    for (let i = 1; i <= daysOfNextMonthToShow; i++) {
        daysHtml += `<div class="next-date">${i}</div>`;
    }

    monthDays.innerHTML = daysHtml;
}


// Event listeners for changing the month
document.querySelector('.prev-month').addEventListener('click', () => {
    monthDateObject.setMonth(monthDateObject.getMonth() - 1);
    renderCalendar(monthDateObject);
});

document.querySelector('.next-month').addEventListener('click', () => {
    monthDateObject.setMonth(monthDateObject.getMonth() + 1);
    renderCalendar(monthDateObject);
});


renderCalendar(monthDateObject);
