// Get the current date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Define the URL to fetch the videos JSON from GitHub
const jsonURL = `https://raw.githubusercontent.com/santhoshriha/youtube-video-saver/main/videos-${today}.json`;

// Function to fetch the video data and display it
function fetchVideos() {
  // Clear the existing video list to prevent duplicates
  $('#video-list').empty();

  // Fetch the JSON file containing the list of videos
  $.getJSON(jsonURL, function(data) {
    // Check if data is available
    if (data && data.length > 0) {
      // Loop through each video object and create HTML elements to display the videos
      data.forEach(video => {
        $('#video-list').append(`
          <div class="video-item">
            <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail">
            <h3 class="video-title">${video.title}</h3>
            <a href="${video.url}" target="_blank" class="video-link">Watch Video</a>
          </div>
        `);
      });
    } else {
      // Show message if no videos found
      $('#video-list').append('<p>No videos found for today.</p>');
    }
  }).fail(function() {
    console.error('Error loading the JSON file');
    $('#video-list').append('<p>Failed to load video data.</p>');
  });
}

// Call fetchVideos on page load
$(document).ready(function() {
  fetchVideos();
});
