document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. BÖLÜM: SPA MENÜ GEÇİŞLERİ (NAVİGASYON) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Sayfa yenilenmesini engelle

            // Hedef bölümü bul (Örn: #projects -> projects)
            const targetId = link.getAttribute('href').substring(1); 
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Tüm bölümleri gizle
                sections.forEach(section => {
                    section.classList.remove('active');
                });

                // Hedef bölümü göster
                targetSection.classList.add('active');

                // URL'i güncelle
                history.pushState(null, null, `#${targetId}`);

                // Menüdeki aktiflik durumunu güncelle
                navLinks.forEach(nav => nav.classList.remove('active-link'));
                link.classList.add('active-link');
            }
        });
    });

    // Sayfa yenilendiğinde doğru bölümü aç (URL kontrolü)
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        const initialSection = document.getElementById(initialHash);
        const initialLink = document.querySelector(`.nav-link[href="#${initialHash}"]`);
        
        if (initialSection) {
            sections.forEach(sec => sec.classList.remove('active'));
            initialSection.classList.add('active');
            if (initialLink) initialLink.classList.add('active-link');
        }
    }

    // --- 2. BÖLÜM: PROJELERİ JSON'DAN ÇEKME (FETCH API) ---
    loadProjects();
});

// Projeleri Yükleyen Fonksiyon
async function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    // Eğer proje kutusu HTML'de yoksa hata vermesin diye kontrol
    if (!projectsContainer) return;

    try {
        // data klasöründeki projects.json dosyasını oku
        const response = await fetch('data/projects.json');
        
        // Gelen cevabı JSON formatına çevir
        const projects = await response.json();

        // Önce kutunun içini temizle
        projectsContainer.innerHTML = '';

        // Her proje için döngü kur
        projects.forEach(project => {
            // Yeni bir div oluştur
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            // İçeriğini doldur (JSON verileri buraya yerleşiyor)
            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <span class="category">${project.category}</span>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank" class="btn">İncele <i class="fas fa-arrow-right"></i></a>
                </div>
            `;

            // Kartı ana kutuya ekle
            projectsContainer.appendChild(projectCard);
        });

    } catch (error) {
        console.error("Projeler yüklenirken hata oluştu:", error);
        projectsContainer.innerHTML = '<p style="text-align:center; color:red;">Projeler yüklenemedi. Lütfen Live Server kullandığınızdan emin olun.</p>';
    }
}