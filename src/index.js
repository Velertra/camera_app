/*  const video = document.getElementById('video');

    navigator.mediaDevices.getUserMedia({video: true})
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(error => {
            console.error('Error accessing webcam:', error);
        });


    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    function captureFrame() {

        context.drawImage(video, 0, 0, canvas.width, canvas.height);


        //requestAnimationFrame(captureFrame)
    }

    requestAnimationFrame(captureFrame);
 */

    const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Load the TensorFlow Face Landmark Detection model
const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
const detectorConfig = {
  runtime: 'mediapipe', // or 'tfjs'
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
};

// Create the face landmark detector
const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);

// Function to detect face landmarks in a video frame
async function detectFaceLandmarksInFrame() {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Get the current video frame from the canvas
  const frame = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);

  // Detect face landmarks in the frame
  const faces = await detector.estimateFaces(frame);

  // Process each detected face
  faces.forEach((face, i) => {
    const { box, keypoints } = face;

    // Analyze the face keypoints to detect glasses
    // ...

    // Visualize the results on the frame
    // ...
  });

  // Continue capturing and processing frames recursively
  requestAnimationFrame(detectFaceLandmarksInFrame);
}

// Start capturing video frames
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    requestAnimationFrame(detectFaceLandmarksInFrame);
  })
  .catch(error => {
    console.error('Error accessing webcam:', error);
  });
