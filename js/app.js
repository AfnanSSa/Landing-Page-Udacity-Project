// Global variables for navigation and sections
const nav = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

// Build the navigation menu
const buildNav = () => {
    // Create a new unordered list element to contain the navigation links
    const navList = document.createElement('ul');

    // Loop through each section and create a corresponding navigation link
    sections.forEach((section, index) => {
        const sectionID = section.id;
        const sectionDataNav = section.dataset.nav;

        // Create list item and anchor elements
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        // Set anchor attributes and text content
        link.setAttribute('class', 'menu__link');
        link.setAttribute('href', `#${sectionID}`);
        link.textContent = sectionDataNav;

        // Append the anchor element to the list item
        listItem.appendChild(link);

        // Append the list item to the unordered list
        navList.appendChild(listItem);

        // Add click event listener to highlight the clicked navigation item
        link.addEventListener('click', function() {
            removeActiveClass(section);
            addActiveClass(true, section);
            removeActiveNav();
            this.classList.add('active');
        });
    });

    // Append the unordered list to the navigation menu
    nav.appendChild(navList);
};
buildNav();

// Function to get the offset of a section from the top of the viewport
const getOffset = (section) => {
    return Math.floor(section.getBoundingClientRect().top);
};

// Remove the 'your-active-class' and styling from a section
const removeActiveClass = (section) => {
    section.classList.remove('your-active-class');
    // Reset background color styling
    section.style.cssText = 'background-color: linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.2) 90%)';
};

// Add the 'your-active-class' and styling to a section
const addActiveClass = (condition, section) => {
    if (condition) {
        section.classList.add('your-active-class');
        // Apply background color styling for active state
        section.style.cssText = 'background-color: linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.2) 100%)';
    }
};

// Activate the appropriate section based on scroll
const activateSection = () => {
    let highlightedSection = null;

    // Find the section that is currently in the viewport
    sections.forEach((section) => {
        const elementOffset = getOffset(section);
        const isInViewport = () => elementOffset < 150 && elementOffset >= -400;

        if (isInViewport()) {
            highlightedSection = section;
        }
    });

    // Remove active class from all navigation items
    document.querySelectorAll('.navbar__menu .active').forEach((navItem) => {
        navItem.classList.remove('active');
    });

    // Highlight the corresponding navigation item
    if (highlightedSection) {
        const navItem = document.querySelector(`.navbar__menu a[href="#${highlightedSection.id}"]`);
        navItem.classList.add('active');
    }
};

// Listen for scroll events and activate the appropriate section
window.addEventListener('scroll', activateSection);

// Scroll to anchor ID using scrollTO event with smooth scrolling effect
const scrollToSection = (link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        // Extract the target section ID from the link's href attribute
        const targetSectionId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetSectionId);

        // Scroll to the target section with a smooth scrolling effect
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
};

// Initialize smooth scroll functionality for navigation links
const initializeScroll = () => {
    const links = document.querySelectorAll('.navbar__menu a');
    // Attach the smooth scroll behavior to each navigation link
    links.forEach(link => {
        scrollToSection(link);
    });
};
initializeScroll();

// Function to toggle the visibility of the scroll-to-top button
const toggleScrollToTopButton = () => {
    const scrollToTopButton = document.getElementById('scrollToTopButton');
    const scrollPosition = window.scrollY;

    // Show the button when below the fold, hide it when at or above the fold
    if (scrollPosition > window.innerHeight / 2) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
};

// Add a scroll event listener to toggle the button visibility
window.addEventListener('scroll', toggleScrollToTopButton);

// Function to scroll smoothly to the top of the page
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Create the scroll-to-top button dynamically
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.textContent = 'Scroll to Top';
    button.setAttribute('id', 'scrollToTopButton');
    button.style.display = 'none'; // Initially hide the button

    // Add a click event listener to scroll to the top when clicked
    button.addEventListener('click', scrollToTop);

    // Append the button to the body
    document.body.appendChild(button);
};

// Initialize the scroll-to-top button
createScrollToTopButton();

// Function to remove active class from navigation items
const removeActiveNav = () => {
    const activeNav = document.querySelector('.navbar__menu .active');
    if (activeNav) {
        activeNav.classList.remove('active');
    }
};