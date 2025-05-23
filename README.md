# 🚀 개인 브랜딩 사이트 - Vibe Coding 방식

> **순수 HTML5 + CSS3 + Vanilla JS**로 구축한 개발자 포트폴리오 사이트

![Lighthouse Score](https://img.shields.io/badge/Lighthouse-90+-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-✓-brightgreen)

## ✨ 주요 기능

### 🎯 핵심 기능 (PRD 기반)
- **F-01** ✅ 스크롤 스파이 내비게이션 (섹션 이동 시 메뉴 하이라이트)
- **F-02** ✅ 다크/라이트 모드 토글 (로컬스토리지 저장)
- **F-03** ✅ 프로젝트 모달 + 이미지 슬라이더
- **F-04** ✅ EmailJS 연동 컨택트 폼 + 토스트 알림
- **F-05** ✅ Google Analytics 4 이벤트 추적

### 🎨 UI/UX 기능
- **반응형 디자인**: 320px ~ 1920px 완벽 지원
- **접근성**: WCAG 2.1 AA 준수, 키보드 네비게이션
- **성능 최적화**: 이미지 Lazy Loading, 디바운싱
- **애니메이션**: 스크롤 애니메이션, 파티클 효과
- **PWA 준비**: Service Worker 등록 포함

## 🏗️ 프로젝트 구조

```
personal-site/
├── index.html              # 메인 HTML 파일
├── assets/
│   ├── css/
│   │   └── style.css       # 메인 스타일시트
│   ├── js/
│   │   ├── main.js         # 메인 JavaScript
│   │   └── email.js        # EmailJS 연동
│   └── img/                # 이미지 폴더
│       ├── profile.jpg
│       ├── project-*.jpg
│       └── favicon.png
├── prompts/                # Vibe Coding 프롬프트 로그
│   ├── hero-section.txt
│   ├── about-section.txt
│   └── projects-section.txt
└── README.md
```

## 🚀 빠른 시작

### 1. 파일 다운로드
```bash
# 레포지토리 클론
git clone https://github.com/yourname/vibecoding-site.git
cd vibecoding-site
```

### 2. 개인정보 커스터마이징

#### 📝 기본 정보 수정 (`index.html`)
```html
<!-- 1. 메타 정보 -->
<title>Kyle - 풀스택 개발자 포트폴리오</title>
<meta name="description" content="혁신적인 웹 솔루션을 만드는 풀스택 개발자의 포트폴리오">

<!-- 2. Hero 섹션 -->
<h1>안녕하세요, <span class="accent-color">Kyle</span>입니다</h1>
<p>사용자 경험을 최우선으로 생각하는 풀스택 개발자</p>

<!-- 3. 소셜 링크 -->
<a href="https://linkedin.com/in/yourprofile" target="_blank">LinkedIn</a>
<a href="https://github.com/yourname" target="_blank">GitHub</a>
```

#### 🎯 프로젝트 데이터 수정 (`assets/js/main.js`)
```javascript
const projectsData = {
    1: {
        title: "당신의 프로젝트 제목",
        description: "프로젝트 설명...",
        tech: ["React", "Node.js", "MongoDB"],
        github: "https://github.com/yourname/project",
        demo: "https://demo.yourname.dev"
    }
};
```

#### 💌 EmailJS 설정 (`assets/js/email.js`)
```javascript
const EMAILJS_SERVICE_ID = 'service_your_id';
const EMAILJS_TEMPLATE_ID = 'template_your_id';  
const EMAILJS_PUBLIC_KEY = 'your_public_key';
```

### 3. 이미지 교체
```
assets/img/
├── profile.jpg          # 250x250px 프로필 사진
├── project-1.jpg        # 1200x600px 프로젝트 썸네일
├── project-2.jpg
├── project-3.jpg
├── og-image.jpg         # 1200x630px OG 이미지
└── favicon.png          # 32x32px 파비콘
```

### 4. 브라우저에서 실행
```bash
# 로컬 서버 실행 (Python 3)
python -m http.server 8000

# 또는 Node.js live-server
npx live-server
```

## ⚙️ 설정 가이드

### 📧 EmailJS 설정

1. [EmailJS](https://www.emailjs.com/) 계정 생성
2. Service 생성 (Gmail, Outlook 등)
3. Template 생성:
```
제목: New message from {{from_name}}
내용:
From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}
```
4. Public Key 발급
5. `assets/js/email.js`에서 ID들 수정

### 📊 Google Analytics 4 설정

1. [Google Analytics](https://analytics.google.com/) 계정 생성
2. GA4 속성 생성
3. Measurement ID 복사
4. `index.html`에서 `GA_MEASUREMENT_ID` 교체:
```html
<script>
    gtag('config', 'G-XXXXXXXXXX'); // 여기를 수정
</script>
```

### 🎨 테마 커스터마이징

#### CSS 변수 수정 (`assets/css/style.css`)
```css
:root {
  /* 브랜드 컬러 */
  --primary-color: #2B62F4;    /* 메인 컬러 */
  --secondary-color: #F4B400;  /* 보조 컬러 */
  --accent-color: #6C63FF;     /* 강조 컬러 */
  
  /* 폰트 크기 */
  --font-size-xl: 3.5rem;      /* Hero 타이틀 */
  --font-size-lg: 2.5rem;      /* 섹션 타이틀 */
}
```

## 🌐 배포 가이드

### GitHub Pages 자동 배포

1. GitHub 레포지토리 생성
2. 코드 푸시:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```
3. Repository Settings → Pages
4. Source: Deploy from a branch → main
5. 사이트 URL: `https://yourusername.github.io/repository-name`

### 커스텀 도메인 연결

1. 도메인 구매 (예: yourname.dev)
2. DNS 설정:
```
Type: CNAME
Name: @
Value: yourusername.github.io
```
3. Repository Settings → Pages → Custom domain

## 📈 성능 최적화

### Lighthouse 점수 향상 팁

```javascript
// 1. 이미지 최적화
- WebP 포맷 사용
- 적절한 크기로 리사이징
- loading="lazy" 속성 추가

// 2. JavaScript 최적화
- 디바운싱으로 스크롤 이벤트 최적화
- Intersection Observer 사용
- 필요한 기능만 로드

// 3. CSS 최적화
- CSS 변수 활용
- 불필요한 스타일 제거
- Critical CSS 인라인
```

## 🔧 커스터마이징 가이드

### 새로운 섹션 추가

1. **HTML 구조 추가**:
```html
<section id="new-section" class="new-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">New Section</h2>
        </div>
        <!-- 내용 -->
    </div>
</section>
```

2. **네비게이션 메뉴 추가**:
```html
<li class="nav-item">
    <a href="#new-section" class="nav-link">New Section</a>
</li>
```

3. **CSS 스타일 추가**:
```css
.new-section {
    padding: var(--spacing-xl) 0;
    background: var(--bg-color);
}
```

### 블로그 RSS 연동

```javascript
// assets/js/main.js에서 loadBlogPosts() 함수 수정
async function loadBlogPosts() {
    try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=YOUR_RSS_URL');
        const data = await response.json();
        // RSS 데이터 처리
    } catch (error) {
        console.error('블로그 로딩 실패:', error);
    }
}
```

## 🎭 Vibe Coding 프롬프트 예시

### Hero 섹션 생성 프롬프트
```
반응형 Hero 섹션을 만들어주세요:
- 풀스크린 높이
- 좌측: 타이틀, 서브타이틀, CTA 버튼
- 우측: 프로필 카드 + 상태 표시
- 배경: 파티클 애니메이션
- 모바일에서 세로 배치
```

### Contact 폼 생성 프롬프트
```
EmailJS 연동 컨택트 폼을 만들어주세요:
- 필드: 이름, 이메일, 제목, 메시지
- 유효성 검사 + 에러 표시
- 로딩 상태 + 토스트 알림
- 스팸 방지 (허니팟)
- 자동 저장 기능
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🆘 문제 해결

### 자주 묻는 질문

**Q: EmailJS가 작동하지 않아요**
```javascript
// 1. Service ID, Template ID, Public Key 확인
// 2. 브라우저 콘솔에서 에러 메시지 확인
// 3. EmailJS 대시보드에서 전송 로그 확인
```

**Q: 다크 모드가 저장되지 않아요**
```javascript
// localStorage 지원 여부 확인
if (typeof(Storage) !== "undefined") {
    localStorage.setItem('theme', currentTheme);
}
```

**Q: 모바일에서 애니메이션이 버벅거려요**
```css
/* prefers-reduced-motion 미디어 쿼리 사용 */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
    }
}
```

## 📞 지원

- 🐛 **버그 리포트**: [Issues](https://github.com/yourname/vibecoding-site/issues)
- 💡 **기능 제안**: [Discussions](https://github.com/yourname/vibecoding-site/discussions)
- 📧 **문의**: prolkc@gmail.com

---

**🎉 Happy Coding with AI! 🤖✨**

Made with ❤️ using Vibe Coding methodology 