// admin.js
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'login.html';
        return;
    }

    // Tab Navigation
    const tabLinks = document.querySelectorAll('.admin-menu a');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and contents
            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'login.html';
    });

    // Load dashboard data
    loadDashboard();
    loadServices();
    loadGallery();
    loadContacts();
    loadSettings();

    // Service Management
    document.getElementById('add-service-btn').addEventListener('click', function() {
        openServiceModal();
    });

    document.getElementById('service-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveService();
    });

    // Gallery Management
    document.getElementById('add-gallery-btn').addEventListener('click', function() {
        openGalleryModal();
    });

    document.getElementById('gallery-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveGalleryItem();
    });

    // Settings Management
    document.getElementById('settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveSettings();
    });

    // Modal close events
    document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
        btn.addEventListener('click', function() {
            closeAllModals();
        });
    });
});

function loadDashboard() {
    const services = db.getServices();
    const gallery = db.getGallery();
    const contacts = db.getContacts();
    
    document.getElementById('services-count').textContent = services.length;
    document.getElementById('gallery-count').textContent = gallery.length;
    document.getElementById('contacts-count').textContent = contacts.length;
}

function loadServices() {
    const services = db.getServices();
    const table = document.getElementById('services-table');
    
    table.innerHTML = services.map(service => `
        <tr>
            <td>${service.id}</td>
            <td><img src="images/${service.image}" alt="${service.title}" class="admin-img"></td>
            <td>${service.title}</td>
            <td>${service.description.substring(0, 50)}...</td>
            <td><span class="status-${service.active ? 'active' : 'inactive'}">${service.active ? 'نشط' : 'غير نشط'}</span></td>
            <td>
                <button class="action-btn edit-btn" onclick="editService(${service.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn" onclick="deleteService(${service.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function loadGallery() {
    const gallery = db.getGallery();
    const table = document.getElementById('gallery-table');
    
    table.innerHTML = gallery.map(item => `
        <tr>
            <td>${item.id}</td>
            <td><img src="images/${item.image}" alt="${item.title}" class="admin-img"></td>
            <td>${item.title}</td>
            <td>${item.category}</td>
            <td><span class="status-${item.active ? 'active' : 'inactive'}">${item.active ? 'نشط' : 'غير نشط'}</span></td>
            <td>
                <button class="action-btn edit-btn" onclick="editGalleryItem(${item.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn" onclick="deleteGalleryItem(${item.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function loadContacts() {
    const contacts = db.getContacts();
    const table = document.getElementById('contacts-table');
    
    table.innerHTML = contacts.map(contact => `
        <tr>
            <td>${contact.id}</td>
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td>${contact.message.substring(0, 30)}...</td>
            <td>${new Date(contact.date).toLocaleDateString('ar-SA')}</td>
            <td>
                <button class="action-btn delete-btn" onclick="deleteContact(${contact.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function loadSettings() {
    const settings = db.getSettings();
    
    document.getElementById('site-name').value = settings.siteName || '';
    document.getElementById('site-phone').value = settings.phone || '';
    document.getElementById('site-email').value = settings.email || '';
    document.getElementById('site-address').value = settings.address || '';
}

// Service Functions
function openServiceModal(serviceId = null) {
    const modal = document.getElementById('service-modal');
    const title = document.getElementById('service-modal-title');
    const form = document.getElementById('service-form');
    
    if (serviceId) {
        title.textContent = 'تعديل الخدمة';
        const service = db.getServices().find(s => s.id == serviceId);
        document.getElementById('service-id').value = service.id;
        document.getElementById('service-title').value = service.title;
        document.getElementById('service-description').value = service.description;
        document.getElementById('service-image').value = service.image;
        document.getElementById('service-active').checked = service.active;
    } else {
        title.textContent = 'إضافة خدمة جديدة';
        form.reset();
        document.getElementById('service-id').value = '';
    }
    
    modal.classList.add('active');
}

function saveService() {
    const form = document.getElementById('service-form');
    const serviceId = document.getElementById('service-id').value;
    
    const serviceData = {
        title: document.getElementById('service-title').value,
        description: document.getElementById('service-description').value,
        image: document.getElementById('service-image').value,
        active: document.getElementById('service-active').checked
    };
    
    if (serviceId) {
        db.updateService(serviceId, serviceData);
    } else {
        db.addService(serviceData);
    }
    
    closeAllModals();
    loadServices();
    loadDashboard();
    alert('تم حفظ الخدمة بنجاح!');
}

function editService(id) {
    openServiceModal(id);
}

function deleteService(id) {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
        db.deleteService(id);
        loadServices();
        loadDashboard();
        alert('تم حذف الخدمة بنجاح!');
    }
}

// Gallery Functions
function openGalleryModal(itemId = null) {
    const modal = document.getElementById('gallery-modal');
    const title = document.getElementById('gallery-modal-title');
    const form = document.getElementById('gallery-form');
    
    if (itemId) {
        title.textContent = 'تعديل صورة المعرض';
        const item = db.getGallery().find(g => g.id == itemId);
        document.getElementById('gallery-id').value = item.id;
        document.getElementById('gallery-title').value = item.title;
        document.getElementById('gallery-category').value = item.category;
        document.getElementById('gallery-image').value = item.image;
        document.getElementById('gallery-active').checked = item.active;
    } else {
        title.textContent = 'إضافة صورة للمعرض';
        form.reset();
        document.getElementById('gallery-id').value = '';
    }
    
    modal.classList.add('active');
}

function saveGalleryItem() {
    const form = document.getElementById('gallery-form');
    const itemId = document.getElementById('gallery-id').value;
    
    const itemData = {
        title: document.getElementById('gallery-title').value,
        category: document.getElementById('gallery-category').value,
        image: document.getElementById('gallery-image').value,
        active: document.getElementById('gallery-active').checked
    };
    
    if (itemId) {
        // Update existing item - we'll need to add update functionality to database
        const data = db.getData();
        const index = data.gallery.findIndex(g => g.id == itemId);
        if (index !== -1) {
            data.gallery[index] = { ...data.gallery[index], ...itemData };
            db.saveData(data);
        }
    } else {
        db.addGalleryItem(itemData);
    }
    
    closeAllModals();
    loadGallery();
    loadDashboard();
    alert('تم حفظ الصورة بنجاح!');
}

function editGalleryItem(id) {
    openGalleryModal(id);
}

function deleteGalleryItem(id) {
    if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
        db.deleteGalleryItem(id);
        loadGallery();
        loadDashboard();
        alert('تم حذف الصورة بنجاح!');
    }
}

// Contact Functions
function deleteContact(id) {
    if (confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
        const data = db.getData();
        data.contacts = data.contacts.filter(c => c.id != id);
        db.saveData(data);
        loadContacts();
        loadDashboard();
        alert('تم حذف الرسالة بنجاح!');
    }
}

// Settings Functions
function saveSettings() {
    const settings = {
        siteName: document.getElementById('site-name').value,
        phone: document.getElementById('site-phone').value,
        email: document.getElementById('site-email').value,
        address: document.getElementById('site-address').value
    };
    
    db.updateSettings(settings);
    alert('تم حفظ الإعدادات بنجاح!');
}

// Utility Functions
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}