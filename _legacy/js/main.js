// main.js - الملف الرئيسي للوظائف الأمامية
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.add('active');
        });
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    }
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                if (nav) nav.classList.remove('active');
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                service: document.getElementById('service') ? document.getElementById('service').value : 'عام'
            };
            
            // Validate data
            if (!formData.name || !formData.phone || !formData.message) {
                showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            if (!DatabaseUtils.validateSaudiPhone(formData.phone)) {
                showNotification('يرجى إدخال رقم هاتف سعودي صحيح', 'error');
                return;
            }
            
            if (formData.email && !DatabaseUtils.validateEmail(formData.email)) {
                showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            // Save to database
            db.addContact(formData);
            
            // Show success message
            showNotification('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // زيادة عداد الزيارات
    db.incrementVisitCount();
    
    // تحديث سنة حقوق النشر تلقائياً
    updateCopyrightYear();
    
    // تحميل الإعدادات ديناميكياً
    loadDynamicSettings();
    
    // Load dynamic content based on page
    loadPageContent();
});

function loadPageContent() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    
    switch(page) {
        case 'index.html':
        case '':
            loadHomePage();
            break;
        case 'services.html':
            loadServicesPage();
            break;
        case 'gallery.html':
            loadGalleryPage();
            break;
        case 'about.html':
            loadAboutPage();
            break;
        case 'contact.html':
            loadContactPage();
            break;
    }
}

function loadHomePage() {
    // Load services on home page
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        const services = db.getActiveServices();
        servicesGrid.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-img">
                    <img src="images/${service.image}" alt="${service.title}" onerror="this.src='https://via.placeholder.com/400x300?text=صورة+الخدمة'">
                </div>
                <div class="service-content">
                    <h3>${service.title}</h3>
                    <p>${DatabaseUtils.truncateText(service.description, 120)}</p>
                    <div class="service-features">
                        ${service.features ? service.features.slice(0, 2).map(feature => `
                            <span class="feature-tag">${feature}</span>
                        `).join('') : ''}
                    </div>
                    <a href="services.html" class="btn">المزيد</a>
                </div>
            </div>
        `).join('');
    }
    
    // Load gallery on home page
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        const gallery = db.getActiveGallery();
        galleryGrid.innerHTML = gallery.slice(0, 6).map(item => `
            <div class="gallery-item" data-category="${item.category}">
                <img src="images/${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x300?text=صورة+المشروع'">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
                <div class="gallery-caption">
                    <h4>${item.title}</h4>
                    <span>${item.category}</span>
                </div>
            </div>
        `).join('');
    }
    
    // Load statistics
    loadStatistics();
}

function loadServicesPage() {
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        const services = db.getActiveServices();
        servicesContainer.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-img">
                    <img src="images/${service.image}" alt="${service.title}" onerror="this.src='https://via.placeholder.com/400x300?text=صورة+الخدمة'">
                </div>
                <div class="service-content">
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    <div class="service-features">
                        ${service.features ? service.features.map(feature => `
                            <span class="feature-tag"><i class="fas fa-check"></i> ${feature}</span>
                        `).join('') : ''}
                    </div>
                    <a href="contact.html?service=${encodeURIComponent(service.title)}" class="btn">اطلب الخدمة</a>
                </div>
            </div>
        `).join('');
    }
    
    // Initialize service filtering if exists
    initServiceFiltering();
}

function loadGalleryPage() {
    const galleryContainer = document.getElementById('gallery-container');
    if (galleryContainer) {
        const gallery = db.getActiveGallery();
        galleryContainer.innerHTML = gallery.map(item => `
            <div class="gallery-item" data-category="${item.category}">
                <img src="images/${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x300?text=صورة+المشروع'">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
                <div class="gallery-caption">
                    <h4>${item.title}</h4>
                    <span>${item.category}</span>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Initialize gallery filtering
    initGalleryFiltering();
    
    // Initialize lightbox
    initLightbox();
}

function loadAboutPage() {
    // Load statistics
    loadStatistics();
    
    // Load team members if exists
    loadTeamMembers();
}

function loadContactPage() {
    // Pre-fill service if specified in URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.value = serviceParam;
        }
    }
    
    // Load contact information
    loadContactInformation();
}

function loadStatistics() {
    const stats = db.getStatistics();
    const statsElements = {
        'projects-count': stats.total_projects || '1500+',
        'experience-years': '20+',
        'clients-count': '98%',
        'team-count': '50+'
    };
    
    Object.keys(statsElements).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = statsElements[key];
        }
    });
}

function loadTeamMembers() {
    const teamContainer = document.getElementById('team-container');
    if (teamContainer) {
        // يمكن إضافة فريق العمل من قاعدة البيانات هنا
        const teamMembers = [
            {
                name: 'علي حمود',
                position: 'المؤسس والمدير العام',
                description: 'خبرة 20 عاماً في مجال الألمنيوم والزجاج',
                image: 'team1.jpg'
            },
            {
                name: 'محمد علي',
                position: 'مدير المشاريع',
                description: 'مشرف على تنفيذ المشاريع الكبرى',
                image: 'team2.jpg'
            }
        ];
        
        teamContainer.innerHTML = teamMembers.map(member => `
            <div class="team-member">
                <div class="team-img">
                    <img src="images/${member.image}" alt="${member.name}" onerror="this.src='https://via.placeholder.com/150x150?text=صورة+الفريق'">
                </div>
                <h3>${member.name}</h3>
                <p class="position">${member.position}</p>
                <p class="description">${member.description}</p>
            </div>
        `).join('');
    }
}

function loadContactInformation() {
    const contactInfoContainer = document.getElementById('contact-info-container');
    if (contactInfoContainer) {
        const settings = db.getSettings();
        contactInfoContainer.innerHTML = `
            <div class="contact-detail">
                <i class="fas fa-phone"></i>
                <div>
                    <h4>اتصل بنا</h4>
                    <a href="tel:${settings.phone}">${settings.phone}</a>
                </div>
            </div>
            <div class="contact-detail">
                <i class="fas fa-envelope"></i>
                <div>
                    <h4>البريد الإلكتروني</h4>
                    <a href="mailto:${settings.email}">${settings.email}</a>
                </div>
            </div>
            <div class="contact-detail">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                    <h4>العنوان</h4>
                    <p>${settings.address}</p>
                </div>
            </div>
            <div class="contact-detail">
                <i class="fas fa-clock"></i>
                <div>
                    <h4>ساعات العمل</h4>
                    <p>${settings.workingHours}</p>
                </div>
            </div>
        `;
    }
}

function loadDynamicSettings() {
    const settings = db.getSettings();
    
    // تحديث معلومات الاتصال في جميع أنحاء الموقع
    document.querySelectorAll('.contact-phone').forEach(el => {
        el.textContent = settings.phone;
        el.href = `tel:${settings.phone}`;
    });
    
    document.querySelectorAll('.contact-email').forEach(el => {
        el.textContent = settings.email;
        el.href = `mailto:${settings.email}`;
    });
    
    document.querySelectorAll('.contact-address').forEach(el => {
        el.textContent = settings.address;
    });
    
    document.querySelectorAll('.site-name').forEach(el => {
        el.textContent = settings.siteName;
    });
    
    document.querySelectorAll('.working-hours').forEach(el => {
        if (settings.workingHours) {
            el.textContent = settings.workingHours;
        }
    });
    
    // تحديث وسائل التواصل الاجتماعي
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        const icon = link.querySelector('i');
        if (icon) {
            const platform = icon.className;
            if (platform.includes('whatsapp') && settings.whatsapp) {
                link.href = `https://wa.me/${settings.whatsapp}`;
                link.target = '_blank';
            } else if (platform.includes('facebook') && settings.facebook) {
                link.href = settings.facebook;
                link.target = '_blank';
            } else if (platform.includes('twitter') && settings.twitter) {
                link.href = settings.twitter;
                link.target = '_blank';
            } else if (platform.includes('instagram') && settings.instagram) {
                link.href = settings.instagram;
                link.target = '_blank';
            }
        }
    });
    
    // تحديث وصف الموقع في header إذا موجود
    const siteDescription = document.querySelector('.site-description');
    if (siteDescription && settings.about) {
        siteDescription.textContent = DatabaseUtils.truncateText(settings.about, 60);
    }
}

function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('.copyright-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

function initGalleryFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function initServiceFiltering() {
    const serviceFilters = document.querySelectorAll('.service-filter');
    if (serviceFilters.length > 0) {
        serviceFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                filterServicesByCategory(category);
            });
        });
    }
}

function filterServicesByCategory(category) {
    const services = category === 'all' ? db.getActiveServices() : db.getServicesByCategory(category);
    const servicesContainer = document.getElementById('services-container');
    
    if (servicesContainer) {
        servicesContainer.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-img">
                    <img src="images/${service.image}" alt="${service.title}">
                </div>
                <div class="service-content">
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    <a href="contact.html?service=${encodeURIComponent(service.title)}" class="btn">اطلب الخدمة</a>
                </div>
            </div>
        `).join('');
    }
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let currentImageIndex = 0;
    let images = [];
    
    // Open lightbox
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', function() {
            images = Array.from(document.querySelectorAll('.gallery-item img'));
            currentImageIndex = index;
            lightboxImg.src = images[currentImageIndex].src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigation
    lightboxPrev.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
    });
    
    lightboxNext.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowRight') {
                lightboxPrev.click();
            } else if (e.key === 'ArrowLeft') {
                lightboxNext.click();
            }
        }
    });
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}-circle"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Add show animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// إضافة CSS للأنماط الإضافية
const additionalStyles = `
    .service-features {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 15px 0;
    }
    
    .feature-tag {
        background: var(--light-bg);
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        color: var(--primary-color);
        border: 1px solid var(--primary-color);
    }
    
    .feature-tag i {
        margin-left: 5px;
        font-size: 0.7rem;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        left: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        border-right: 4px solid #046bd2;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-right-color: #10b981;
    }
    
    .notification-error {
        border-right-color: #ef4444;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    .notification-success .notification-content i {
        color: #10b981;
    }
    
    .notification-error .notification-content i {
        color: #ef4444;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 5px;
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }
    
    .notification-close:hover {
        background: #f3f4f6;
    }
    
    @media (max-width: 768px) {
        .notification {
            left: 10px;
            right: 10px;
            max-width: none;
        }
    }
    
    .team-member {
        text-align: center;
        padding: 30px;
        background: var(--light-bg);
        border-radius: 10px;
        transition: var(--transition);
    }
    
    .team-member:hover {
        transform: translateY(-10px);
        box-shadow: var(--shadow);
    }
    
    .team-img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin: 0 auto 20px;
        overflow: hidden;
        border: 5px solid var(--primary-color);
    }
    
    .team-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .team-member .position {
        color: var(--primary-color);
        font-weight: 600;
        margin-bottom: 10px;
    }
    
    .team-member .description {
        color: var(--text-color);
        font-size: 0.9rem;
    }
`;

// إضافة الأنماط إلى head
if (!document.querySelector('#additional-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'additional-styles';
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
}