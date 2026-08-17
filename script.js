const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeLightbox = document.getElementById('closeLightbox');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
let visibleItems = [];

function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(item => 
        item.style.display !== 'none'
    );
}

// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        updateVisibleItems();
    });
});

updateVisibleItems();

// Lightbox trigger via event delegation
document.querySelector('.gallery-grid').addEventListener('click', (e) => {
    const galleryItem = e.target.closest('.gallery-item');
    if (!galleryItem) return;

    updateVisibleItems();
    currentIndex = visibleItems.indexOf(galleryItem);
    showLightbox(currentIndex);
});

function showLightbox(index) {
    const item = visibleItems[index];
    const img = item.querySelector('img');
    const title = item.querySelector('h3').textContent;

    lightboxImg.src = img.src;
    lightboxCaption.textContent = title;
    lightbox.classList.add('active');
}

closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showLightbox(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showLightbox(currentIndex);
});
