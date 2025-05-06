const today = new Date().toISOString().slice(0, 10);
const jsonUrl = 'https://raw.githubusercontent.com/santhoshriha/youtube-video-saver/main/videos-2025-05-06.json';


$(document).ready(() => {
  $.getJSON(jsonURL, function (videos) {
    videos.slice(0, 10).forEach(video => {
      $('#video-container').append(`
        <div class="bg-white rounded shadow p-2 cursor-pointer" data-id="${video.videoId}" data-title="${video.title}" data-thumb="${video.thumbnail}">
          <img src="${video.thumbnail}" class="w-full rounded mb-2">
          <h3 class="text-lg font-semibold">${video.title}</h3>
          <p class="text-sm text-gray-500">${video.channel}</p>
        </div>
      `);
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
