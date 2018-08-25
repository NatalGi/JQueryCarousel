"use strict";

$(function() {
	var carouselList = $('#carousel .slider');
	var carouselImgList = $('#carousel .slider li');
	var controls = $('#controls');
	var activeImgNumber = 1;
	setInterval(nextSlide, 3000);

	function updateActiveImgNumber(value) {
		if((value == -1) && (activeImgNumber == 1)) {
			activeImgNumber = carouselImgList.length;
		}
		else if((value == 1) && (activeImgNumber == carouselImgList.length)) {
			activeImgNumber = 1;
		}
		else {
			activeImgNumber += value;
		}
	}

	function nextSlide(speed = 500) {
		var firstDot = controls.find('.dot:first');
		var lastDot = controls.find('.dot:last');
		firstDot.before(lastDot);
		
		carouselList.animate({'margin-left': -400}, speed, moveFirstSlide);
		updateActiveImgNumber(1);
	};

	function prevSlide(speed) {	
		var firstDot = controls.find('.dot:first');
		var lastDot = controls.find('.dot:last');
		lastDot.after(firstDot);

		var firstItem = carouselList.find('li:first');
		var lastItem = carouselList.find('li:last');
		firstItem.before(lastItem);
		carouselList.css('margin-left', -400);	
		carouselList.animate({'margin-left': 0}, speed);
		updateActiveImgNumber(-1);
	};

	function moveFirstSlide() {
		var firstItem = carouselList.find('li:first');
		var lastItem = carouselList.find('li:last');
		lastItem.after(firstItem);
		carouselList.css('margin-left', 0);		
	};

	$('#carousel').mouseover(function(event) {
		$('#carousel .move').css('opacity', 1);
	});

	$('#carousel').mouseout(function(event) {
		$('#carousel .move').css('opacity', 0);
	});

	$('#carousel .move-right').click(function(event) {
		nextSlide();
	})

	$('#carousel .move-left').click(function(event) {
		prevSlide();
	})

	$('#controls').on('click', '.dot', function() {
		var dotNumber = $(this).index() + 1;
		if(activeImgNumber != dotNumber) {
			var requestedSlide = 0;
			while(!requestedSlide) {
				if(dotNumber > activeImgNumber) {
					nextSlide(100);
					if(activeImgNumber == dotNumber){
						requestedSlide = 1;
					} 
				}
				else {
					prevSlide(100);
					if(activeImgNumber == dotNumber){
						requestedSlide = 1;
					} 
				}					
			}
		}
	});
});