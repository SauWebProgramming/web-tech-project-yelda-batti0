document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. BÖLÜM: SPA MENÜ GEÇİŞLERİ (NAVİGASYON) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Sayfa yenilenmesini engelle

            
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

// --- 3. BÖLÜM: İLETİŞİM FORMU KONTROLÜ ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // SAYFANIN YENİLENMESİNİ ENGELLEYEN KISIM

         
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

          
            if (name.length < 3) {
                showAlert('İsim en az 3 karakter olmalıdır.', 'error');
                return;
            }

            if (message.length < 10) {
                showAlert('Mesajınız çok kısa. Lütfen en az 10 karakter yazın.', 'error');
                return;
            }

            
            showAlert(`Teşekkürler ${name}! Mesajınız başarıyla alındı.`, 'success');
            
            // Formu temizleme
            contactForm.reset();
        });
    }

    
    function showAlert(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = type; 
        
        
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = '';
        }, 5000);
    }

    // --- 4. BÖLÜM: HAMBURGER MENÜ KONTROLÜ ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Menüyü aç/kapa 
            navMenu.classList.toggle('open');
            
            
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Çarpı ikonu
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // Hamburger ikonu
            }
        });
    }

   
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                
               
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });