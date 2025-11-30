// database.js - نظام إدارة قاعدة البيانات للموقع
class Database {
    constructor() {
        this.dbName = 'alihamoud_db';
        this.init();
    }

    init() {
        // تهيئة قاعدة البيانات بالبيانات الأولية إذا لم تكن موجودة
        if (!localStorage.getItem(this.dbName)) {
            const initialData = {
                users: [
                    { 
                        id: 1, 
                        username: 'admin', 
                        password: 'admin123', 
                        role: 'admin',
                        name: 'مدير النظام',
                        email: 'admin@alihamoud.com',
                        created_at: new Date().toISOString()
                    }
                ],
                services: [
                    { 
                        id: 1, 
                        title: 'تفصيل وتركيب الألمنيوم', 
                        description: 'نقوم بتصميم وتنفيذ جميع أنواع الألمنيوم للنوافذ، الأبواب، الواجهات، والمطابخ بأعلى معايير الجودة والسلامة. نستخدم أفضل أنواع الألمنيوم المقاوم للعوامل الجوية والصدأ.',
                        image: 'aluminum-service.jpg',
                        features: ['نوافذ ألمنيوم', 'أبواب ألمنيوم', 'واجهات محلات', 'مطابخ ألمنيوم'],
                        active: true,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    },
                    { 
                        id: 2, 
                        title: 'تفصيل وتركيب الزجاج', 
                        description: 'زجاج سيكوريت، دبل جلاس، واجهات زجاجية، كبائن شاور، وزجاج ديكوري بتصاميم عصرية وجودة مضمونة. نستخدم أحدث التقنيات في قص وتشكيل الزجاج.',
                        image: 'glass-service.jpg',
                        features: ['زجاج سيكوريت', 'زجاج دبل جلاس', 'كبائن شاور', 'زجاج ديكوري'],
                        active: true,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    },
                    { 
                        id: 3, 
                        title: 'تفصيل وتركيب المرايا', 
                        description: 'مرايا للجدران، الحمامات، وغرف النوم بتفصيل دقيق حسب المقاس والتصميم المطلوب مع إمكانية إضافة إضاءة LED ولمسات ديكور مميزة.',
                        image: 'mirror-service.jpg',
                        features: ['مرايا حمامات', 'مرايا خزائن', 'مرايا بإضاءة LED', 'مرايا ديكورية'],
                        active: true,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    },
                    { 
                        id: 4, 
                        title: 'صيانة واستبدال', 
                        description: 'نقوم بإصلاح واستبدال الزجاج المكسور أو المتشقق، وإعادة تركيب المرايا أو تعديل المقاسات بدقة واحترافية عالية. خدمة صيانة شاملة لجميع أنواع الألمنيوم والزجاج.',
                        image: 'maintenance-service.jpg',
                        features: ['إصلاح الزجاج المكسور', 'استبدال الألمنيوم', 'صيانة شاملة', 'خدمة طوارئ'],
                        active: true,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    }
                ],
                gallery: [
                    { 
                        id: 1, 
                        title: 'مشروع فيلا الرياض', 
                        description: 'تنفيذ كامل لنوافذ وأبواب الألمنيوم لفيلا فاخرة في الرياض',
                        image: 'project1.jpg',
                        category: 'ألمنيوم',
                        active: true,
                        created_at: new Date().toISOString()
                    },
                    { 
                        id: 2, 
                        title: 'واجهة محل تجاري', 
                        description: 'تصميم وتركيب واجهة زجاجية لمحل تجاري في مركز تجاري',
                        image: 'project2.jpg',
                        category: 'زجاج',
                        active: true,
                        created_at: new Date().toISOString()
                    },
                    { 
                        id: 3, 
                        title: 'كبائن شاور فاخرة', 
                        description: 'تركيب كبائن شاور زجاجية بحمامات فندق خمس نجوم',
                        image: 'project3.jpg',
                        category: 'زجاج',
                        active: true,
                        created_at: new Date().toISOString()
                    },
                    { 
                        id: 4, 
                        title: 'مرايا حمامات راقية', 
                        description: 'تفصيل وتركيب مرايا بحمامات شقق سكنية',
                        image: 'project4.jpg',
                        category: 'مرايا',
                        active: true,
                        created_at: new Date().toISOString()
                    },
                    { 
                        id: 5, 
                        title: 'واجهة مبنى إداري', 
                        description: 'تنفيذ واجهة ألمنيوم وزجاج لمبنى إداري',
                        image: 'project5.jpg',
                        category: 'واجهات',
                        active: true,
                        created_at: new Date().toISOString()
                    },
                    { 
                        id: 6, 
                        title: 'مطبخ ألمنيوم عصري', 
                        description: 'تصميم وتنفيذ مطبخ ألمنيوم بتصميم عصري',
                        image: 'project6.jpg',
                        category: 'ألمنيوم',
                        active: true,
                        created_at: new Date().toISOString()
                    }
                ],
                contacts: [
                    { 
                        id: 1, 
                        name: 'محمد أحمد', 
                        phone: '+966501234567',
                        email: 'mohamed@example.com',
                        message: 'أرغب في الحصول على عرض سعر لتركيب نوافذ ألمنيوم لمنزلي',
                        service: 'ألمنيوم',
                        status: 'new',
                        created_at: new Date('2024-01-15').toISOString()
                    },
                    { 
                        id: 2, 
                        name: 'سارة الخالد', 
                        phone: '+966502345678',
                        email: 'sara@example.com',
                        message: 'أحتاج إلى استبدال زجاج مكسور في المحل التجاري',
                        service: 'زجاج',
                        status: 'contacted',
                        created_at: new Date('2024-01-10').toISOString()
                    }
                ],
                settings: {
                    siteName: 'علي حمود للألمنيوم والزجاج',
                    phone: '+966510521202',
                    email: 'info@alihamoud.com',
                    address: 'الرياض، السعودية',
                    workingHours: 'الأحد - الخميس: 8:00 ص - 10:00 م',
                    whatsapp: '+966510521202',
                    facebook: 'https://facebook.com/alihamoud',
                    twitter: 'https://twitter.com/alihamoud',
                    instagram: 'https://instagram.com/alihamoud',
                    about: 'مؤسسة علي حمود للألمنيوم والزجاج - خبرة تمتد لأكثر من 20 عاماً في مجال الألمنيوم والزجاج. نقدم حلولاً متكاملة تجمع بين الفخامة، الأمان، والدقة في التصنيع والتركيب.',
                    mission: 'تقديم أفضل خدمات الألمنيوم والزجاج والمرايا بأعلى معايير الجودة والاحترافية',
                    vision: 'الريادة في مجال الألمنيوم والزجاج في المملكة العربية السعودية',
                    updated_at: new Date().toISOString()
                },
                statistics: {
                    total_visits: 1254,
                    total_contacts: 47,
                    total_projects: 156,
                    monthly_visits: 234
                }
            };
            this.saveData(initialData);
        }
    }

    // الدوال الأساسية
    getData() {
        return JSON.parse(localStorage.getItem(this.dbName) || '{}');
    }

    saveData(data) {
        localStorage.setItem(this.dbName, JSON.stringify(data));
    }

    // إدارة المستخدمين
    getUsers() {
        return this.getData().users || [];
    }

    getUser(username, password) {
        const users = this.getUsers();
        return users.find(u => u.username === username && u.password === password);
    }

    addUser(user) {
        const data = this.getData();
        user.id = Date.now();
        user.created_at = new Date().toISOString();
        data.users.push(user);
        this.saveData(data);
        return user;
    }

    updateUser(id, updatedUser) {
        const data = this.getData();
        const index = data.users.findIndex(u => u.id == id);
        if (index !== -1) {
            updatedUser.updated_at = new Date().toISOString();
            data.users[index] = { ...data.users[index], ...updatedUser };
            this.saveData(data);
            return true;
        }
        return false;
    }

    // إدارة الخدمات
    getServices() {
        return this.getData().services || [];
    }

    getService(id) {
        const services = this.getServices();
        return services.find(s => s.id == id);
    }

    addService(service) {
        const data = this.getData();
        service.id = Date.now();
        service.created_at = new Date().toISOString();
        service.updated_at = new Date().toISOString();
        data.services.push(service);
        this.saveData(data);
        return service;
    }

    updateService(id, updatedService) {
        const data = this.getData();
        const index = data.services.findIndex(s => s.id == id);
        if (index !== -1) {
            updatedService.updated_at = new Date().toISOString();
            data.services[index] = { ...data.services[index], ...updatedService };
            this.saveData(data);
            return true;
        }
        return false;
    }

    deleteService(id) {
        const data = this.getData();
        data.services = data.services.filter(s => s.id != id);
        this.saveData(data);
        return true;
    }

    // إدارة معرض الأعمال
    getGallery() {
        return this.getData().gallery || [];
    }

    getGalleryByCategory(category) {
        const gallery = this.getGallery();
        return gallery.filter(item => item.category === category && item.active);
    }

    getGalleryItem(id) {
        const gallery = this.getGallery();
        return gallery.find(item => item.id == id);
    }

    addGalleryItem(item) {
        const data = this.getData();
        item.id = Date.now();
        item.created_at = new Date().toISOString();
        data.gallery.push(item);
        this.saveData(data);
        return item;
    }

    updateGalleryItem(id, updatedItem) {
        const data = this.getData();
        const index = data.gallery.findIndex(item => item.id == id);
        if (index !== -1) {
            data.gallery[index] = { ...data.gallery[index], ...updatedItem };
            this.saveData(data);
            return true;
        }
        return false;
    }

    deleteGalleryItem(id) {
        const data = this.getData();
        data.gallery = data.gallery.filter(item => item.id != id);
        this.saveData(data);
        return true;
    }

    // إدارة جهات الاتصال والرسائل
    getContacts() {
        return this.getData().contacts || [];
    }

    getContact(id) {
        const contacts = this.getContacts();
        return contacts.find(c => c.id == id);
    }

    addContact(contact) {
        const data = this.getData();
        contact.id = Date.now();
        contact.status = 'new';
        contact.created_at = new Date().toISOString();
        data.contacts.push(contact);
        
        // تحديث الإحصائيات
        data.statistics.total_contacts = (data.statistics.total_contacts || 0) + 1;
        
        this.saveData(data);
        return contact;
    }

    updateContactStatus(id, status) {
        const data = this.getData();
        const index = data.contacts.findIndex(c => c.id == id);
        if (index !== -1) {
            data.contacts[index].status = status;
            this.saveData(data);
            return true;
        }
        return false;
    }

    deleteContact(id) {
        const data = this.getData();
        data.contacts = data.contacts.filter(c => c.id != id);
        this.saveData(data);
        return true;
    }

    // إدارة الإعدادات
    getSettings() {
        return this.getData().settings || {};
    }

    updateSettings(newSettings) {
        const data = this.getData();
        newSettings.updated_at = new Date().toISOString();
        data.settings = { ...data.settings, ...newSettings };
        this.saveData(data);
        return data.settings;
    }

    // الإحصائيات
    getStatistics() {
        return this.getData().statistics || {};
    }

    updateStatistics(newStats) {
        const data = this.getData();
        data.statistics = { ...data.statistics, ...newStats };
        this.saveData(data);
        return data.statistics;
    }

    incrementVisitCount() {
        const data = this.getData();
        data.statistics.total_visits = (data.statistics.total_visits || 0) + 1;
        data.statistics.monthly_visits = (data.statistics.monthly_visits || 0) + 1;
        this.saveData(data);
    }

    // وظائف مساعدة
    getActiveServices() {
        const services = this.getServices();
        return services.filter(service => service.active);
    }

    getActiveGallery() {
        const gallery = this.getGallery();
        return gallery.filter(item => item.active);
    }

    getNewContacts() {
        const contacts = this.getContacts();
        return contacts.filter(contact => contact.status === 'new');
    }

    searchServices(query) {
        const services = this.getServices();
        const lowerQuery = query.toLowerCase();
        return services.filter(service => 
            service.title.toLowerCase().includes(lowerQuery) ||
            service.description.toLowerCase().includes(lowerQuery)
        );
    }

    getServicesByCategory(category) {
        // هذه وظيفة مساعدة يمكن تطويرها حسب الحاجة
        const services = this.getServices();
        return services.filter(service => 
            service.title.includes(category) || 
            service.description.includes(category)
        );
    }

    // نسخ احتياطي واستعادة
    backupData() {
        return JSON.stringify(this.getData());
    }

    restoreData(backupString) {
        try {
            const backupData = JSON.parse(backupString);
            this.saveData(backupData);
            return true;
        } catch (error) {
            console.error('خطأ في استعادة النسخة الاحتياطية:', error);
            return false;
        }
    }

    // تنظيف البيانات القديمة
    cleanupOldData(daysOld = 30) {
        const data = this.getData();
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysOld);
        
        // تنظيف جهات الاتصال القديمة
        data.contacts = data.contacts.filter(contact => {
            const contactDate = new Date(contact.created_at);
            return contactDate > cutoffDate;
        });
        
        this.saveData(data);
        return true;
    }

    // إعادة تعيين قاعدة البيانات
    resetDatabase() {
        localStorage.removeItem(this.dbName);
        this.init();
        return true;
    }

    // تصدير البيانات
    exportData() {
        const data = this.getData();
        const exportData = {
            services: data.services,
            gallery: data.gallery,
            contacts: data.contacts,
            settings: data.settings,
            statistics: data.statistics,
            export_date: new Date().toISOString()
        };
        
        return JSON.stringify(exportData, null, 2);
    }

    // استيراد البيانات
    importData(importString) {
        try {
            const importData = JSON.parse(importString);
            const currentData = this.getData();
            
            // دمج البيانات المستوردة مع البيانات الحالية
            if (importData.services) {
                currentData.services = importData.services;
            }
            if (importData.gallery) {
                currentData.gallery = importData.gallery;
            }
            if (importData.settings) {
                currentData.settings = { ...currentData.settings, ...importData.settings };
            }
            
            this.saveData(currentData);
            return true;
        } catch (error) {
            console.error('خطأ في استيراد البيانات:', error);
            return false;
        }
    }
}

// إنشاء نسخة عامة من قاعدة البيانات
const db = new Database();

// وظائف مساعدة إضافية
const DatabaseUtils = {
    // تحويل التاريخ إلى تنسيق عربي
    formatDate: (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // تقصير النص
    truncateText: (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },

    // التحقق من صورة
    validateImage: (imageName) => {
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        return validExtensions.some(ext => imageName.toLowerCase().endsWith(ext));
    },

    // إنشاء معرّف فريد
    generateId: () => {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    },

    // التحقق من البريد الإلكتروني
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // التحقق من رقم الهاتف السعودي
    validateSaudiPhone: (phone) => {
        const re = /^(\+966|00966|0)?5[0-9]{8}$/;
        return re.test(phone.replace(/\s/g, ''));
    }
};

// تصدير الكائنات للاستخدام في الملفات الأخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Database, db, DatabaseUtils };
}