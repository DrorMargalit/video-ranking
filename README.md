# video-ranking
videoRanking


to run, in termial:

npm install

node server.js




make sure that you have node installed on your computer. 
You will need to upload your own videos to the "public" folder. Then change the videos array at the top of "script.js" accordingly

const videos = ["vid0.mp4", "vid1.mp4", "vid2.mp4", "vid3.mp4", "vid4.mp4"];



if you need to change the dimensions of the video, you can do so at the "video" element in the style.css file.
video {
    width: 640px; /* Fixed width */
    height: 360px; /* Fixed height */
    max-width: 100%; /* Ensures responsiveness */
    object-fit: cover; /* Adjust as needed to maintain aspect ratio */
}


