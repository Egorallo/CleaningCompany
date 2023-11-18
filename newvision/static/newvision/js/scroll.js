const leftCleaning = document.querySelector('#left-cleaning');
const rightCleaning = document.querySelector('#right-cleaning');
const text = document.querySelector('#text');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const leftOffset = scrollY / 0.95;
    const rightOffset = scrollY / 0.95;

    leftCleaning.style.left = `calc(-640px + ${leftOffset}px)`;
    rightCleaning.style.right = `calc(-600px + ${rightOffset}px)`;

    const translateY = Math.max(0, scrollY - 100) * 1.1;
    const scale = 1 + Math.max(0, (scrollY - 200) / 500);

    text.style.opacity = translateY / 800;
    text.style.transform = `translateY(${translateY}px) scale(${scale})`;
})