let lastScrollTop = 0; // To store the last scroll position
let scrollTimeout; // To track when scrolling stops

window.onscroll = function() {
    var button = document.getElementById("scrollTopBtn");
    var currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Show the button after scrolling 100vh
    if (currentScrollTop > window.innerHeight * 0.7) {
        button.style.display = "flex"; // Show the button
    

        // Check scroll direction
        if (currentScrollTop > lastScrollTop) {
            // User is scrolling down
            button.style.transform = "translateY(-20px)"; // Move the button down by 20px
        } else {
            // User is scrolling up
            button.style.transform = "translateY(20px)"; // Move the button up by 20px
        }

        // Clear any previous timeout to avoid multiple triggers
        clearTimeout(scrollTimeout);

        // Set a timeout to reset the button position when scrolling stops
        scrollTimeout = setTimeout(function() {
            button.style.transform = "translateY(0)"; // Return button to its original position
        }, 200); // Delay before returning the button to its original position
    } else {
        button.style.display = "none"; // Hide button if less than 100vh
    }

    lastScrollTop = currentScrollTop; // Update the last scroll position
};

// Function to scroll to the top with animation
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
