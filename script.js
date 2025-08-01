const videos = [
  "public/video1.mp4",
  "public/video2.mp4",
  "public/video3.mp4"
];

let currentIndex = 0;
const bgVideo = document.getElementById("bgVideo");

function playNextVideo() {
  bgVideo.src = videos[currentIndex];
  bgVideo.load();
  bgVideo.play();
  currentIndex = (currentIndex + 1) % videos.length;
}

bgVideo.addEventListener("ended", playNextVideo);
playNextVideo();
