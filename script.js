$(document).ready(function() {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];  // e.g., "2025-05-06"

  // Use this date in your URL to dynamically reference the JSON file
  const jsonURL = `https://raw.githubusercontent.com/santhoshriha/youtube-video-saver/main/videos-${today}.json`;

  // Fetch the JSON data
  $.getJSON(jsonURL, function(data) {
    console.log(data); // You can use this data to display videos
    // Now process the data to show videos on the page, for example:
    data.forEach(video => {
      $('#video-list').append(`
        <div class="video-item">
          <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail">
          <h3>${video.title}</h3>
          <a href="${video.url}" target="_blank">Watch Video</a>
        </div>
      `);
    });
  }).fail(function() {
    console.error('Error loading the JSON file');
  });
});


    // Click handler
    $('#video-container').on('click', 'div[data-id]', function () {
      const vid = $(this).data('id');
      const title = $(this).data('title');
      const thumb = $(this).data('thumb');

      $('#modal-title').text(title);
      $('#modal-thumb').attr('src', thumb);
      $('#play-btn').data('id', vid);
      $('#video-modal').removeClass('hidden');
    });

    // Play button
    $('#play-btn').on('click', function () {
      const id = $(this).data('id');
      window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
    });

    // Close modal
    $('#close-modal').on('click', function () {
      $('#video-modal').addClass('hidden');
    });
  }).fail(() => {
    $('#video-container').html('<p class="text-center text-red-500">Failed to load videos.</p>');
  });
});
