document.addEventListener("DOMContentLoaded", () => {

    // --- INSERT AT TOP OF DOMContentLoaded ---
    
    const loginOverlay = document.getElementById('login-overlay');
    const loginBtn = document.getElementById('login-btn');
    const userInput = document.getElementById('username-input');
    const passInput = document.getElementById('password-input');
    const errorMsg = document.getElementById('error-msg');

    function checkLogin() {
        const user = userInput.value.trim();
        const pass = passInput.value.trim();

        // Check credentials
        if (user === 'EVO' && pass === '12345') {
            // Fade out overlay
            loginOverlay.style.transition = 'opacity 0.5s';
            loginOverlay.style.opacity = '0';
            setTimeout(() => {
                loginOverlay.style.display = 'none';
                // Start presentation & trigger animation
                showSlide(0); 
            }, 500);
        } else {
            // Show error and shake
            errorMsg.style.display = 'block';
            loginOverlay.classList.add('shake'); 
            setTimeout(() => loginOverlay.classList.remove('shake'), 500);
        }
    }

    loginBtn.addEventListener('click', checkLogin);
    
    // Allow "Enter" key
    passInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkLogin();
    });
    
    // --- END INSERT ---

    // --- NAVIGATION LOGIC ---
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i < index) slide.style.transform = 'translateX(-100%)';
            else if (i > index) slide.style.transform = 'translateX(100%)';
            else slide.style.transform = 'translateX(0)';
        });

        const activeSlide = slides[index];
        activeSlide.classList.add("active");
        currentSlide = index;

        // --- ANIMATION TRIGGER ---
        // Look for a chart inside the active slide and restart its animation
        const canvas = activeSlide.querySelector('canvas');
        if (canvas) {
            // Chart.js method to find the chart instance attached to this canvas
            const chartInstance = Chart.getChart(canvas);
            if (chartInstance) {
                chartInstance.reset(); // Resets elements to their initial state
                chartInstance.update(); // Triggers the animation again
            }
        }

        // Update buttons
        prevBtn.disabled = (currentSlide === 0);
        nextBtn.disabled = (currentSlide === slides.length - 1);
    }

    nextBtn.addEventListener("click", () => { if (currentSlide < slides.length - 1) showSlide(currentSlide + 1); });
    prevBtn.addEventListener("click", () => { if (currentSlide > 0) showSlide(currentSlide - 1); });
    

    // --- GLOBAL CHART SETTINGS ---
    const colorPrimary = 'rgba(54, 162, 235, 0.7)'; 
    const colorPrimaryBorder = 'rgba(54, 162, 235, 1)';
    const colorSecondary = 'rgba(255, 99, 132, 0.7)';
    const colorTertiary = 'rgba(75, 192, 192, 0.7)';
    
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000, // Increased duration for more dramatic effect
            easing: 'easeOutQuart'
        }
    };

    // --- CHART 1: TOTAL ENTRIES (Bar) ---
    new Chart(document.getElementById('entriesChart'), {
        type: 'bar',
        data: {
            labels: ['2021/22', '2022/23', '2023/24', '2024/25'],
            datasets: [{
                label: 'Apmeklējumi',
                data: [23271, 38266, 46389, 54947],
                backgroundColor: colorPrimary,
                borderColor: colorPrimaryBorder,
                borderWidth: 1
            }]
        },
        options: { ...commonOptions, plugins: { legend: { display: false } } }
    });

    // --- CHART 2: ENTRIES BY GENDER (Doughnut) ---
    new Chart(document.getElementById('entriesGenderChart'), {
        type: 'doughnut',
        data: {
            labels: ['Sievietes', 'Vīrieši', 'Citi'],
            datasets: [{
                data: [29899, 24964, 84],
                backgroundColor: [colorSecondary, colorPrimary, '#ffce56'],
                borderWidth: 1
            }]
        },
        options: { ...commonOptions, plugins: { legend: { position: 'bottom' } } }
    });

    // --- CHART 3: CLASS MEMBERS BY GENDER (Doughnut) ---
    new Chart(document.getElementById('membersGenderChart'), {
        type: 'doughnut',
        data: {
            labels: ['Sievietes', 'Vīrieši'],
            datasets: [{
                data: [10120, 1280],
                backgroundColor: [colorSecondary, colorPrimary, '#ffce56'],
                borderWidth: 1
            }]
        },
        options: { ...commonOptions, plugins: { legend: { position: 'bottom' } } }
    });

    // --- CHART 4: CLASSES OFFERED TOTAL (Bar) ---
    new Chart(document.getElementById('classesOfferedChart'), {
        type: 'bar',
        data: {
            labels: ['2021/22', '2022/23', '2023/24', '2024/25'],
            datasets: [{
                label: 'Novadītās nodarbības',
                data: [797, 1292, 1991, 2251],
                backgroundColor: colorTertiary,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: { ...commonOptions, plugins: { legend: { display: false } } }
    });

    // --- CHART 5: TOP 10 CLASSES OFFERED (Horizontal Bar) ---
    new Chart(document.getElementById('topClassesOfferedChart'), {
        type: 'bar',
        data: {
            labels: ['TRX FUNCTIONAL', 'LADY\'s ONLY', '#ReShape', 'Veselības vingr.', 'TABATA', 'Pilates', 'BODYART', 'Veselā Mugura', 'ANTIGRAVITY', '#ReBel'],
            datasets: [{
                label: 'Skaits',
                data: [250, 193, 146, 107, 100, 95, 93, 91, 89, 85],
                backgroundColor: 'rgba(153, 102, 255, 0.7)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: { ...commonOptions, indexAxis: 'y', plugins: { legend: { display: false } } }
    });

    // --- CHART 6: CLASS ATTENDANCE TOTALS (Bar) ---
    new Chart(document.getElementById('classAttendanceChart'), {
        type: 'bar',
        data: {
            labels: ['2021/22', '2022/23', '2023/24', '2024/25'],
            datasets: [{
                label: 'Apmeklētāji',
                data: [3701, 4020, 7779, 11411],
                backgroundColor: '#e4c1f9',
                borderColor: '#e4c1f9',
                borderWidth: 1
            }]
        },
        options: { ...commonOptions, plugins: { legend: { display: false } } }
    });

    // --- CHART 7: TOP 10 ATTENDED CLASSES (Horizontal Bar) ---
    new Chart(document.getElementById('topClassesAttendedChart'), {
        type: 'bar',
        data: {
            labels: ['TRX FUNCTIONAL', 'LADY\'s ONLY', 'Veselības vingr.', '#ReShape', 'TABATA', 'BODYART', 'Veselā Mugura', 'Pilates', '#ReBel', 'BOKSS SIEVIETĒM'],
            datasets: [{
                label: 'Apmeklētāji',
                data: [1779, 1722, 1071, 1025, 815, 699, 648, 616, 508, 467],
                backgroundColor: '#ff006e',
                borderColor: '#ff006e',
                borderWidth: 1
            }]
        },
        options: { ...commonOptions, indexAxis: 'y', plugins: { legend: { display: false } } }
    });

    // --- CHART 8: UNIQUE MEMBERS GROWTH (Line) ---
    new Chart(document.getElementById('uniqueMembersChart'), {
        type: 'line',
        data: {
            labels: ['2021/22', '2022/23', '2023/24', '2024/25'],
            datasets: [{
                label: 'Unikālie biedri',
                data: [194, 199, 261, 338],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: { 
            ...commonOptions, 
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });

    // --- CHART 9: TRAINER PERFORMANCE (Bubble Chart) ---
    // x = Members Served, y = Classes Taught, r = Unique Members (scaled down)
    new Chart(document.getElementById('trainerBubbleChart'), {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Treneri',
                data: [
                    { x: 3081, y: 340, r: 175/5, name: 'Egija Gudermane' },   
                    { x: 1640, y: 239, r: 127/5, name: 'Sergejs Protasovs' }, 
                    { x: 3806, y: 451, r: 120/5, name: 'Ksenia Ivaniuk' },    
                    { x: 391,  y: 116, r: 88/5,  name: 'Ludmila Šafare' },
                    { x: 953,  y: 145, r: 83/5,  name: 'Edijs Cīrulis' },
                    { x: 318,  y: 53,  r: 73/5,  name: 'Alla Stroikova' },
                    { x: 518,  y: 121, r: 48/5,  name: 'Olga Lazareva' },
                    { x: 143,  y: 30,  r: 44/5,  name: 'Zane Krēsliņa' },
                    { x: 508,  y: 86,  r: 35/5,  name: 'Imants Dolgins' }
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',  
                    'rgba(54, 162, 235, 0.7)',  
                    'rgba(255, 206, 86, 0.7)',  
                    'rgba(75, 192, 192, 0.7)',  
                    'rgba(153, 102, 255, 0.7)', 
                    'rgba(255, 159, 64, 0.7)',  
                    'rgba(201, 203, 207, 0.7)', 
                    'rgba(255, 100, 200, 0.7)', 
                    'rgba(100, 200, 100, 0.7)'  
                ]
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        // CUSTOM MULTI-LINE TOOLTIP
                        label: function(context) {
                            const point = context.raw;
                            const uniqueCount = point.r * 5; // Scale back up to show real number
                            return [
                                `${point.name}`,
                                `Unikālie biedri: ${uniqueCount}`,
                                `Kopā apkalpotie: ${point.x}`,
                                `Novadītās nodarbības: ${point.y}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Kopā Apkalpotie' },
                    beginAtZero: true
                },
                y: {
                    title: { display: true, text: 'Novadītās Nodarbības' },
                    beginAtZero: true
                }
            }
        }
    });

    // --- NEW CHART 10: TOP 10 MEMBERS BY ENTRIES (Horizontal Bar) ---
    new Chart(document.getElementById('topMembersEntriesChart'), {
        type: 'bar',
        data: {
            labels: ['Viktorija Springe', 'Marina Tujeva', 'Davis Lismanis', 'Matiass Ābeltiņš', 'Markuss Menģelis', 'Felikss Kozlovskis', 'Olegs Larins', 'Evija Opaļko', 'Svetlana Goroškova', 'Olga Žemčugova'],
            datasets: [{
                label: 'Ieejas',
                data: [272, 252, 236, 224, 222, 212, 200, 195, 188, 188],
                backgroundColor: 'rgba(54, 162, 235, 0.7)', // Blue
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            ...commonOptions,
            indexAxis: 'y', // Horizontal bars
            plugins: { legend: { display: false } }
        }
    });

    // --- NEW CHART 11: TOP 10 MEMBERS BY CLASS ATTENDANCE (Horizontal Bar) ---
    new Chart(document.getElementById('topMembersClassesChart'), {
        type: 'bar',
        data: {
            labels: ['Marina Tujeva', 'Olga Žemčugova', 'Kristine Pazare', 'Viktorija Springe', 'Ekaterina Brale', 'Kristīne Matačina', 'Līga Vilkaplatere', 'Mārīte Kolberga', 'Elīna Veinberga', 'Sanita Freiberga'],
            datasets: [{
                label: 'Nodarbības',
                data: [246, 224, 181, 178, 177, 175, 158, 156, 152, 151],
                backgroundColor: 'rgba(153, 102, 255, 0.7)', // Orange
                borderColor: 'rgba(153, 102, 255, 0.7)',
                borderWidth: 1
            }]
        },
        options: {
            ...commonOptions,
            indexAxis: 'y', // Horizontal bars
            plugins: { legend: { display: false } }
        }
    });

});
