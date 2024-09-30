<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the YouTube URL from the form submission
    $youtube_url = filter_var($_POST['youtube_url'], FILTER_SANITIZE_URL);

    // Validate the URL (you can add more robust validation as needed)
    if (filter_var($youtube_url, FILTER_VALIDATE_URL) && strpos($youtube_url, 'youtube.com') !== false) {
        // Save the URL to the database or process it as needed
        // For demonstration, we'll just echo the URL
        echo "YouTube URL submitted: " . htmlspecialchars($youtube_url);
    } else {
        echo "Invalid YouTube URL. Please submit a valid URL.";
    }
} else {
    echo "Invalid request method.";
}
?>
