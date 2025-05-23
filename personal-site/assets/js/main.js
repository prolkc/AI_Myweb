// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');
const projectModal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const toast = document.getElementById('toast');
const toastIcon = document.querySelector('.toast-icon');
const toastMessage = document.querySelector('.toast-message');

// Global Variables
let currentTheme = localStorage.getItem('theme') || 'light';
let isModalOpen = false;
let activeSection = 'home';

// Project Data
const projectsData = {
    1: {
        title: "이커머스 플랫폼",
        description: "React와 Node.js로 구축한 완전한 이커머스 솔루션입니다. 사용자 인증, 결제 시스템, 관리자 대시보드 등 모든 기능을 포함합니다.",
        tech: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Redux"],
        features: [
            "반응형 사용자 인터페이스",
            "실시간 재고 관리",
            "Stripe 결제 연동",
            "관리자 대시보드",
            "검색 및 필터링",
            "사용자 리뷰 시스템"
        ],
        github: "https://github.com/yourname/ecommerce-platform",
        demo: "https://ecommerce-demo.yourname.dev",
        images: [
            "assets/img/project-1-1.jpg",
            "assets/img/project-1-2.jpg",
            "assets/img/project-1-3.jpg"
        ]
    },
    2: {
        title: "실시간 채팅 앱",
        description: "Socket.io를 활용한 실시간 커뮤니케이션 플랫폼입니다. 개인 채팅, 그룹 채팅, 파일 공유 등의 기능을 제공합니다.",
        tech: ["Vue.js", "Socket.io", "Express", "Redis", "PostgreSQL"],
        features: [
            "실시간 메시징",
            "그룹 채팅방",
            "파일 및 이미지 공유",
            "온라인 상태 표시",
            "메시지 검색",
            "푸시 알림"
        ],
        github: "https://github.com/yourname/realtime-chat",
        demo: "https://chat-demo.yourname.dev",
        images: [
            "assets/img/project-2-1.jpg",
            "assets/img/project-2-2.jpg",
            "assets/img/project-2-3.jpg"
        ]
    },
    3: {
        title: "태스크 관리 도구",
        description: "팀 협업을 위한 칸반 스타일 프로젝트 관리 시스템입니다. 드래그 앤 드롭, 실시간 협업, 알림 기능을 제공합니다.",
        tech: ["TypeScript", "PostgreSQL", "Docker", "React", "Node.js"],
        features: [
            "칸반 보드 인터페이스",
            "드래그 앤 드롭",
            "팀 멤버 초대",
            "실시간 업데이트",
            "파일 첨부",
            "일정 관리"
        ],
        github: "https://github.com/yourname/task-management",
        demo: "https://tasks-demo.yourname.dev",
        images: [
            "assets/img/project-3-1.jpg",
            "assets/img/project-3-2.jpg",
            "assets/img/project-3-3.jpg"
        ]
    }
};

// Mock Blog Data (실제로는 RSS나 API에서 가져옴)
const blogPosts = [
    {
        title: "React 18의 새로운 기능과 Concurrent Features 완벽 가이드",
        excerpt: "React 18에서 도입된 Concurrent Features와 Suspense의 개선사항, 그리고 실제 프로젝트에서의 활용 방법을 자세히 알아보겠습니다.",
        date: "2024-01-15",
        url: "https://blog.yourname.dev/react-18-features",
        readTime: "8분"
    },
    {
        title: "Node.js 성능 최적화: 메모리 사용량 줄이기",
        excerpt: "Node.js 애플리케이션의 메모리 사용량을 효과적으로 줄이는 방법과 성능 모니터링 도구 활용법을 소개합니다.",
        date: "2024-01-08",
        url: "https://blog.yourname.dev/nodejs-memory-optimization",
        readTime: "12분"
    },
    {
        title: "TypeScript 5.0 새로운 기능과 마이그레이션 가이드",
        excerpt: "TypeScript 5.0의 주요 변경사항과 기존 프로젝트를 업그레이드하는 과정에서 주의해야 할 점들을 정리했습니다.",
        date: "2024-01-01",
        url: "https://blog.yourname.dev/typescript-5-migration",
        readTime: "10분"
    }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initScrollSpy();
    initMobileMenu();
    initSmoothScroll();
    initParticles();
    initIntersectionObserver();
    loadBlogPosts();
    
    // Add event listeners
    themeToggleBtn.addEventListener('click', toggleTheme);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Close modal on outside click
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isModalOpen) {
            closeProjectModal();
        }
    });
});

// Theme Management
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    
    // Add transition effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
    
    // Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'theme_toggle', {
            'theme': currentTheme
        });
    }
}

function updateThemeIcon() {
    themeIcon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Mobile Menu
function initMobileMenu() {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Scroll Spy
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const scrollTop = window.pageYOffset;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        if (currentSectionId !== activeSection) {
            activeSection = currentSectionId;
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Particles Animation
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(43, 98, 244, 0.1)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `float ${Math.random() * 6 + 4}s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
    
    // Add CSS animation for floating
    if (!document.getElementById('particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.project-card, .blog-card, .timeline-item, .tech-category');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Navbar scroll effect
function handleScroll() {
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Handle window resize
function handleResize() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Project Modal Functions
function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <div class="project-detail">
            <div class="project-images">
                <div class="image-slider">
                    ${project.images.map((img, index) => `
                        <img src="${img}" alt="${project.title} 스크린샷 ${index + 1}" 
                             class="project-slide ${index === 0 ? 'active' : ''}" 
                             loading="lazy">
                    `).join('')}
                </div>
                <div class="slider-controls">
                    ${project.images.map((_, index) => `
                        <button class="slider-dot ${index === 0 ? 'active' : ''}" 
                                onclick="changeSlide(${index})"></button>
                    `).join('')}
                </div>
            </div>
            
            <div class="project-info">
                <h3>${project.title}</h3>
                <p class="project-description-full">${project.description}</p>
                
                <div class="project-tech-stack">
                    <h4>사용 기술</h4>
                    <div class="tech-tags">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-features">
                    <h4>주요 기능</h4>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-links">
                    <a href="${project.github}" target="_blank" class="btn btn-outline">
                        <i class="fab fa-github"></i>
                        GitHub
                    </a>
                    <a href="${project.demo}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i>
                        라이브 데모
                    </a>
                </div>
            </div>
        </div>
    `;
    
    projectModal.classList.add('active');
    isModalOpen = true;
    document.body.style.overflow = 'hidden';
    
    // Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'project_view', {
            'project_name': project.title
        });
    }
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    isModalOpen = false;
    document.body.style.overflow = '';
}

function changeSlide(index) {
    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Load Blog Posts
function loadBlogPosts() {
    const blogGrid = document.getElementById('blog-posts');
    
    // Simulate loading delay
    setTimeout(() => {
        blogGrid.innerHTML = blogPosts.map(post => `
            <article class="blog-card">
                <div class="blog-date">
                    ${formatDate(post.date)} • ${post.readTime} 읽기
                </div>
                <h3 class="blog-title">
                    <a href="${post.url}" target="_blank">${post.title}</a>
                </h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="${post.url}" target="_blank" class="blog-read-more">
                    계속 읽기 <i class="fas fa-arrow-right"></i>
                </a>
            </article>
        `).join('');
    }, 1000);
}

// Email Copy Function
function copyEmail() {
    const email = 'prolkc@gmail.com';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
            showToast('이메일이 클립보드에 복사되었습니다!', 'success');
        }).catch(() => {
            fallbackCopyEmail(email);
        });
    } else {
        fallbackCopyEmail(email);
    }
}

function fallbackCopyEmail(email) {
    const textArea = document.createElement('textarea');
    textArea.value = email;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('이메일이 클립보드에 복사되었습니다!', 'success');
    } catch (err) {
        showToast('복사에 실패했습니다. 수동으로 복사해주세요.', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Toast Notification
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toastIcon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(handleScroll, 10);
window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e);
    
    // Analytics error tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.message,
            'fatal': false
        });
    }
});

// Expose global functions for HTML onclick handlers
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.changeSlide = changeSlide;
window.copyEmail = copyEmail; 