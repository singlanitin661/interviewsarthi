function reloadSite(){
  location.reload();
}
// Accessing the camera and starting the video stream
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (stream) {
    var video = document.getElementById("videoElement");
    video.srcObject = stream;
  })
  .catch(function (error) {
    console.error("Error accessing the camera: ", error);
  });

// Getting the timer element
const timerElement = document.getElementById("timer");

// Function to update the timer
function updateTimer() {
  const currentTime = timerElement.textContent;
  const timeArray = currentTime.split(":");
  let minutes = parseInt(timeArray[0]);
  let seconds = parseInt(timeArray[1]);

  seconds++; // Increase the seconds by 1
  if (seconds >= 60) {
    // If seconds reach 60, reset seconds and increase minutes
    seconds = 0;
    minutes++;
  }

  // Format the minutes and seconds with leading zeros
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  // Update the timer display
  timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// Update the timer every second (1000 milliseconds)
setInterval(updateTimer, 1000);

const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");

// Define an array of questions
const questions = [
  "Tell me about yourself?",
  "Why do you want to work for our company?",
  "What are your greatest strengths and weaknesses?",
];

let currentQuestionIndex = 0;

// Function to display the chat messages
function displayChatMessage(sender, message) {
  const chatMessage =
    '<div class="answerDiv"> <span class="' +
    sender +
    '"> ' +
    message +
    "</span></div>";
  chatMessages.innerHTML += chatMessage;
}

// Function to display the next question
function displayNextQuestion() {
  const element = document.querySelector(".current-count");
  element.innerHTML = currentQuestionIndex + 1;
  const userAnswer = userInput.value;
  displayChatMessage("User", userAnswer);
  userInput.value = "";

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setTimeout(() => {
      displayChatMessage("Bot", questions[currentQuestionIndex]);
    }, 500);
  } else {
    displaySubmissionMessage();
  }
}
function displaySubmissionMessage() {
  const submissionMessage =
    '<p class="submission-message">Your submission succeeded!</p>';
  chatMessages.innerHTML += submissionMessage;
  userInput.style.display = "none";
  submitBtn.style.display = "none";
}

// Event listener for the submit button
submitBtn.addEventListener("click", displayNextQuestion);

// Start the conversation by displaying the first question
displayChatMessage("Bot", questions[currentQuestionIndex]);
