/**
 * Search box animation handler - Manages the search input animation effects
 * when focused and blurred, expanding the width and adding a subtle glow effect.
 */
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-box input');
    const initialWidth = '300px';
    const expandedWidth = '450px';
    
    const searchBox = document.querySelector('.search-box');
    
    searchBox.style.width = initialWidth;
    searchBox.style.transition = 'width 0.3s ease-in-out';
    
    searchInput.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
    
    searchInput.addEventListener('focus', function() {
        searchBox.style.width = expandedWidth;
        searchInput.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.5)';
    });
    
    searchInput.addEventListener('blur', function() {
        searchBox.style.width = initialWidth;
        searchInput.style.boxShadow = 'none';
    });
});