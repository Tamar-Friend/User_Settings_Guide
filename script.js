let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;

        function showSlide(n) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (n + totalSlides) % totalSlides;
            slides[currentSlide].classList.add('active');
            
            // גלילה לראש השקופית החדשה - השורה החדשה!
            document.querySelector('.presentation-container').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update navigation buttons
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            
            prevBtn.disabled = currentSlide === 0;
            
            if (currentSlide === totalSlides - 1) {
                nextBtn.textContent = '🏁 סיום';
            } else {
                nextBtn.textContent = 'הבא ⏭️';
            }
        }

        function nextSlide() {
            if (currentSlide < totalSlides - 1) {
                showSlide(currentSlide + 1);
            }
        }

        function previousSlide() {
            if (currentSlide > 0) {
                showSlide(currentSlide - 1);
            }
        }

        // New function to handle search and navigation
        function searchAndNavigate() {
            const query = document.getElementById('searchInput').value.trim();
            if (!query) {
                alert('יש להזין מונח חיפוש.');
                return;
            }

            let foundIndex = -1;
            // Iterate through slides to find a match
            for (let i = 0; i < slides.length; i++) {
                const slide = slides[i];
                const slideText = slide.textContent || slide.innerText;
                const slideCounter = slide.querySelector('.slide-counter')?.textContent.split('/')[0].trim();
                
                // Check for match by page number or text content
                if (slideCounter === query || slideText.includes(query)) {
                    foundIndex = i;
                    break;
                }
            }

            if (foundIndex !== -1) {
                showSlide(foundIndex);
            } else {
                alert('לא נמצאה שקופית התואמת לחיפוש שלך.');
            }
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                previousSlide();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                nextSlide();
            }
        });

        // Event listener for "Enter" key on the search input
        document.getElementById('searchInput').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                searchAndNavigate();
            }
        });

        // Screenshot loading function
        function loadScreenshot(input, previewId) {
            const file = input.files[0];
            const preview = document.getElementById(previewId);
            const placeholder = input.parentElement;
            
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                    placeholder.querySelector('.upload-icon').style.display = 'none';
                    placeholder.querySelector('.upload-text').style.display = 'none';
                }
                reader.readAsDataURL(file);
            }
        }

        // Initialize
        showSlide(0);