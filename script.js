document.addEventListener('DOMContentLoaded', function() {
    const slideContainer = document.querySelector('.slide-container');
    const slideImages = document.querySelector('.slide-images');
    const imageWrappers = slideImages.querySelectorAll('.image-wrapper');
  
    // Calculate the total width of all images plus gaps
    let totalWidth = 0;
    imageWrappers.forEach(wrapper => {
      totalWidth += wrapper.offsetWidth + 10; // 10px for the gap
    });
  
    // Clone the images and append them to create the infinite loop
    imageWrappers.forEach(wrapper => {
      const clone = wrapper.cloneNode(true);
      slideImages.appendChild(clone);
    });
  
    // Set the width of the slideImages to accommodate all images
    slideImages.style.width = `${totalWidth * 2}px`;
  
    // Create and apply the keyframe animation
    const keyframes = `
      @keyframes slide {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-${totalWidth}px);
        }
      }
    `;
  
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);
  
    // Apply the animation to the slideImages
    slideImages.style.animation = `slide ${totalWidth / 50}s linear infinite`;
  
    // Add click event listeners to all view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const wrapper = this.closest('.image-wrapper');
        
        // Add shake animation
        wrapper.classList.add('shake');
        
        // Remove shake animation after it completes
        setTimeout(() => {
          wrapper.classList.remove('shake');
          
          // Enlarge the image
          wrapper.classList.add('enlarged');
          
          // Reset the image size after 3 seconds
          setTimeout(() => {
            wrapper.classList.remove('enlarged');
          }, 3000);
        }, 500);
      });
    });
  });