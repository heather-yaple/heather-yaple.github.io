// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.nav-list > li');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            const dropdownMenu = dropdown.querySelector('.dropdown');
            if (dropdownMenu) dropdownMenu.style.display = 'block';
        });

        dropdown.addEventListener('mouseleave', () => {
            const dropdownMenu = dropdown.querySelector('.dropdown');
            if (dropdownMenu) dropdownMenu.style.display = 'none';
        });
    });
});
 // Fetch and display about information
 async function loadAboutInfo() {
    const response = await fetch('https://heather-yaple.github.io/api/about');
    const aboutData = await response.json();

    const aboutDescriptionElement = document.getElementById('about-description');
    aboutDescriptionElement.textContent = aboutData.description;

    const aboutImageElement = document.getElementById('about-image');
    aboutImageElement.src = aboutData.image;
  }

  
  // Load Portfolio Items
  async function loadPortfolioItems() {
    const response = await fetch('https://heather-yaple.github.io/api/portfolio');
    const portfolioItems = await response.json();
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
  
  // Handle Contact Form Submission
  document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    await fetch('https://heather-yaple.github.io/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    alert('Message sent!'); // Provide feedback to the user
  });
  
  // Load content when the page loads
  window.onload = async () => {
    await loadBlogPosts();
    await loadAboutInfo();
    await loadPortfolioItems();
  };
