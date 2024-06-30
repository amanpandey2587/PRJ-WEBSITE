
        const slides = document.querySelector('.slides');
        const slide = document.querySelectorAll('.slide');
        let index = 1;  // Start from the first actual slide
        let isTransitioning = false;

        function updateSlidePosition() {
            slides.style.transition = 'transform 0.5s ease-in-out';
            slides.style.transform = `translateX(-${index * 20}%)`;
        }

        function moveToNextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            index++;
            updateSlidePosition();
        }

        function moveToPrevSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            index--;
            updateSlidePosition();
        }

        document.getElementById('next').addEventListener('click', () => {
            clearInterval(autoSlideInterval);  // Clear the interval on manual navigation
            moveToNextSlide();
            autoSlideInterval = setInterval(moveToNextSlide, 6000);  // Restart the interval
        });

        document.getElementById('prev').addEventListener('click', () => {
            clearInterval(autoSlideInterval);  // Clear the interval on manual navigation
            moveToPrevSlide();
            autoSlideInterval = setInterval(moveToNextSlide, 6000);  // Restart the interval
        });

        slides.addEventListener('transitionend', () => {
            isTransitioning = false;
            if (index === 0) {
                slides.style.transition = 'none';
                index = slide.length - 2;
                slides.style.transform = `translateX(-${index * 20}%)`;
            } else if (index === slide.length - 1) {
                slides.style.transition = 'none';
                index = 1;
                slides.style.transform = `translateX(-20%)`;
            }
            setTimeout(() => {
                slides.style.transition = 'transform 0.5s ease-in-out';
            });
        });

        // Initialize slide position
        slides.style.transform = `translateX(-20%)`;

        // Automatic slide change
        let autoSlideInterval = setInterval(moveToNextSlide, 6000); // Change slide every 6 seconds