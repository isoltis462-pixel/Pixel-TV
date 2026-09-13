/* ==========================================
   PIXEL TV — Studio Logic (script.js)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Управління кнопками "Нагадати" у розкладі
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

    // Функція показу спливаючого Toast-повідомлення
    function showToast(message) {
        const toast = document.getElementById('toast-notification');
        if (!toast) return;
        
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 2. Перемикання днів у розкладі (ТВ-гід)
    const tabButtons = document.querySelectorAll('.schedule-tabs .tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Тут можна додати підвантаження розкладу для обраного дня
            const day = btn.getAttribute('data-day');
            console.2str ? console.log(`Обрано день: ${day}`) : null;
        });
    });

    // 3. Мобільне меню (Бургер)
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

    // 4. Імітація оновлення лічильника глядачів у реальному часі
    const viewersSpan = document.getElementById('viewers-count');
    if (viewersSpan) {
        setInterval(() => {
            let currentViewers = parseInt(viewersSpan.textContent.replace(/\s/g, '')) || 1234;
            // Випадкова зміна кількості глядачів на невелику величину (+/- кілька людей)
            let change = Math.floor(Math.random() * 11) - 5; 
            currentViewers = Math.max(100, currentViewers + change);
            viewersSpan.textContent = currentViewers.toLocaleString('uk-UA');
        }, 6000);
    }

});
