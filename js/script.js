document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.popup-btn').click(function(e) {
      document.querySelector('.popup-wrap').fadeIn(500);
      document.querySelector('.popup-box').removeClass('transform-out').addClass('transform-in');
  
      e.preventDefault();
    });
  
    document.querySelector('.popup-close').click(function(e) {
      document.querySelector('.popup-wrap').fadeOut(500);
      document.querySelector('.popup-box').removeClass('transform-in').addClass('transform-out');
  
      e.preventDefault();
    });
  });