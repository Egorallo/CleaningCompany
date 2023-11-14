document.addEventListener('DOMContentLoaded', function () {
    var startTime = sessionStorage.getItem('countdownStartTime');

    if (startTime) {
        startCountdown(new Date(startTime));
    } else {

        startCountdown(new Date());
    }
});

function startCountdown(startTime) {
    var countdownElement = document.getElementById('countdown');

    function updateCountdown() {
        var currentTime = new Date();
        var timeDifference = startTime.getTime() + 60 * 60 * 1000 - currentTime.getTime();

        if (timeDifference > 0) {
            var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            countdownElement.innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';
        } else {
            countdownElement.innerHTML = 'Countdown expired';
            sessionStorage.removeItem('countdownStartTime');
        }
    }

    setInterval(updateCountdown, 1000);

    sessionStorage.setItem('countdownStartTime', startTime);
}