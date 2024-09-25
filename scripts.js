// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    initializeDropdowns();
    loadContent();
});

// Initialize dropdown menus
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-list > li');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => toggleDropdown(dropdown, true));
        dropdown.addEventListener('mouseleave', () => toggleDropdown(dropdown, false));
    });
}

// Show or hide dropdown menu
function toggleDropdown(dropdown, isVisible) {
    const dropdownMenu = dropdown.querySelector('.dropdown');
    if (dropdownMenu) {
        dropdownMenu.style.display = isVisible ? 'block' : 'none';
    }
}

// Fetch data from the API
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error(`Fetch error: ${error}`);
        alert('Failed to load data. Please try again later.');
    }
}

// Load about information
async function loadAboutInfo() {
    const aboutData = await fetchData('https://heather-yaple.github.io/api/about');
    if (aboutData) {
        document.getElementById('about-description').textContent = aboutData.description;
        document.getElementById('about-image').src = aboutData.image;
    }
}

// Load portfolio items
async function loadPortfolioItems() {
    const portfolioItems = await fetchData('https://heather-yaple.github.io/api/portfolio');
    if (portfolioItems) {
        const portfolioSection = document.getElementById('portfolio-items');

        portfolioItems.forEach(portfolioItem => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('portfolio-item');
            itemElement.innerHTML = `
                <img src="${portfolioItem.image}" alt="${portfolioItem.title}">
                <h3>${portfolioItem.title}</h3>
                <p>${portfolioItem.description}</p>
                <a href="${portfolioItem.link}" class="btn-secondary">View Project</a>
            `;
            portfolioSection.appendChild(itemElement);
        });
    }
}

// Handle contact form submission
async function handleContactFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('https://heather-yaple.github.io/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to send message');

        alert('Message sent!'); // Provide feedback to the user
        event.target.reset(); // Reset form fields
    } catch (error) {
        console.error(`Submit error: ${error}`);
        alert('Failed to send message. Please try again later.');
    }
}

// Attach event listener to the contact form
document.getElementById('contact-form').addEventListener('submit', handleContactFormSubmission);

// Load content when the page loads
async function loadContent() {
    await loadBlogPosts(); // Ensure this function is defined elsewhere
    await loadAboutInfo();
    await loadPortfolioItems();
}
