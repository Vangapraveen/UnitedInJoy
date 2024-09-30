const inappropriateKeywords = ['sex', 'violence', 'murder', 'blood', 'drugs'];
const isAdmin = true; // Set to true if the user is an admin

function addVideo() {
    const videoUrl = document.getElementById("videoUrl").value;
    const videoTitle = document.getElementById("videoTitle").value;

    if (videoUrl && videoTitle) {
        if (!isInappropriateContent(videoTitle)) {
            const videoId = getVideoId(videoUrl);
            if (videoId) {
                const videoContainer = document.getElementById("videoContainer");
                const card = document.createElement("div");
                card.className = "card col-md-4 m-2";
                card.innerHTML = `
                    <iframe width="300" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                    ${isAdmin ? `<button class="btn btn-danger" onclick="removeVideo(this)">Remove Video</button>` : ''}
                `;
                videoContainer.appendChild(card);
                clearInputs();
            } else {
                alert("Invalid video URL. Please enter a valid YouTube URL.");
            }
        } else {
            alert("The video contains inappropriate content.");
        }
    } else {
        alert("Please enter a video URL and title.");
    }
}

function isInappropriateContent(title) {
    return inappropriateKeywords.some(keyword => title.toLowerCase().includes(keyword));
}

function getVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}

function removeVideo(button) {
    const card = button.parentElement;
    card.remove();
}

function clearInputs() {
    document.getElementById("videoUrl").value = "";
    document.getElementById("videoTitle").value = "";
}
