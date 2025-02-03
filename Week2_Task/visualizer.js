
// Initialize necessary variables
const canvas = document.getElementById('visualizerCanvas');
const ctx = canvas.getContext('2d');
const fileInput = document.getElementById('fileInput');
const playPauseButton = document.getElementById('playPauseButton');
const volumeControl = document.getElementById('volumeControl');
const audioElement = new Audio();
let audioContext, analyser, bufferLength, dataArray;

// Set up canvas size
canvas.width = window.innerWidth;
canvas.height = 400;

// Function to set up the audio context and visualizer
function setupAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256; // Adjust the FFT size for better frequency detail
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    // Create a MediaElementSource for the audio element and connect it to the analyser
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    // Handle volume control
    audioElement.volume = volumeControl.value;

    // Set up the play/pause button
    playPauseButton.addEventListener('click', togglePlayPause);
    volumeControl.addEventListener('input', updateVolume);
}

// Toggle play and pause state
function togglePlayPause() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    if (audioElement.paused) {
        audioElement.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audioElement.pause();
        playPauseButton.textContent = 'Play';
    }
}

// Update the volume based on user input
function updateVolume() {
    audioElement.volume = volumeControl.value;
}

// Handle file input and load the selected audio
fileInput.addEventListener('change', event => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        audioElement.src = fileURL;
        setupAudio();
    }
});

// Visualizer: Draw the frequency data on the canvas
function draw() {
    requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    // Clear the canvas for each new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the frequency data
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        ctx.fillStyle = `rgb(234, 80, 172)`;
        ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);

        x += barWidth + 1;
    }
}

// Start the visualizer after audio is loaded
audioElement.addEventListener('canplaythrough', () => {
    draw();
});
