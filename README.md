# Expo Camera takePictureAsync Error

This repository demonstrates a common error when using the Expo Camera API's `takePictureAsync` method before the camera has fully loaded.  The error is often cryptic, sometimes manifesting as an 'undefined is not a function' error.

The `bug.js` file shows the problematic code. The `bugSolution.js` file provides a solution using the `onCameraReady` event listener to ensure the camera is ready before taking a picture.

## How to Reproduce

1. Clone this repository.
2. Navigate to the project directory.
3. Run `expo start`.
4. Observe the error in the `bug.js` example and the working solution in `bugSolution.js`.