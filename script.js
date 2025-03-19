// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the main page (not login page)
    if (!window.location.href.includes('login.html')) {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        
        // If not logged in, redirect to login page
        if (!isLoggedIn) {
            window.location.href = 'login.html';
        }
    }
    
    // Handle FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i');
                
                // Toggle answer visibility
                answer.classList.toggle('active');
                
                // Toggle icon
                if (icon.classList.contains('fa-chevron-down')) {
                    icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
                } else {
                    icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            });
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to service cards on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .pricing-card, .feature-item, .location-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();

    // Testimonial slider functionality
    let currentSlide = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const totalSlides = testimonials.length;
    
    if (testimonials.length > 0) {
        // Auto-advance testimonials
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateTestimonialSlider();
        }, 5000);
        
        // Initial setup
        updateTestimonialSlider();
    }
    
    function updateTestimonialSlider() {
        testimonials.forEach((testimonial, index) => {
            if (index === currentSlide) {
                testimonial.style.opacity = '1';
                testimonial.style.transform = 'translateX(0)';
            } else {
                testimonial.style.opacity = '0';
                testimonial.style.transform = 'translateX(50px)';
            }
        });
    }
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Initially hide all answers
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            // Toggle the current answer
            const isOpen = answer.style.display === 'block';
            
            // Close all answers first
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-question i');
                
                otherAnswer.style.display = 'none';
                otherIcon.classList.remove('fa-chevron-up');
                otherIcon.classList.add('fa-chevron-down');
            });
            
            // If it wasn't open before, open it now
            if (!isOpen) {
                answer.style.display = 'block';
                const icon = question.querySelector('i');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
});

// Star Rating System
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star-rating i');
    const ratingText = document.querySelector('.rating-text');
    let selectedRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            selectedRating = rating;
            
            // Update stars
            stars.forEach(s => {
                const starRating = parseInt(s.getAttribute('data-rating'));
                if (starRating <= rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
            
            // Update text based on rating
            const ratingTexts = [
                'Click to rate',
                'Poor',
                'Fair',
                'Good',
                'Very Good',
                'Excellent'
            ];
            
            ratingText.textContent = ratingTexts[rating];
            
            // Add the rating to a hidden input in the form
            let ratingInput = document.getElementById('hidden-rating');
            if (!ratingInput) {
                ratingInput = document.createElement('input');
                ratingInput.type = 'hidden';
                ratingInput.id = 'hidden-rating';
                ratingInput.name = 'rating';
                document.querySelector('.feedback-form').appendChild(ratingInput);
            }
            ratingInput.value = rating;
        });
        
        // Hover effects
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            
            stars.forEach(s => {
                const starRating = parseInt(s.getAttribute('data-rating'));
                if (starRating <= rating) {
                    s.classList.add('hover');
                }
            });
        });
        
        star.addEventListener('mouseleave', function() {
            stars.forEach(s => {
                s.classList.remove('hover');
            });
        });
    });
    
    // Form submission
    const feedbackForm = document.querySelector('.feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the data to your server
            // For now, we'll just show a thank you message
            const formData = new FormData(this);
            const feedbackData = {};
            
            for (let [key, value] of formData.entries()) {
                feedbackData[key] = value;
            }
            
            // Add the rating
            feedbackData.rating = selectedRating;
            
            console.log('Feedback submitted:', feedbackData);
            
            // Replace form with thank you message
            this.innerHTML = `
                <div class="thank-you-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank You for Your Feedback!</h3>
                    <p>We appreciate you taking the time to share your thoughts with us.</p>
                </div>
            `;
            
            // Also update the rating container
            document.querySelector('.rating-container').innerHTML = `
                <i class="fas fa-heart" style="font-size: 50px; color: var(--primary-color);"></i>
                <h3>Thanks for Rating Us!</h3>
                <p>Your feedback helps us improve.</p>
            `;
        });
    }
});