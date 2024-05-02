function formatDate(inputDate) {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  // Convert the input string into a Date object
  const date = new Date(inputDate);

  // Extract the day, month, and date
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dateNum = date.getDate();

  // Determine the ordinal suffix
  let suffix;
  switch (dateNum) {
    case 1: case 21: case 31:
      suffix = "ST";
      break;
    case 2: case 22:
      suffix = "ND";
      break;
    case 3: case 23:
      suffix = "RD";
      break;
    default:
      suffix = "TH";
  }

  // Construct the formatted string
  return `${day}, ${month} ${dateNum}${suffix}`;
}

function addEvent(eventInfo) {
    console.log('Adding event to the page:', eventInfo);


    // if title has less then 1 thing, return
    if (eventInfo['Event Name'].title.length < 1) {
      return;
    }
    const getNestedValue = (obj, path, defaultValue = '') => {
      return path.reduce((acc, val) => acc && acc[val] ? acc[val] : defaultValue, obj);
    };
    
    const eventName = getNestedValue(eventInfo, ['Event Name', 'title', 0, 'plain_text']);
    //Event link is /Events/{eventName} but where spaces are swapped for -
    const eventLink = `/Events/${eventName.replace(/ /g, '-')}`;
    const eventImage = getNestedValue(eventInfo, ['Image URL', 'rich_text', 0, 'text', 'link', 'url']);
    const imageAltText = getNestedValue(eventInfo, ['ImageAltText', 'rich_text', 0, 'text', 'content']);
    const eventDescription = getNestedValue(eventInfo, ['Description', 'rich_text', 0, 'text', 'content']);
    const eventTime = getNestedValue(eventInfo, ['Time Range', 'rich_text', 0, 'text', 'content']);
    const eventDate = formatDate(getNestedValue(eventInfo, ['Date', 'date', 'start']));
    

    const eventContainer = document.querySelector('.events__container');
    
    const eventSection = document.createElement('section');
    eventSection.classList.add('event');
    


    eventSection.innerHTML = `
      <div class="event__photo">
          <a href="${eventLink}"><img src="${eventImage}" alt="${imageAltText}" width="320px" height="320px"></a>
      </div>
      <div class="event__info">
          <a href="${eventLink}"><h4 class="event__title">${eventName}</h4></a>
          <p class="event__description">
              ${eventDescription}
          </p>
          <div class="event-date">
              <p class="event__time | time">${eventTime}</p>
              <time class="event__day | time" datetime="${eventDate}">${eventDate}</time>
          </div>
      </div>
    `;


  
    eventContainer.appendChild(eventSection);
  }
  


async function fetchEvents() {
  try {
    // Get events from localhost:3000/activeEvents
    const response = await fetch(`http://localhost:3000/activeEvents`);

    return response.json();
  } catch (error) {
    console.error('Error:', error);
    return null; // In case of error, returns null
  }
}


document.addEventListener('DOMContentLoaded', function() {
  let fetchResult = fetchEvents();

  fetchResult.then((result) => {
    console.log(result.events);

    result.events.forEach((event) => {
      addEvent(event);
    });
  })
});