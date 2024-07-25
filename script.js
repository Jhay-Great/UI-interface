document.addEventListener('DOMContentLoaded', function() {
    const slideContainer = document.querySelector('.slide-container');
    const slideImages = document.querySelector('.slide-images');
    const imageWrappers = slideImages.querySelectorAll('.image-wrapper');
  
   
    let totalWidth = 0;
    imageWrappers.forEach(wrapper => {
      totalWidth += wrapper.offsetWidth + 10;  
    });
  
    
    imageWrappers.forEach(wrapper => {
      const clone = wrapper.cloneNode(true);
      slideImages.appendChild(clone);
    });
  
    
    slideImages.style.width = `${totalWidth * 2}px`;
  
    
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
  
    
    slideImages.style.animation = `slide ${totalWidth / 50}s linear infinite`;
  

    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const wrapper = this.closest('.image-wrapper');
        
 
        wrapper.classList.add('shake');
        
       
        setTimeout(() => {
          wrapper.classList.remove('shake');
          
        
          wrapper.classList.add('enlarged');
          
          
          setTimeout(() => {
            wrapper.classList.remove('enlarged');
          }, 3000);
        }, 500);
      });
    });
  });