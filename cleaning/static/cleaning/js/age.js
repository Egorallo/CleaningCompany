document.addEventListener('DOMContentLoaded', function () {

    if (!localStorage.getItem('ageConfirmed')) {
        showAgeModal();
    }
});

function showAgeModal() {
    document.body.classList.add('modal-open');
    document.getElementById('ageModal').style.display = 'flex';
}

function hideAgeModal() {
    document.body.classList.remove('modal-open');
    document.getElementById('ageModal').style.display = 'none';
}

function checkAge() {

    const birthdate = document.getElementById('birthdate').value;

    const {age, dayOfWeek} = calculateAgeAndDayOfWeek(birthdate);

    if (age >= 18) {
        alert(`You're ${age} yo. Day of the week you were born on: ${dayOfWeek}`);
        localStorage.setItem('ageConfirmed', 'true');
        hideAgeModal();

    } else {
        alert("Usage requires parental permission.");
    }
}

function calculateAgeAndDayOfWeek(birthdate) {
    const today = new Date();
    const birthdateDate = new Date(birthdate);
    let age = today.getFullYear() - birthdateDate.getFullYear();
    const monthDiff = today.getMonth() - birthdateDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateDate.getDate())) {
        age--;
    }

    const dayOfWeek = getDayOfWeek(birthdateDate.getDay());

    return {age, dayOfWeek};
}

function getDayOfWeek(dayIndex) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[dayIndex];
}