let timerInterval = null;
let elapsedSeconds = 0;

export function startTimer(displayCallback) {
    elapsedSeconds = 0;
    timerInterval = setInterval(() => {
        elapsedSeconds++;
        if (displayCallback) {
            displayCallback(elapsedSeconds);
        }
    }, 1000);
}

export function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    return elapsedSeconds;
}

export function resetTimer() {
    stopTimer();
    elapsedSeconds = 0;
}