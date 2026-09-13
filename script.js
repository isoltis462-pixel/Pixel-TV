document.addEventListener('DOMContentLoaded', () => {
    
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
