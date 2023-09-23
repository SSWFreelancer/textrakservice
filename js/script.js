document.addEventListener('DOMContentLoaded', function(event) {
	function handleScroll() {
    var scroll = window.pageYOffset || document.documentElement.scrollTop;
    var header = document.querySelector('.header');
    if (scroll > 1) {
      header.classList.add('show');
    } else {
      header.classList.remove('show');
    }
	}
	handleScroll();
	window.addEventListener('scroll', handleScroll);

  var headerBurger = document.querySelector('.bottom-header__burger');
  var menu = document.querySelector('.menu');
  var body = document.querySelector('body');
	headerBurger.addEventListener('click', function(event) {
	    headerBurger.classList.toggle('active');
	    menu.classList.toggle('active');
	    body.classList.toggle('lock');
	});
	var menuLinks = document.querySelectorAll('.menu__link, [data-topopup]');
	menuLinks.forEach(function(link) {
	    link.addEventListener('click', function(event) {
	        headerBurger.classList.remove('active');
	        menu.classList.remove('active');
	        body.classList.remove('lock');
	    });
	});

  const sendButton = document.querySelectorAll("[data-topopup]");
  if(sendButton){
	  sendButton.forEach(function (sendButton) {
	    sendButton.addEventListener("click", function (event) {
	    	event.preventDefault();
			  var popupVal = this.closest(".popup.open");
			  if (popupVal) {
			    var requiredElements = popupVal.querySelectorAll("[required]");
			    var allValid = true;
			    requiredElements.forEach(function(element) {
			      if (!validateElement(element)) {
			        allValid = false;
			      }
			    });
			    if (allValid) {
			    	if(document.querySelector(".popup.open")){
			    		document.querySelector(".popup.open").classList.remove('open');
			    		body.classList.remove('popuplock');	
			    	}
			      const dataPopup = this.getAttribute("data-topopup");
			      const dataClassPopup = document.querySelector(`${dataPopup}`);
			      if (dataClassPopup !== null) {
			        dataClassPopup.classList.add("open");
			        body.classList.add('popuplock');	
			      }
			    }
			  }else{
		      const dataPopup = this.getAttribute("data-topopup");
		      const dataClassPopup = document.querySelector(`${dataPopup}`);
		      if (dataClassPopup !== null) {
		        dataClassPopup.classList.add("open");
		        body.classList.add('popuplock');	
		      }
			  }
	    });
	  });  	
  }
	var popupClose = document.querySelectorAll('.popup__close');
	if(popupClose){
		popupClose.forEach(function(popupClose) {
		    popupClose.addEventListener('click', function(event) {
		    		var body = document.querySelector('body');
		    		body.classList.remove('popuplock');	
		    		popupClose.closest('.popup').classList.remove('open');

		    });
		});		
	}
	function validateElement(element) {
	  var elementType = element.getAttribute("type");
	  if (elementType === "text" || elementType === "tel") {
	    if (element.value.trim() === "") {
	    	if(!element.closest('.popup').querySelector('p.error')){
	    		element.previousElementSibling.classList.add('error');
	    		element.focus();
					setTimeout(function() {
					  element.previousElementSibling.classList.remove('error');
					}, 1500); 	
				}
	      return false;

	    }
	  } else if (elementType === "email") {
	    var emailPattern = /^\S+@\S+\.\S+$/;
	    if (!emailPattern.test(element.value)) {
	    	if(!element.closest('.popup').querySelector('p.error')){
	    		element.previousElementSibling.classList.add('error');
	    		element.focus();
					setTimeout(function() {
					  element.previousElementSibling.classList.remove('error');
					}, 1500); 	 
				} 
	      return false;
	    }
	  }
	  element.classList.remove('error');
	  return true;
	}
  if(document.querySelector('.main-swiper')){
      new Swiper('.main-swiper', {
        speed: 600,
        spaceBetween: 15,
        slidesPerView: 1,
        autoplay:true,
        loop:true,
		    pagination: {
		      el: '.main-pagination',
		      clickable:true,
		    },
      });
  }
	const gallerySwipers = document.querySelectorAll('.gallery__swiper .swiper-wrapper');
	if(gallerySwipers){
		gallerySwipers.forEach(gallerySwiper => {
		  const clonedChildren = Array.from(gallerySwiper.children).map(child => child.cloneNode(true));
		    clonedChildren.forEach(clonedChild => {
		    gallerySwiper.appendChild(clonedChild);
		  });
		});		
	}
  if(document.querySelector('.gallery__swiper')){
    new Swiper('.gallery__swiper', {
      speed: 600,
      spaceBetween: 20,
      slidesPerView: 4,
      loop:true,
		  navigation: {
		    nextEl: '.gallery__arrow-right',
		    prevEl: '.gallery__arrow-left',
		  },
	    breakpoints: {
	        992: {
	            slidesPerView: 4,
	        },
	        881: {
	            slidesPerView: 3,
	        },

	        600: {
	        	spaceBetween: 23,
	          slidesPerView: 3.2,
	        },
	        0: {
	        	spaceBetween: 23,
	          slidesPerView: 1.5
	        }		        
	    }
    });
  }   
	var inputMask = document.querySelectorAll("input[type='tel']");
	var maskOptions = {
	  mask: '+{7} (000) 000-00-00'
	};
	if(inputMask){
		inputMask.forEach(function(inputMask) {
		    var mask = IMask(inputMask, maskOptions);
		});		
	}
});

