// Function to convert YouTube URL to an embeddable format
function convertToEmbedURL(url) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
    } else {
        return null;
    }
}

// Function to load videos for the selected section
function loadVideos() {
    const sectionSelect = document.getElementById('sectionSelect');
    const section = sectionSelect.value;

    // Map section name to service_id
    const sectionMapping = {
        depression: 1,
        relaxingMusic: 2,
        parentingSupport: 3,
        meditation: 4,
        stressManagement: 5,
        sleepBetter: 6,
        bookSummaries: 7,
        sharingExperiences: 8
    };

    // Fetch videos for the selected section
    fetch(`/videos?service_id=${sectionMapping[section]}`)
        .then(response => response.json())
        .then(videos => {
            const videoList = document.getElementById('videoList');
            videoList.innerHTML = ''; // Clear the current video list

            if (videos.length === 0) {
                videoList.innerHTML = '<p>No videos available for this section.</p>';
            }

            videos.forEach(video => {
                const videoHTML = `
                    <div class="video-item mb-3">
                        <iframe width="560" height="315" src="${video.video_url}" frameborder="0" allowfullscreen></iframe>
                    </div>
                `;
                videoList.insertAdjacentHTML('beforeend', videoHTML);
            });
        })
        .catch(error => console.error('Error fetching videos:', error));
}

// Load videos when the section is changed
document.getElementById('sectionSelect').addEventListener('change', loadVideos);

// Add video submission handler
document.getElementById('videoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get the selected section and video URL from the form
    const sectionSelect = document.getElementById('sectionSelect');
    const videoURL = document.getElementById('videoURL').value;
    const section = sectionSelect.value;

    // Validate that both section and URL are provided
    if (section === "" || videoURL === "") {
        alert('Please select a section and enter a valid video URL.');
        return;
    }

    // Convert the video URL to an embeddable format
    const embedURL = convertToEmbedURL(videoURL);
    if (!embedURL) {
        alert('Please enter a valid YouTube URL.');
        return;
    }

    // Map section name to service_id
    const sectionMapping = {
        depression: 1,
        relaxingMusic: 2,
        parentingSupport: 3,
        meditation: 4,
        stressManagement: 5,
        sleepBetter: 6,
        bookSummaries: 7,
        sharingExperiences: 8
    };

    // Prepare the video data
    const videoData = {
        service_id: sectionMapping[section],
        video_url: embedURL // Use the converted embed URL
    };

    // Send POST request to the server to add the video
    fetch('/add-video', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(videoData)
    })
        .then(response => response.text())
        .then(data => {
            alert('Video added successfully!');
            loadVideos(); // Reload the videos after adding one
        })
        .catch(error => console.error('Error adding video:', error));
});

// Call this function when the page loads to display videos
window.onload = loadVideos;
