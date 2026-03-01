



// Simple show/hide password (demo) --->>>> for singup.html
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling;
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
  });
});


//  Same password toggle script as above ----->>> signIn.html
document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        const icon = btn.querySelector('i');
        if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
});


// for user dashboard funcationality

// ───────────────────────────────────────────────
// Mobile Hamburger Menu
// ───────────────────────────────────────────────
function initMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // Create hamburger if not present
    let hamburger = document.querySelector('.hamburger');
    if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        hamburger.setAttribute('aria-label', 'Toggle navigation');
        document.querySelector('.welcome-header')?.prepend(hamburger);
    }

    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        const icon = hamburger.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return;
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
            sidebar.classList.remove('open');
            const icon = hamburger.querySelector('i');
            if (icon) icon.classList.replace('fa-times', 'fa-bars');
        }
    });
}

// ───────────────────────────────────────────────
// Theme toggle (dark ↔ light)
// ───────────────────────────────────────────────
function initThemeToggle() {
    const body = document.body;
    let toggleBtn = document.querySelector('.theme-toggle');

    // Create toggle button if missing
    if (!toggleBtn) {
        toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        toggleBtn.setAttribute('aria-label', 'Toggle theme');
        document.querySelector('.welcome-header')?.appendChild(toggleBtn);
    }

    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    toggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light')) {
            body.classList.remove('light');
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ───────────────────────────────────────────────
// Start Workout button – fake start + feedback
// ───────────────────────────────────────────────
function initStartWorkout() {
    const btn = document.querySelector('.btn-start-workout');
    if (!btn) return;

    btn.addEventListener('click', () => {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Starting...';

        setTimeout(() => {
            alert("Workout session started!\n\n(In a real app this would load the workout player / video / timer)");
            btn.innerHTML = "<i class='fas fa-play'></i> Start Today's Workout";
            btn.disabled = false;
        }, 1800);
    });
}

// ───────────────────────────────────────────────
// Mark activities as viewed / completed
// ───────────────────────────────────────────────
function initActivityTracking() {
    const items = document.querySelectorAll('.activity-item, .plan-card');

    items.forEach(item => {
        const key = 'viewed-' + (item.querySelector('h3')?.textContent || '').trim().replace(/\s+/g, '-').toLowerCase();

        // Check if already viewed
        if (localStorage.getItem(key) === 'true') {
            item.classList.add('viewed');
            const status = item.querySelector('.status') || item.querySelector('button');
            if (status) {
                if (status.tagName === 'SPAN') {
                    status.textContent = 'Viewed';
                    status.className = 'status viewed';
                } else {
                    status.textContent = 'Viewed';
                    status.disabled = true;
                }
            }
        }

        // Click to mark as viewed
        item.addEventListener('click', () => {
            if (!item.classList.contains('viewed')) {
                item.classList.add('viewed');
                localStorage.setItem(key, 'true');

                const status = item.querySelector('.status') || item.querySelector('button');
                if (status) {
                    if (status.tagName === 'SPAN') {
                        status.textContent = 'Viewed';
                        status.className = 'status viewed';
                    } else {
                        status.textContent = 'Viewed';
                        status.disabled = true;
                    }
                }
            }
        });
    });
}

// ───────────────────────────────────────────────
// Fake live calorie / streak update (demo)
// ───────────────────────────────────────────────
function fakeLiveStats() {
    const calorieEl = document.querySelector('.stat-value');
    const streakEl = document.querySelector('.streak-card .stat-value');

    if (!calorieEl || !streakEl) return;

    let calories = parseInt(calorieEl.textContent.replace(/,/g, '')) || 1842;
    let streak = parseInt(streakEl.textContent) || 19;

    setInterval(() => {
        // Add 4–12 kcal every ~12–25 seconds
        if (Math.random() > 0.4) {
            calories += Math.floor(Math.random() * 9) + 4;
            calorieEl.textContent = calories.toLocaleString();
        }

        // Very rarely increase streak (just for fun)
        if (Math.random() < 0.008) {
            streak++;
            streakEl.textContent = streak;
        }
    }, 14000);
}

// ───────────────────────────────────────────────
// Initialize everything when page loads
// ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initThemeToggle();
    initStartWorkout();
    initActivityTracking();
    fakeLiveStats();
});