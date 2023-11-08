document.addEventListener("DOMContentLoaded", function () {
    var bannerDataElements = document.querySelectorAll(".banner-data");
    var currentBannerIndex = 0;

    function showBanner() {
        var bannerData = bannerDataElements[currentBannerIndex];
        var linkUrl = bannerData.getAttribute("data-link-url");
        var imageUrl = bannerData.getAttribute("data-image-url");

        document.getElementById("banner-link").href = linkUrl;
        document.getElementById("banner-image").src = imageUrl;
    }

    function rotateBanners() {
        showBanner();
        setInterval(function () {
            currentBannerIndex = (currentBannerIndex + 1) % bannerDataElements.length;
            showBanner();
        }, 3000);
    }

    rotateBanners();
})
