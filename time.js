
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Store the data in a variable
    window.data = data;
    // Initialize the timeframe
    let timeframe = 'weekly';
    // Function to update the hours
    function updateHours() {
      let sections = document.querySelectorAll('.work-section,.play-section,.study-section,.exercise-section,.social-section,.selfcare-section');
      sections.forEach(section => {
        let title = section.getAttribute('data-title').toLowerCase();
        let currentHour = section.querySelector('.current-Hour');
        let previousHour = section.querySelector('.previous-Hour');
        //we use the find() method to iterate through the window.data array and find the object that matches the title attribute. 
        let data = window.data.find(item => item.title.toLowerCase() === title.toLowerCase());
        if (data && data.timeframes[timeframe]) {
          currentHour.textContent = data.timeframes[timeframe].current;
          previousHour.textContent = data.timeframes[timeframe].previous;
        }else{
           console.error(`Missing data for ${title} ${timeframe}`);
        }
      });
    }
    // Update the hours 
     updateHours();
    // Add event listeners to the timeframe buttons
    let timeframeButtons = document.querySelectorAll('.timeframe-button');
    timeframeButtons.forEach(button => {
      button.addEventListener('click', event => {
        timeframe = event.target.getAttribute('data-timeframe');
        updateHours();
      });
    });
  })
  .catch(error => console.error('Error loading JSON data:', error));



