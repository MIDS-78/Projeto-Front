function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration; // reinicia quando acabar
        }
    }, 1000);
}

window.onload = function () {
    let thirtyMinutes = 30 * 60,
        display = document.querySelector('#timer');
    startTimer(thirtyMinutes, display);
};