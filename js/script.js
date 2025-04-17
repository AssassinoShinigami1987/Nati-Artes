// Dados de exemplo para a galeria
const galleryData = [
    {
        id: 1,
        title: "Muitos Gatos",
        image: "images/arte_1.jpeg",
        description: "Arte digital retratando retratando o melhor desenvolvedor e gatos",
        category: "digital"
    },
    {
        id: 2,
        title: "Retrato com Fones",
        image: "images/arte_2.jpeg",
        description: "Arte digital de um retrato estilizado com fones de ouvido",
        category: "digital"
    }
];

// Elementos do DOM
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const galleryGrid = document.querySelector('.gallery-grid');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const heroSection = document.querySelector('.hero');

// Criar partículas
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Efeito de digitação
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Toggle do modo claro/escuro
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    
    // Atualizar partículas
    document.querySelector('.particles').remove();
    createParticles();
});

// Menu mobile aprimorado
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Fechar menu ao redimensionar a tela para desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Formulário de contato com animação
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Efeito de loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    // Simular envio
    setTimeout(() => {
        console.log('Mensagem:', { name, email, message });
        submitBtn.textContent = originalText;
        
        // Efeito de sucesso
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso!';
        e.target.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
            e.target.reset();
        }, 3000);
    }, 1500);
});

// Visualização de imagem em tela cheia
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalCaption = document.querySelector('.modal-caption');
const closeModal = document.querySelector('.close-modal');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentImageIndex = 0;

function openModal(image, index) {
    imageModal.classList.add('active');
    modalImage.src = image.src;
    modalCaption.textContent = galleryData[index].title + ' - ' + galleryData[index].description;
    currentImageIndex = index;
    document.body.style.overflow = 'hidden';
    updateNavigationButtons();
}

function closeImageModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateImage(direction) {
    currentImageIndex = (currentImageIndex + direction + galleryData.length) % galleryData.length;
    modalImage.src = galleryData[currentImageIndex].image;
    modalCaption.textContent = galleryData[currentImageIndex].title + ' - ' + galleryData[currentImageIndex].description;
    updateNavigationButtons();
}

function updateNavigationButtons() {
    prevBtn.style.display = galleryData.length > 1 ? 'block' : 'none';
    nextBtn.style.display = galleryData.length > 1 ? 'block' : 'none';
}

// Carregar galeria com efeitos e adicionar eventos de clique
function loadGallery() {
    galleryGrid.innerHTML = '';
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';

    galleryData.forEach((item, index) => {
        if (activeFilter === 'all' || item.category === activeFilter) {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.animationDelay = `${index * 0.1}s`;
            
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-item-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            
            // Adicionar evento de clique para abrir o modal
            const img = galleryItem.querySelector('img');
            img.addEventListener('click', () => openModal(img, index));
            
            galleryGrid.appendChild(galleryItem);
        }
    });
}

// Filtros da galeria
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active')?.classList.remove('active');
        btn.classList.add('active');
        loadGallery();
    });
});

// Eventos do modal de imagem
closeModal.addEventListener('click', closeImageModal);
prevBtn.addEventListener('click', () => navigateImage(-1));
nextBtn.addEventListener('click', () => navigateImage(1));

// Fechar modal com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeImageModal();
    } else if (e.key === 'ArrowLeft') {
        navigateImage(-1);
    } else if (e.key === 'ArrowRight') {
        navigateImage(1);
    }
});

// Fechar modal clicando fora da imagem
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        closeImageModal();
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    loadGallery();
    
    // Efeito de digitação no hero
    const heroTitle = document.querySelector('.hero-content h2');
    typeWriter(heroTitle, heroTitle.textContent);
    
    // Verificar preferência de tema do usuário
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Adicionar scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Efeito de parallax no hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}); 