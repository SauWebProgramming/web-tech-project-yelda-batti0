[
    {
        "id":1, 
        "title": "Proje 1: Adam Asmaca Oyunu",
        "description": "Python programlama dilinde yapmış olduğum adam asmaca oyunu",
        "image": "https://via.placeholder.com/300",
        "link": "#"

    }, 

    {
        "id":2,
        "title":"Proje 2: Responsive Site",
        "description": "HTML, CSS ve JAVASCRIPT Kullanarak yapmış olduğum resposive site örneği",
        "image":"https://via.placeholder.com/300",
        "link": "#"
    },

    {
        "id":3,
        "title":"Proje 3: Captcha App",
        "description": "C# Programlama dilini kullanarak yapmış olduğum basit bir captcha uygulaması",
        "image":"https://via.placeholder.com/300",
        "link": "#"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    
    
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    // 2. Her bir menü linkine tıklama olayı 
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Sayfanın yenilenmesini önlemek

            // Tıklanan linkin hedefi
            const targetId = link.getAttribute('href').substring(1); 
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                //Tüm bölümleri gizle
                sections.forEach(section => {
                    section.classList.remove('active');
                });

                //Hedef bölümü göster
                targetSection.classList.add('active');

                //URL'i güncelle (Sayfa yenilenmeden adres çubuğu değişir)
                
                history.pushState(null, null, `#${targetId}`);

               
                navLinks.forEach(nav => nav.classList.remove('active-link'));
                link.classList.add('active-link');
            }
        });
    });

    // 
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        const initialSection = document.getElementById(initialHash);
        const initialLink = document.querySelector(`.nav-link[href="#${initialHash}"]`);
        
        if (initialSection) {
           
            sections.forEach(sec => sec.classList.remove('active'));
            initialSection.classList.add('active');
            
            // Linki aktifleştir
            if (initialLink) initialLink.classList.add('active-link');
        }
    }
});


/* -------------------------------------------------------
   VERİ ÇEKME FONKSİYONLARI (FETCH API)
------------------------------------------------------- */

const projectsContainer = document.getElementById('projects-container');

async function loadProjects() {
    try {
        
        const response = await fetch('data/projects.json');
        
        
        const projects = await response.json();

        
        projectsContainer.innerHTML = ''; 

        projects.forEach(project => {
            
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

            
            projectsContainer.appendChild(projectCard);
        });

    } catch (error) {
        console.error("Veri çekilirken hata oluştu:", error);
        projectsContainer.innerHTML = '<p>Projeler yüklenirken bir hata oluştu.</p>';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    
});