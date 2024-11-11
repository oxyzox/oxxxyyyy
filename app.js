 // Mobile navigation toggle
 const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
 const sidebar = document.querySelector('.sidebar');
 const content = document.querySelector('.content');

 mobileNavToggle.addEventListener('click', () => {
     sidebar.classList.toggle('active');
     mobileNavToggle.innerHTML = sidebar.classList.contains('active') 
         ? '<i class="fas fa-times"></i>' 
         : '<i class="fas fa-bars"></i>';
 });

 // Close sidebar when clicking outside on mobile
 content.addEventListener('click', () => {
     if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
         sidebar.classList.remove('active');
         mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
     }
 });

 // Smooth scrolling for navigation items
 document.querySelectorAll('.nav-item[data-section]').forEach(item => {
     item.addEventListener('click', (e) => {
         e.preventDefault();
         const sectionId = item.getAttribute('data-section');
         const section = document.getElementById(sectionId);
         
         if (section) {
             section.scrollIntoView({ behavior: 'smooth' });
             
             // Update active state
             document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
             item.classList.add('active');
             
             // Close mobile menu after click
             if (window.innerWidth <= 768) {
                 sidebar.classList.remove('active');
                 mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
             }
         }
     });
 });

 // Scroll progress indicator
 const progressBar = document.querySelector('.progress-indicator');
 window.addEventListener('scroll', () => {
     const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
     const progress = (window.scrollY / windowHeight) * 100;
     progressBar.style.transform = `scaleX(${progress / 100})`;
 });

 // Intersection Observer for scroll spy and animations
 const sections = document.querySelectorAll('.section');
 const navItems = document.querySelectorAll('.nav-item[data-section]');

 const observerOptions = {
     threshold: 0.2,
     rootMargin: '-20% 0px -20% 0px'
 };

 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             // Add visible class for animation
             entry.target.classList.add('visible');
             
             // Update navigation
             const sectionId = entry.target.id;
             navItems.forEach(item => {
                 if (item.getAttribute('data-section') === sectionId) {
                     item.classList.add('active');
                 } else {
                     item.classList.remove('active');
                 }
             });
         }
     });
 }, observerOptions);

 sections.forEach(section => observer.observe(section));