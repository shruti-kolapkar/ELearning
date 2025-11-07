// Function to load content dynamically
function loadContent(category, filePath) {
    // Update breadcrumb
    document.getElementById('breadcrumb-current').textContent = category;

    // Fetch and load the new content into the content area
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading ${filePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(htmlContent => {
            document.querySelector('.content').innerHTML = htmlContent; // Load the content into the `.content` div
        })
        .catch(error => {
            document.querySelector('.content').innerHTML = `<p class="text-danger">Failed to load content: ${error.message}</p>`;
        });
}

// Event listeners for sidebar links
document.querySelectorAll('.category').forEach(item => {
    item.addEventListener('click', function () {
        const category = this.getAttribute('data-category');
        const filePath = `${category.toLowerCase().replace(/ /g, '-')}.html`; // Generate the file path dynamically
        loadContent(category, filePath); // Load the respective HTML file
    });
});
