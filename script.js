document.addEventListener('DOMContentLoaded', () => {

    const savedLiveStatus = localStorage.getItem('pixel_is_live');
    const isLiveNow = savedLiveStatus !== null ? savedLiveStatus === 'true' : true;

    const savedShowTitle = localStorage.getItem('pixel_show_title');
    if (savedShowTitle) {
        const titleElement = document.getElementById('current-show-title');
        if (titleElement) titleElement.textContent = savedShowTitle;
    }

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
    
    // Динамічне завантаження розкладу (сьогодні / завтра)
    const defaultSchedule = {
        today: [
            { time: "12:00", title: "Ранковий мульт-марафон", desc: "Добірка короткометражних анімацій." },
            { time: "15:00", title: "Пригодницький фільм", desc: "Захоплива художня стрічка." },
            { time: "19:00", title: "Вечірній кіносеанс", desc: "Головний фільм вечора." }
        ],
        tomorrow: [
            { time: "10:00", title: "Дитячий блок", desc: "Мультсеріали зранку." },
            { time: "16:00", title: "Фантастичний бойовик", desc: "Видовищні спецтефекти." }
        ]
    };

    let siteSchedule = defaultSchedule;
    const savedSchedule = localStorage.getItem('pixel_schedule');
    if (savedSchedule) {
        try {
            siteSchedule = JSON.parse(savedSchedule);
        } catch(e) {}
    }

    function renderScheduleList(dayKey) {
        const container = document.getElementById('schedule-container');
        if (!container) return;
        
        container.innerHTML = '';
        const items = siteSchedule[dayKey] || [];

        if (items.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); padding: 20px;">На цей день розклад поки не додано.</p>';
            return;
        }

        items.forEach((item, index) => {
            const isCurrent = (dayKey === 'today' && index === 2); // приклад підсвітки
            container.innerHTML += `
                <div class="schedule-row ${isCurrent ? 'current' : ''}">
                    <div class="schedule-time">${item.time}</div>
                    <div class="schedule-info">
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                    </div>
                    <button class="reminder-btn ${isCurrent ? 'active' : ''}" onclick="toggleReminder(this, '${item.title}')">
                        ${isCurrent ? '<i class="fa-solid fa-check"></i> Нагадали' : '<i class="fa-regular fa-bell"></i> Нагадати'}
                    </button>
                </div>
            `;
        });
    }

    renderScheduleList('today');

    const tabButtons = document.querySelectorAll('.schedule-tabs .tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const day = btn.getAttribute('data-day');
            renderScheduleList(day);
        });
    });

    window.toggleReminder = function(buttonElement, showName) {
        const isActive = buttonElement.classList.contains('active');
        if (!isActive) {
            buttonElement.classList.add('active');
            buttonElement.innerHTML = '<i class="fa-solid fa-check"></i> Нагадали';
            showToast(`Нагадування для «${showName}» встановлено!`);
        } else {
            buttonElement.classList.remove('active');
            buttonElement.innerHTML = '<i class="fa-regular fa-bell"></i> Нагадати';
            showToast(`Нагадування скасовано.`);
        }
    };

    function showToast(message) {
        const toast = document.getElementById('toast-notification');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 3000);
    }

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
