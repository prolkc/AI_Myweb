// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_your_id'; // EmailJS에서 받은 Service ID
const EMAILJS_TEMPLATE_ID = 'template_your_id'; // EmailJS에서 받은 Template ID  
const EMAILJS_PUBLIC_KEY = 'your_public_key'; // EmailJS Public Key

// Initialize EmailJS
(function() {
    // EmailJS CDN이 로드되면 초기화
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        // EmailJS 스크립트 동적 로드
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = function() {
            emailjs.init(EMAILJS_PUBLIC_KEY);
        };
        document.head.appendChild(script);
    }
})();

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Form validation
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    setButtonLoading(submitBtn, true);
    
    try {
        // Get form data
        const formData = new FormData(form);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_email: 'prolkc@gmail.com', // 받을 이메일 주소
            reply_to: formData.get('email')
        };
        
        // Send email via EmailJS
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );
        
        if (response.status === 200) {
            showToast('메시지가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.', 'success');
            form.reset();
            
            // Analytics event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'form_name': 'contact_form',
                    'success': true
                });
            }
        } else {
            throw new Error('이메일 전송에 실패했습니다.');
        }
        
    } catch (error) {
        console.error('Email sending error:', error);
        showToast('메시지 전송에 실패했습니다. 다시 시도해주세요.', 'error');
        
        // Analytics error event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'form_name': 'contact_form',
                'success': false,
                'error': error.message
            });
        }
    } finally {
        setButtonLoading(submitBtn, false, originalBtnText);
    }
}

function validateForm(form) {
    const formData = new FormData(form);
    const errors = [];
    
    // Name validation
    const name = formData.get('name').trim();
    if (!name) {
        errors.push('이름을 입력해주세요.');
    } else if (name.length < 2) {
        errors.push('이름은 2글자 이상 입력해주세요.');
    }
    
    // Email validation
    const email = formData.get('email').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.push('이메일을 입력해주세요.');
    } else if (!emailRegex.test(email)) {
        errors.push('올바른 이메일 형식을 입력해주세요.');
    }
    
    // Subject validation
    const subject = formData.get('subject').trim();
    if (!subject) {
        errors.push('제목을 입력해주세요.');
    } else if (subject.length < 5) {
        errors.push('제목은 5글자 이상 입력해주세요.');
    }
    
    // Message validation
    const message = formData.get('message').trim();
    if (!message) {
        errors.push('메시지를 입력해주세요.');
    } else if (message.length < 10) {
        errors.push('메시지는 10글자 이상 입력해주세요.');
    }
    
    // Show errors if any
    if (errors.length > 0) {
        showToast(errors[0], 'error');
        
        // Focus on first invalid field
        const firstErrorField = getFirstErrorField(form, formData);
        if (firstErrorField) {
            firstErrorField.focus();
            firstErrorField.classList.add('error');
            setTimeout(() => {
                firstErrorField.classList.remove('error');
            }, 3000);
        }
        
        return false;
    }
    
    return true;
}

function getFirstErrorField(form, formData) {
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();
    
    if (!name || name.length < 2) {
        return form.querySelector('#name');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return form.querySelector('#email');
    }
    if (!subject || subject.length < 5) {
        return form.querySelector('#subject');
    }
    if (!message || message.length < 10) {
        return form.querySelector('#message');
    }
    
    return null;
}

function setButtonLoading(button, isLoading, originalText = '') {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            전송 중...
        `;
        button.classList.add('loading');
    } else {
        button.disabled = false;
        button.innerHTML = originalText || `
            <i class="fas fa-paper-plane"></i>
            메시지 보내기
        `;
        button.classList.remove('loading');
    }
}

// Alternative contact methods
function openEmailClient() {
    const email = 'prolkc@gmail.com';
    const subject = '안녕하세요! 협업 문의드립니다.';
    const body = '안녕하세요,\n\n[여기에 메시지를 작성해주세요]\n\n감사합니다.';
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    
    // Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'email_client_open', {
            'method': 'mailto'
        });
    }
}

// Quick contact templates
const contactTemplates = {
    collaboration: {
        subject: '프로젝트 협업 문의',
        message: '안녕하세요! 귀하의 포트폴리오를 보고 연락드립니다.\n\n[프로젝트 내용 또는 협업 제안을 자세히 작성해주세요]\n\n감사합니다.'
    },
    job_offer: {
        subject: '채용 제안',
        message: '안녕하세요! 저희 회사에서 개발자를 모집하고 있어 연락드립니다.\n\n[회사 소개 및 포지션 정보를 작성해주세요]\n\n감사합니다.'
    },
    question: {
        subject: '기술 관련 질문',
        message: '안녕하세요! 블로그 포스트를 보고 궁금한 점이 있어 연락드립니다.\n\n[질문 내용을 자세히 작성해주세요]\n\n감사합니다.'
    }
};

function useTemplate(templateKey) {
    const template = contactTemplates[templateKey];
    if (!template) return;
    
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    if (subjectField) subjectField.value = template.subject;
    if (messageField) messageField.value = template.message;
    
    // Scroll to form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Focus on name field
    const nameField = document.getElementById('name');
    if (nameField) {
        setTimeout(() => nameField.focus(), 500);
    }
    
    // Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'template_use', {
            'template_type': templateKey
        });
    }
}

// Add template buttons to contact section (optional)
function addQuickTemplates() {
    const contactInfo = document.querySelector('.contact-info');
    if (!contactInfo) return;
    
    const templatesHtml = `
        <div class="quick-templates mt-4">
            <h4>빠른 문의</h4>
            <div class="template-buttons">
                <button class="btn btn-outline btn-sm" onclick="useTemplate('collaboration')">
                    <i class="fas fa-handshake"></i>
                    협업 제안
                </button>
                <button class="btn btn-outline btn-sm" onclick="useTemplate('job_offer')">
                    <i class="fas fa-briefcase"></i>
                    채용 제안
                </button>
                <button class="btn btn-outline btn-sm" onclick="useTemplate('question')">
                    <i class="fas fa-question-circle"></i>
                    기술 질문
                </button>
            </div>
        </div>
    `;
    
    contactInfo.insertAdjacentHTML('beforeend', templatesHtml);
}

// Auto-save form data to localStorage
function initFormAutoSave() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const fields = ['name', 'email', 'subject', 'message'];
    
    // Load saved data
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const savedValue = localStorage.getItem(`contact_form_${fieldName}`);
        if (field && savedValue) {
            field.value = savedValue;
        }
    });
    
    // Save data on input
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('input', function() {
                localStorage.setItem(`contact_form_${fieldName}`, this.value);
            });
        }
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        setTimeout(() => {
            fields.forEach(fieldName => {
                localStorage.removeItem(`contact_form_${fieldName}`);
            });
        }, 2000); // Clear after success message
    });
}

// Spam protection (simple honeypot)
function addSpamProtection() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Add honeypot field
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.style.display = 'none';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    
    form.appendChild(honeypot);
    
    // Check honeypot on submit
    form.addEventListener('submit', function(e) {
        if (honeypot.value) {
            e.preventDefault();
            console.warn('Spam detected');
            return false;
        }
    });
}

// Rate limiting
const rateLimiter = {
    attempts: [],
    maxAttempts: 3,
    timeWindow: 5 * 60 * 1000, // 5 minutes
    
    canSubmit() {
        const now = Date.now();
        this.attempts = this.attempts.filter(time => now - time < this.timeWindow);
        return this.attempts.length < this.maxAttempts;
    },
    
    recordAttempt() {
        this.attempts.push(Date.now());
    },
    
    getTimeUntilReset() {
        if (this.attempts.length === 0) return 0;
        const oldestAttempt = Math.min(...this.attempts);
        return Math.max(0, this.timeWindow - (Date.now() - oldestAttempt));
    }
};

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    addQuickTemplates();
    initFormAutoSave();
    addSpamProtection();
});

// CSS for error states
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444 !important;
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .template-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .template-buttons .btn {
        font-size: 0.875rem;
    }
    
    .spinner-border-sm {
        width: 1rem;
        height: 1rem;
        border-width: 0.15em;
    }
    
    .spinner-border {
        display: inline-block;
        border: 0.25em solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spinner-border 0.75s linear infinite;
    }
    
    @keyframes spinner-border {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(errorStyles);

// Expose functions globally
window.useTemplate = useTemplate;
window.openEmailClient = openEmailClient; 