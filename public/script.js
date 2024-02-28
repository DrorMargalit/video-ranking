const videos = ["vid0.mp4", "vid1.mp4", "vid2.mp4", "vid3.mp4", "vid4.mp4"];
let currentVideo = 0; // This will be updated on DOMContentLoaded
const feedback = [];

document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default action to avoid submitting a form, if any
        document.getElementById("nextBtn").click(); // Programmatically click the "Next" button
    }
});

document.getElementById("nextBtn").addEventListener("click", async function(event) {
    event.preventDefault(); // Prevent default form submission
    
    saveFeedback();
    
    let nextVideoIndex = getRandomVideoIndex();
    
    await sendDataToServer(videos[currentVideo], feedback[currentVideo]);
    
    currentVideo = nextVideoIndex;
    updateVideo();
    console.log("Now playing:", videos[currentVideo]);

    if (feedback.length === videos.length) {
        document.getElementById("nextBtn").textContent = "Submit";
    }
});

function updateVideo() {
    const player = document.getElementById("videoPlayer");
    player.src = videos[currentVideo];
    player.load();
    document.getElementById("userInput").value = feedback[currentVideo] || "";
}

function saveFeedback() {
    const input = document.getElementById("userInput").value;
    feedback[currentVideo] = input;
    console.log(currentVideo, input);
}

// Function to get a random video index different from the current video
function getRandomVideoIndex() {
    let nextVideoIndex;
    do {
        nextVideoIndex = Math.floor(Math.random() * videos.length);
    } while (videos.length > 1 && nextVideoIndex === currentVideo);
    return nextVideoIndex;
}

document.addEventListener('DOMContentLoaded', () => {
    currentVideo = getRandomVideoIndex(); // Set a random video on page load
    updateVideo();
});


async function sendDataToServer(currentVideo, currentFeedback) {
    const dataToSend = {
        video: currentVideo,
        feedback: currentFeedback
    };

    try {
        const response = await fetch('http://localhost:3000/submit-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        const data = await response.json();
        console.log('Success:', data);
        return data; // Return data for further processing if needed
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw to handle it in the calling context if necessary
    }
}
