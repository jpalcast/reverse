// JavaScript code to handle interactions and animation

// Get a reference to the textarea element
const editorTextarea = document.getElementById('editor');

// Initialize the CodeMirror editor
const codeEditor = CodeMirror.fromTextArea(editorTextarea, {
	mode: 'javascript', // You can change this to the apropiate language mode
	lineNumbers: true,  // Show line numbers
	theme: 'default'    // Change the theme as needed
});

// Set an initial code content if desired
codeEditor.setValue('function animate() {\n // Your animation code here\n}');

// JavaScript code to control the preview animation
const preview = document.getElementById('preview');
       
// Function to change the background color of the preview element
function changeColor() {
    preview.style.backgroundColor = '#e74c3c';
}

// Function to reset the background color
function resetColor() {
    preview.style.backgroundColor = '#4398db';
}

// Add a click event listener to the preview element
preview.addEventListener('click', () => {
    changeColor();

    // Reset the color after a delay
    setTimeout(() => {
    resetColor();
    }, 1000); // 1000 milliseconds (1 second)
});

// Declare canvas and ctx on the global scope
const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d'); // Get a 2D rendering context

// Function to initialize the canvas
function initCanvas() {
    // Set canvas dimensions (256x224 pixels)
    canvas.width = 256;
    canvas.height = 224;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Call the canvas initialization function when the page loads
window.onload = function () {
    initCanvas();
};

// Get a reference to the "Play" button
const playButton = document.querySelector('.transport-button.play');

// Add a click event listener to the "Play" button
playButton.addEventListener('click', () => {
    // Get the code from the code editor
    const code = codeEditor.getValue();

    //Execute the code on the canvas (you'll need to implement this logic)
    executeCodeOnCanvas(code);
});

// Function to execute code on the canvas
function executeCodeOnCanvas(code) {
    try {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Log a message to verify code execution
        console.log('Code execution started');

        // Execute the user-provided code on the canvas
        eval(code); // Use eval() to execute the code

        // Log a message when code execution is complete
        console.log('Code execution completed');

    } catch (error) {
        // Handle errors and log them (e.g., display an error message)
        console.error('Error executing code:', error);
    }
}

// Define an array to store code for each frame
const frameCode = []

// Get references to elements
const timeline = document.getElementById('timeline');
const reel = document.getElementById('film-reel')
const frames = document.querySelectorAll('.frame');
const executeButton = document.getElementById('execute-timeline');
const createFrameButton = document.getElementById('create-frame');

// Event listener for frame clicks
frames.forEach((frame, index) => {
    frame.addEventListener('click', (e) => {
        const frameIndex = Array.from(reel.children).indexOf(e.target);

        if (frameIndex !== -1) {
			// Load the code for the clicked frame into the code editor
            codeEditor.value = frameCode[frameIndex];
        }
    });
});

// Event listener for "Execute Timeline" button
executeButton.addEventListener('click', () => {
    // Execute the timeline frame by frame
    frameCode.forEach((code) => {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Execute the code on the canvas
        eval(code);
    });
});

// Event listener for "Create New Frame" button
createFrameButton.addEventListener('click', () => {
    // Add an empty frame to the film reel
    const newFrame = document.createElement('div');
    newFrame.classList.add('frame');
    frames.appendChild(newFrame);

    // Add an empty code entry to the frameCode array
    frameCode.push('');
});