document.addEventListener("DOMContentLoaded", () => {
    // Приховуємо лоадер через 1 сек
    setTimeout(() => {
        const loader = document.getElementById("intro-loader");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => loader.style.display = "none", 500);
        }
    }, 1000);

    // Логіка перемикання днів у розкладі
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            loadSchedule(btn.getAttribute("data-day"));
        });
    });

    loadSchedule("today");
});

function loadSchedule(day) {
    const container = document.getElementById("schedule-container");
    if (!container) return;

    // Отримуємо дані з localStorage (якщо адмінка зберегла їх)
    let scheduleData = JSON.parse(localStorage.getItem("pixel_tv_schedule")) || {
        today: [
            { time: "18:00", title: "Вечірній кінопоказ", desc: "Обрані художні фільми без перерв на рекламу." },
            { time: "20:00", title: "Анімаційний блок", desc: "Улюблені мультфільми для всієї родини." }
        ],
        tomorrow: [
            { time: "14:00", title: "Днівний сеанс", desc: "Добірка пригодницького кіно." }
        ]
    };

    const currentList = scheduleData[day] || [];
    
    if (currentList.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 20px;">На цей день розклад поки що порожній.</p>`;
        return;
    }

    container.innerHTML = currentList.map(item => `
        <div class="schedule-row">
            <div class="schedule-time">${item.time}</div>
            <div class="schedule-info">
                <h3>${item.title}</h3>
                <p>${item.desc || ""}</p>
            </div>
            <button class="reminder-btn" onclick="toggleReminder(this)">
                <i class="fa-regular fa-bell"></i> Нагадати
            </button>
        </div>
    `).join("");
}

function toggleReminder(btn) {
    btn.classList.toggle("active");
    const isChecked = btn.classList.contains("active");
    btn.innerHTML = isChecked ? '<i class="fa-solid fa-bell"></i> Нагадування є' : '<i class="fa-regular fa-bell"></i> Нагадати';
    
    const toast = document.getElementById("toast-notification");
    if (toast) {
        toast.textContent = isChecked ? "Нагадування встановлено!" : "Нагадування скасовано!";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2500);
    }
}
