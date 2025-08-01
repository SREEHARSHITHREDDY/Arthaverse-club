// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        let isValid = true;
        this.querySelectorAll('input[required], textarea[required]').forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#DC2626';
            } else {
                input.style.borderColor = '#E5E7EB';
            }
        });
        
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(to right, #2563EB, #10B981);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
            successMessage.textContent = 'Message sent successfully!';
            document.body.appendChild(successMessage);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
            
            // Reset form
            this.reset();
        }
    });
});

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(to right, #2563EB, #10B981);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
            successMessage.textContent = 'Successfully subscribed to newsletter!';
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
            
            this.reset();
        }
    });
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.event-card, .program-card, .team-card, .blog-card, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-graphic');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effects for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.title-highlight');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 100);
    }
    
    // Initialize video background system
    initVideoBackground();
});

// Event Registration Function
function registerEvent(eventName) {
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(to right, #2563EB, #10B981);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    successMessage.textContent = `Successfully registered for ${eventName}!`;
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Competition Application Function
function applyCompetition(competitionName) {
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(to right, #2563EB, #10B981);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    successMessage.textContent = `Application submitted for ${competitionName}!`;
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Workshop Enrollment Function
function enrollWorkshop(workshopName) {
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(to right, #2563EB, #10B981);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    successMessage.textContent = `Successfully enrolled in ${workshopName}!`;
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Program Details Function
function showProgramDetails(programName) {
    const programDetails = {
        'AI Fundamentals': {
            duration: '8 weeks',
            schedule: 'Mon, Wed, Fri - 6:00 PM',
            fee: '₹5,000',
            startDate: 'January 15, 2025',
            instructor: 'Dr. Arjun Kumar'
        },
        'Business Analytics': {
            duration: '6 weeks',
            schedule: 'Tue, Thu - 7:00 PM',
            fee: '₹4,500',
            startDate: 'January 20, 2025',
            instructor: 'Priya Patel'
        },
        'Startup Incubation': {
            duration: '12 weeks',
            schedule: 'Sat - 10:00 AM',
            fee: '₹8,000',
            startDate: 'February 1, 2025',
            instructor: 'Rahul Sharma'
        },
        'Leadership Development': {
            duration: '4 weeks',
            schedule: 'Sun - 2:00 PM',
            fee: '₹3,500',
            startDate: 'January 25, 2025',
            instructor: 'Ananya Singh'
        },
        'Workshops': {
            duration: '1-2 days',
            schedule: 'Weekends',
            fee: '₹1,500',
            startDate: 'Ongoing',
            instructor: 'Various Experts'
        }
    };

    const details = programDetails[programName];
    if (details) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                position: relative;
            ">
                <button onclick="this.parentElement.parentElement.remove()" style="
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #666;
                ">&times;</button>
                <h2 style="color: #2563EB; margin-bottom: 1rem;">${programName}</h2>
                <div style="margin-bottom: 1rem;">
                    <p><strong>Duration:</strong> ${details.duration}</p>
                    <p><strong>Schedule:</strong> ${details.schedule}</p>
                    <p><strong>Fee:</strong> ${details.fee}</p>
                    <p><strong>Start Date:</strong> ${details.startDate}</p>
                    <p><strong>Instructor:</strong> ${details.instructor}</p>
                </div>
                <button onclick="enrollProgram('${programName}')" style="
                    background: linear-gradient(to right, #2563EB, #10B981);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: 600;
                ">Enroll Now</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Enroll Program Function
function enrollProgram(programName) {
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(to right, #2563EB, #10B981);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10001;
        animation: slideIn 0.3s ease;
    `;
    successMessage.textContent = `Successfully enrolled in ${programName}!`;
    document.body.appendChild(successMessage);
    
    // Close modal
    const modal = document.querySelector('div[style*="position: fixed"]');
    if (modal) {
        modal.remove();
    }
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Social Media Links Function
function openSocialLink(platform, username) {
    const socialUrls = {
        'linkedin': `https://linkedin.com/in/${username}`,
        'github': `https://github.com/${username}`,
        'facebook': `https://facebook.com/${username}`,
        'twitter': `https://twitter.com/${username}`,
        'instagram': `https://instagram.com/${username}`,
        'youtube': `https://youtube.com/@${username}`
    };
    
    const url = socialUrls[platform];
    if (url) {
        window.open(url, '_blank');
    }
}

// Email Function
function openEmail(email) {
    window.open(`mailto:${email}?subject=Inquiry from Arthaverse Club Website`, '_blank');
}

// Blog Post Function
function readBlogPost(postId) {
    const blogPosts = {
        'ai-future-business': {
            title: 'The Future of AI in Business',
            content: `
                <h2>The Future of AI in Business</h2>
                <p>Artificial Intelligence is revolutionizing how businesses operate, make decisions, and serve customers. From predictive analytics to automated customer service, AI is becoming an integral part of modern business strategy.</p>
                <h3>Key Trends in AI Business Applications:</h3>
                <ul>
                    <li>Predictive Analytics for Market Insights</li>
                    <li>Automated Customer Service with Chatbots</li>
                    <li>Intelligent Process Automation</li>
                    <li>AI-Powered Marketing and Personalization</li>
                    <li>Enhanced Decision Making with Machine Learning</li>
                </ul>
                <p>As we move forward, businesses that embrace AI will have a significant competitive advantage. The key is to start small, focus on specific use cases, and gradually scale AI implementations across the organization.</p>
            `
        },
        'student-entrepreneurs': {
            title: '5 Essential Tips for Student Entrepreneurs',
            content: `
                <h2>5 Essential Tips for Student Entrepreneurs</h2>
                <p>Starting a business while studying can be challenging but incredibly rewarding. Here are five essential tips that successful student entrepreneurs swear by:</p>
                <h3>1. Start with a Problem You Understand</h3>
                <p>Focus on solving problems you've personally experienced. This gives you unique insights and genuine passion for your solution.</p>
                <h3>2. Leverage Your Student Network</h3>
                <p>Your classmates, professors, and university resources are invaluable. Use them for feedback, testing, and networking.</p>
                <h3>3. Time Management is Crucial</h3>
                <p>Balance academics and business carefully. Use tools and techniques to maximize productivity during limited time.</p>
                <h3>4. Start Small, Think Big</h3>
                <p>Begin with a minimum viable product (MVP) and iterate based on user feedback. Don't try to build everything at once.</p>
                <h3>5. Learn from Failure</h3>
                <p>Every setback is a learning opportunity. Document your failures and use them to improve your approach.</p>
            `
        },
        'data-science-guide': {
            title: 'Getting Started with Data Science',
            content: `
                <h2>Getting Started with Data Science</h2>
                <p>Data Science is one of the most in-demand skills today. Here's a comprehensive guide to help you begin your journey:</p>
                <h3>Essential Skills to Learn:</h3>
                <ul>
                    <li><strong>Programming:</strong> Python and R are the most popular languages</li>
                    <li><strong>Statistics:</strong> Understanding probability and statistical analysis</li>
                    <li><strong>Machine Learning:</strong> Algorithms and model building</li>
                    <li><strong>Data Visualization:</strong> Tools like Tableau, Power BI, or Python libraries</li>
                    <li><strong>Database Management:</strong> SQL and NoSQL databases</li>
                </ul>
                <h3>Learning Path:</h3>
                <ol>
                    <li>Learn Python programming basics</li>
                    <li>Study statistics and mathematics</li>
                    <li>Learn data manipulation with pandas</li>
                    <li>Master data visualization</li>
                    <li>Explore machine learning algorithms</li>
                    <li>Work on real-world projects</li>
                </ol>
                <p>Remember, consistency is key. Dedicate time daily to learning and practicing data science concepts.</p>
            `
        }
    };
    
    const post = blogPosts[postId];
    if (post) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            overflow-y: auto;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 15px;
                max-width: 800px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
            ">
                <button onclick="this.parentElement.parentElement.remove()" style="
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #666;
                ">&times;</button>
                <div style="color: #333; line-height: 1.6;">
                    ${post.content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
} 

// Video Background System
function initVideoBackground() {
    const videos = document.querySelectorAll('.hero-video-bg video');
    const dots = document.querySelectorAll('.video-dot');
    let currentVideoIndex = 0;
    let videoInterval;

    // Function to switch video
    function switchVideo(index) {
        // Remove active class from all videos and dots
        videos.forEach(video => video.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current video and dot
        videos[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentVideoIndex = index;
        
        // Play the current video
        videos[index].play();
    }

    // Switch to next video when current video ends
    function handleVideoEnd() {
        const nextIndex = (currentVideoIndex + 1) % videos.length;
        switchVideo(nextIndex);
    }

    // Add event listeners for video end
    videos.forEach(video => {
        video.addEventListener('ended', handleVideoEnd);
        video.addEventListener('loadeddata', () => {
            video.style.opacity = '0';
            setTimeout(() => {
                if (video.classList.contains('active')) {
                    video.style.opacity = '1';
                }
            }, 100);
        });
    });

    // Manual video switching with dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            switchVideo(index);
        });
    });

    // Pause auto-switch on hover
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', () => {
        videos.forEach(video => video.pause());
    });

    heroSection.addEventListener('mouseleave', () => {
        videos[currentVideoIndex].play();
    });

    // Start with first video
    switchVideo(0);
} 