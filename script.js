document.addEventListener('DOMContentLoaded', () => {

    // ГОЛОВНИЙ ПЕРЕМИКАЧ ЕФІРУ:
    // true — ефір іде (показується плеєр і статус "В ефірі")
    // false — ефір завершено (показується заставка і статус "Ефір завершено")
    const isLiveNow = true; 

    const statusBadge = document.getElementById('site-status-badge');
    const statusText = document.getElementById('status-text');
    const mainVideo = document.getElementById('main-video');
    const offlineScreen = document.getElementById('offline-screen');

    if (isLiveNow) {
        statusBadge.classList.remove('offline');
        statusText.textContent = "В ефірі";
        if (mainVideo) mainVideo.style.display = 'block';
        if (offlineScreen) offlineScreen.style.display = 'none';
    } else {
        statusBadge.classList.add('offline');
        statusText.textContent = "Ефір завершено";
        if (mainVideo) mainVideo.style.display = 'none';
        if (offlineScreen) offlineScreen.style.display = 'flex';
    }
    
    window.toggleReminder = function(buttonElement, showName) {
        const isActive = buttonElement.classList.contains('active');
        
        if (!isActive) {
            buttonElement.classList.add('active');
            buttonElement.innerHTML = '<i class="fa-solid fa-check"></i> Нагадали';
            showToast(`Нагадування для «${showName}» успішно встановлено!`);
        } else {
            buttonElement.classList.remove('active');
            buttonElement.innerHTML = '<i class="fa-regular fa-bell"></i> Нагадати';
            showToast(`Нагадування для «${showName}» скасовано.`);
        }
    };

    function showToast(message) {
        const toast = document.getElementById('toast-notification');
        if (!toast) return;
        
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    const tabButtons = document.querySelectorAll('.schedule-tabs .tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const day = btn.getAttribute('data-day');
            console.log(`Обрано день: ${day}`);
        });
    });

    const burgerBtn = document.getElementById('burger-btn');
    const mainNav = document.querySelector('.main-nav');

    if (burgerBtn && mainNav) {
        burgerBtn.addEventListener('click', () => {
            if (mainNav.style.display === 'flex') {
                mainNav.style.display = 'none';
            } else {
                mainNav.style.display = 'flex';
                mainNav.style.flexDirection = 'column';
                mainNav.style.position = 'absolute';
                mainNav.style.top = '72px';
                mainNav.style.left = '0';
                mainNav.style.width = '100%';
                mainNav.style.backgroundColor = 'var(--bg-deep)';
                mainNav.style.padding = '20px 40px';
                mainNav.style.borderBottom = '1px solid var(--border-color)';
            }
        });
    }

});
