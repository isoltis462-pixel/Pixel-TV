document.addEventListener("DOMContentLoaded", () => {
    // Примусово ховаємо лоадер через 1 секунду
    setTimeout(() => {
        const loader = document.getElementById("intro-loader");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
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

    let scheduleData = JSON.parse(localStorage.getItem("pixel_tv_schedule"));
    
    if (!scheduleData) {
        scheduleData = {
            today: [
                { time: "12:00", title: "Мультпарад Pixel", desc: "Найкращі дитячі мультсеріали." },
                { time: "15:30", title: "Кінохіт дня", desc: "Популярна художня стрічка." },
                { time: "20:00", title: "Вечірній сеанс", desc: "Прем'єрний показ блоку." }
            ],
            tomorrow: [
                { time: "10:00", title: "Ранкова казка", desc: "Добірка анімації для бадьорого ранку." },
                { time: "18:00", title: "Пригодницьке кіно", desc: "Захопливі фільми для всієї родини." }
            ]
        };
    }

    const currentList = scheduleData[day] || [];
    
    if (currentList.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 20px;">На цей день розклад поки не додано.</p>`;
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
