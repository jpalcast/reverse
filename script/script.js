// JavaScript code to handle interactions and animation

// Function to initialize the CodeMirror editor
function initializeCodeEditor() {
    const editorTextarea = document.getElementById('editor');
    const codeEditor = CodeMirror.fromTextArea(editorTextarea, {
        mode: 'javascript', // You can change this to the appropriate language mode
        lineNumbers: true,  // Show line numbers
        theme: 'default'    // Change the theme as needed
    });
    codeEditor.setValue(frameCode[currentFrameIndex]);
    return codeEditor;
}

// Function to initialize the canvas
function initializeCanvas() {
    const canvas = document.getElementById('animation-canvas');
    const ctx = canvas.getContext('2d'); // Get a 2D rendering context

    // Set canvas dimensions (256x224 pixels)
    canvas.width = 256;
    canvas.height = 224;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return ctx;
}

// Function to attach event listeners to frame elements
function attachFrameEventListeners(frameCode, codeEditor, ctx) {
    const frames = document.querySelectorAll('.frame');
    frames.forEach((frame, index) => {
        frame.addEventListener('click', () => {
            codeEditor.setValue(frameCode[index]);
        });
    });
}

// Function to execute code on the canvas
function executeCodeOnCanvas(code, ctx) {
    try {
        // Clear the canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Log a message to verify code execution
        console.log('Code execution started');

        // Execute the user-provided code on the canvas
        eval(code); // Use eval() to execute the code

        // Log a message when code execution is complete
        console.log('Code execution completed');
		console.log(currentFrameIndex);
    } catch (error) {
        // Handle errors and log them (e.g., display an error message)
        console.error('Error executing code:', error);
    }
}

// Function to set up the application on page load
function initializeApp() {
    const codeEditor = initializeCodeEditor();
    const ctx = initializeCanvas();
    
    const playButton = document.querySelector('.transport-button.play');
    playButton.addEventListener('click', () => {
        const code = codeEditor.getValue();
        executeCodeOnCanvas(code, ctx);
    });

    // Additional setup can go here

    // Example: Attach event listeners to frame elements
	attachFrameEventListeners(frameCode, codeEditor, ctx);
}

// Define an array to store frame codes
const frameCode = [
	'ctx.fillStyle = "red";\nctx.fillRect(30, 30, 50, 50);',
	'ctx.fillStyle = "blue";\nctx.fillRect(40, 40, 50, 50);',
	'ctx.fillStyle = "black";\nctx.fillRect(50, 50, 50, 50);',
	];
let currentFrameIndex = 0; // Index of the currently selected frame

// Function to save the code from the editor to the selected frame
function saveFrame() {
    const code = codeEditor.getValue();
    frameCode[currentFrameIndex] = code;
}

// Function to select a frame and update the code editor
function selectFrame(frameIndex) {
    // Remove the 'selected' class from all frames
    const frames = document.querySelectorAll('.frame');
    frames.forEach((frame) => {
        frame.classList.remove('selected');
    });

    // Add the 'selected' class to the currently selected frame
    const selectedFrame = frames[frameIndex];
    selectedFrame.classList.add('selected');

	// Update the code editor with the code of the selected frame
    if (frameCode[frameIndex] !== undefined) {
        codeEditor.setValue(frameCode[frameIndex]);
        currentFrameIndex = frameIndex;
    }
}

// Function to add a new frame
const reel = document.getElementById('film-reel');
function addFrame() {
    const newFrame = document.createElement('div');
    newFrame.classList.add('frame');
    reel.appendChild(newFrame);
    frameCode.push('');
    selectFrame(frameCode.length - 1); // Select the newly added frame
}

// Function to delete the currently selected frame
function deleteFrame() {
    if (frameCode.length > 1) {
        frameCode.splice(currentFrameIndex, 1);
        const frames = document.querySelectorAll('.frame');
        frames[currentFrameIndex].remove();
        if (currentFrameIndex >= frameCode.length) {
            currentFrameIndex = frameCode.length - 1;
        }
        selectFrame(currentFrameIndex);
    }
}

// Event listener for "Save Frame" button
const saveFrameButton = document.getElementById('save-frame');
saveFrameButton.addEventListener('click', () => {
    saveFrame();
});

// Event listener for frame clicks
const frames = document.querySelectorAll('.frame');
frames.forEach((frame, index) => {
    frame.addEventListener('click', () => {
        selectFrame(index);
    });
});

// Event listener for "Add Frame" button
const addFrameButton = document.getElementById('add-frame');
addFrameButton.addEventListener('click', () => {
    addFrame();
});

// Event listener for "Delete Frame" button
const deleteFrameButton = document.getElementById('delete-frame');
deleteFrameButton.addEventListener('click', () => {
    deleteFrame();
});

// Function to save the complete timeline
function saveTimeline() {
    const timelineData = {
        frameCode: frameCode,
        currentFrameIndex: currentFrameIndex,
    };
    const timelineJSON = JSON.stringify(timelineData);
    // Use a file-saving method (e.g., File API or server-side) to save the JSON data.
}

// Event listener for "Save Timeline" button
const saveTimelineButton = document.getElementById('save-timeline');
saveTimelineButton.addEventListener('click', () => {
    saveTimeline();
});

// Function to load the complete timeline
function loadTimeline(timelineData) {
    frameCode.length = 0;
    frameCode.push(...timelineData.frameCode);
    selectFrame(timelineData.currentFrameIndex);
}

// Event listener for "Load Timeline" button
const loadTimelineButton = document.getElementById('load-timeline');
loadTimelineButton.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const timelineJSON = event.target.result;
            const timelineData = JSON.parse(timelineJSON);
            loadTimeline(timelineData);
        };
        reader.readAsText(file);
    }
});

// Call the setup functions on window.onload
window.onload = function () {
    initializeApp();
};
