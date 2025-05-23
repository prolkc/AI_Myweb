// 아재개그 데이터베이스
const jokes = [
    {
        setup: "아빠가 화장실에서 뭘 입고 나와?",
        punchline: "변기 (변기 → 변기복)"
    },
    {
        setup: "세상에서 가장 빠른 닭은?",
        punchline: "후라이드 치킨 (후다닥)"
    },
    {
        setup: "문어가 군대에 가면 몇 월에 전역해?",
        punchline: "8월 (팔 월)"
    },
    {
        setup: "라면을 먹을 때 제일 슬픈 순간은?",
        punchline: "면을 다 먹고 나서 (면을 = 면을)"
    },
    {
        setup: "김치가 가장 무서워하는 것은?",
        punchline: "김치냉장고"
    },
    {
        setup: "세상에서 가장 뜨거운 바다는?",
        punchline: "사우나바다 (사우나 + 바다)"
    },
    {
        setup: "돼지가 죽으면 뭐가 될까?",
        punchline: "돼지고기 (돼지 + 고기)"
    },
    {
        setup: "가장 추운 바이러스는?",
        punchline: "감기 바이러스"
    },
    {
        setup: "닭이 제일 무서워하는 요리는?",
        punchline: "닭볶음탕"
    },
    {
        setup: "고양이가 가장 좋아하는 과자는?",
        punchline: "야옹이 (야옹 + 이)"
    },
    {
        setup: "아빠가 미용실에 가면 뭐라고 해야 할까?",
        punchline: "파마 아빠 (파마 + 아빠)"
    },
    {
        setup: "수박이 물에 빠지면?",
        punchline: "수박 (수영하는 박)"
    },
    {
        setup: "가장 차가운 개는?",
        punchline: "냉면개 (냉면 + 개)"
    },
    {
        setup: "바나나가 웃으면?",
        punchline: "바나나킥 (바나나 + 킥킥)"
    },
    {
        setup: "엄마가 화장실에 오래 있으면?",
        punchline: "맘마미아 (엄마 + 미아)"
    },
    {
        setup: "개가 뜨거운 것을 먹으면?",
        punchline: "개털 (개 + 털털)"
    },
    {
        setup: "토마토가 가장 부끄러워할 때는?",
        punchline: "케첩이 될 때 (빨개서)"
    },
    {
        setup: "소가 웃으면서 우는 소리는?",
        punchline: "음모오오오 (음하하 + 모오)"
    },
    {
        setup: "스머프가 운동을 하면?",
        punchline: "스머프핏 (스머프 + 핏)"
    },
    {
        setup: "딸기가 가수가 되면?",
        punchline: "딸기잼 (딸기 + 잼있어)"
    },
    {
        setup: "펭귄이 가장 좋아하는 음식은?",
        punchline: "냉면 (차가워서)"
    },
    {
        setup: "곰이 넘어지면?",
        punchline: "곰탕 (곰 + 탕탕)"
    },
    {
        setup: "나무가 뛰면?",
        punchline: "나무늘보 (나무 + 늘보)"
    },
    {
        setup: "비가 오는 날 가장 위험한 동물은?",
        punchline: "비둘기 (비가 와서)"
    },
    {
        setup: "세상에서 가장 슬픈 버스는?",
        punchline: "굴뚝버스 (굴뚝 = 굴어서 뚝)"
    }
];

// 전역 변수
let jokeCount = 0;
let currentJokeIndex = -1;
let isAnimating = false;

// DOM 요소들
const jokeDisplay = document.getElementById('jokeDisplay');
const getJokeBtn = document.getElementById('getJokeBtn');
const jokeCountElement = document.getElementById('jokeCount');

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    updateJokeCount();
    
    // 버튼 클릭 이벤트
    getJokeBtn.addEventListener('click', function() {
        if (!isAnimating) {
            getRandomJoke();
        }
    });
    
    // 엔터키로도 새 개그 요청
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !isAnimating) {
            getRandomJoke();
        }
    });
});

// 랜덤 아재개그 가져오기
function getRandomJoke() {
    if (isAnimating) return;
    
    isAnimating = true;
    
    // 버튼 애니메이션
    animateButton();
    
    // 새로운 개그 인덱스 선택 (이전과 다른 개그)
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * jokes.length);
    } while (newIndex === currentJokeIndex && jokes.length > 1);
    
    currentJokeIndex = newIndex;
    const joke = jokes[currentJokeIndex];
    
    // 로딩 애니메이션 시작
    showLoadingAnimation();
    
    // 지연 후 개그 표시
    setTimeout(() => {
        displayJoke(joke);
        jokeCount++;
        updateJokeCount();
        isAnimating = false;
    }, 1000);
}

// 로딩 애니메이션 표시
function showLoadingAnimation() {
    jokeDisplay.innerHTML = `
        <div class="d-flex flex-column align-items-center">
            <div class="spinner-border text-primary mb-3" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="text-muted fs-6">아재개그를 생각하는 중...</p>
        </div>
    `;
    jokeDisplay.classList.add('loading');
}

// 개그 표시
function displayJoke(joke) {
    jokeDisplay.classList.remove('loading');
    jokeDisplay.classList.add('active');
    
    // 단계별로 개그 표시
    jokeDisplay.innerHTML = `
        <div class="joke-content">
            <i class="bi bi-question-circle display-4 text-primary mb-3"></i>
            <p class="joke-text setup-text">${joke.setup}</p>
            <button class="btn btn-outline-warning btn-sm mt-3" onclick="showPunchline('${joke.punchline.replace(/'/g, "\\'")}')" id="showAnswerBtn">
                <i class="bi bi-lightbulb"></i> 정답 보기
            </button>
        </div>
    `;
}

// 펀치라인 표시
function showPunchline(punchline) {
    const content = jokeDisplay.querySelector('.joke-content');
    content.innerHTML = `
        <i class="bi bi-emoji-laughing display-4 text-warning mb-3"></i>
        <p class="joke-text setup-text">${jokes[currentJokeIndex].setup}</p>
        <hr class="my-3">
        <p class="joke-text punchline-text text-primary fw-bold">${punchline}</p>
        <div class="mt-3">
            <button class="btn btn-success btn-sm me-2" onclick="rateJoke('좋아요')">
                <i class="bi bi-hand-thumbs-up"></i> 웃겨요!
            </button>
            <button class="btn btn-secondary btn-sm" onclick="rateJoke('별로')">
                <i class="bi bi-hand-thumbs-down"></i> 별로네요...
            </button>
        </div>
    `;
    
    // 펀치라인 애니메이션
    setTimeout(() => {
        const punchlineText = content.querySelector('.punchline-text');
        punchlineText.style.animation = 'fadeInUp 0.6s ease';
    }, 100);
}

// 개그 평가
function rateJoke(rating) {
    const content = jokeDisplay.querySelector('.joke-content');
    let message, icon, className;
    
    if (rating === '좋아요') {
        message = "감사합니다! 😄";
        icon = "bi-heart-fill";
        className = "text-danger";
    } else {
        message = "다음엔 더 재밌는 걸로! 😅";
        icon = "bi-emoji-frown";
        className = "text-muted";
    }
    
    // 평가 결과 표시
    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'mt-3 p-2 rounded bg-light';
    ratingDiv.innerHTML = `
        <i class="bi ${icon} ${className}"></i>
        <small class="ms-1">${message}</small>
    `;
    
    content.appendChild(ratingDiv);
    
    // 버튼들 숨기기
    const buttons = content.querySelectorAll('.btn');
    buttons.forEach(btn => btn.style.display = 'none');
}

// 버튼 애니메이션
function animateButton() {
    getJokeBtn.classList.add('loading');
    getJokeBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
        개그 준비중...
    `;
    
    setTimeout(() => {
        getJokeBtn.classList.remove('loading');
        getJokeBtn.innerHTML = `
            <i class="bi bi-dice-3"></i>
            새로운 개그 들려줘!
        `;
    }, 1000);
}

// 개그 카운트 업데이트
function updateJokeCount() {
    jokeCountElement.textContent = jokeCount;
    jokeCountElement.classList.add('counter-animation');
    
    setTimeout(() => {
        jokeCountElement.classList.remove('counter-animation');
    }, 300);
    
    // 마일스톤 체크
    checkMilestone();
}

// 추가 이스터 에그 - 10개 이상 들으면 특별 메시지
function checkMilestone() {
    if (jokeCount === 10) {
        showSpecialMessage("와! 벌써 10개나 들었네요! 🎉", "축하합니다!");
    } else if (jokeCount === 25) {
        showSpecialMessage("25개 달성! 진정한 아재개그 마니아! 👑", "레전드!");
    } else if (jokeCount === 50) {
        showSpecialMessage("50개 돌파! 이제 당신도 아재개그 마스터! 🏆", "마스터!");
    }
}

// 특별 메시지 표시
function showSpecialMessage(message, title) {
    const toast = document.createElement('div');
    toast.className = 'toast position-fixed top-0 end-0 m-3';
    toast.innerHTML = `
        <div class="toast-header bg-warning">
            <i class="bi bi-star-fill text-white me-2"></i>
            <strong class="me-auto">${title}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // 토스트 제거
    toast.addEventListener('hidden.bs.toast', () => {
        document.body.removeChild(toast);
    });
} 