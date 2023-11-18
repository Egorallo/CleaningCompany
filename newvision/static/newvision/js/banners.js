var bannerDataElements = document.querySelectorAll(".banner-data");
var currentBannerIndex = 0;
var rotationInterval = 3000;
var rotationTimer;

window.addEventListener('focus', function () {
    clearInterval(rotationTimer);
    rotateBanners();
});

window.addEventListener('blur', function () {
    clearInterval(rotationTimer);
});

function showBanner() {
    var bannerData = bannerDataElements[currentBannerIndex];
    var linkUrl = bannerData.getAttribute("data-link-url");
    var imageUrl = bannerData.getAttribute("data-image-url");

    document.getElementById("banner-link").href = linkUrl;
    document.getElementById("banner-image").src = imageUrl;
}

function rotateBanners() {
    showBanner();
    rotationTimer = setInterval(function () {
        currentBannerIndex = (currentBannerIndex + 1) % bannerDataElements.length;
        showBanner();
    }, rotationInterval);
}

function updateRotationInterval() {
    var newInterval = parseInt(document.getElementById("rotation-interval").value) * 1000;
    if (!isNaN(newInterval) && newInterval > 0) {
        rotationInterval = newInterval;
        clearInterval(rotationTimer);
        rotateBanners();
    }
}

rotateBanners();

document.getElementById("update-interval-button").addEventListener("click", updateRotationInterval);
