let isWorking = true;
let isRunning = false;
let workTime = 25 * 60;  // Default 25 minutes in seconds
let restTime = 5 * 60;   // Default 5 minutes in seconds
let timeLeft = workTime;
let timerInterval;

// Update the clock display
function updateClockDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('clock').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Toggle between work and rest phases
function switchPhase() {
    if (isWorking) {
        isWorking = false;
        timeLeft = restTime;  // Switch to rest time
        document.getElementById('clock').style.backgroundColor = '#32CD32';  // Green for rest
    } else {
        isWorking = true;
        timeLeft = workTime;  // Switch to work time
        document.getElementById('clock').style.backgroundColor = '#FF6347';  // Red for work
    }
    updateClockDisplay();
}

// Start or stop the timer
function startStopTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        document.getElementById('startStopBtn').textContent = 'Start';
        document.getElementById('resetBtn').disabled = false;
    } else {
        timerInterval = setInterval(function() {
            if (timeLeft > 0) {
                timeLeft--;
                updateClockDisplay();
            } else {
                switchPhase();  // Switch phases when time is up
            }
        }, 1000);
        isRunning = true;
        document.getElementById('startStopBtn').textContent = 'Pause';
        document.getElementById('resetBtn').disabled = false;
    }
}

// Reset the timer to initial settings
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = workTime;
    updateClockDisplay();
    document.getElementById('startStopBtn').textContent = 'Start';
    document.getElementById('resetBtn').disabled = true;
    document.getElementById('clock').style.backgroundColor = '#FF6347';  // Red for work
}

// Set a new work time (in minutes)
function setWorkTime() {
    const newWorkTime = prompt('Enter work time in minutes:', workTime / 60);
    if (newWorkTime !== null && !isNaN(newWorkTime) && newWorkTime > 0) {
        workTime = newWorkTime * 60;
        if (isWorking) {
            timeLeft = workTime;
            updateClockDisplay();
        }
    }
}

// Set a new rest time (in minutes)
function setRestTime() {
    const newRestTime = prompt('Enter rest time in minutes:', restTime / 60);
    if (newRestTime !== null && !isNaN(newRestTime) && newRestTime > 0) {
        restTime = newRestTime * 60;
        if (!isWorking) {
            timeLeft = restTime;
            updateClockDisplay();
        }
    }
}

// Event Listeners
document.getElementById('startStopBtn').addEventListener('click', startStopTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('setWorkBtn').addEventListener('click', setWorkTime);
document.getElementById('setRestBtn').addEventListener('click', setRestTime);

// Initialize clock display
updateClockDisplay();
