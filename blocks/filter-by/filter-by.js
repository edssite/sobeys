export default function decorate(block) {
    // Create the title element
    const title = document.createElement('p');
    title.className = 'filter-title';
    title.textContent = 'Filter By:';
  
    // Create the dropdown element
    const dropdown = document.createElement('select');
    dropdown.className = 'filter-dropdown';
  
    // Get all the divs inside the block and convert them to dropdown options
    const items = block.querySelectorAll('.filter-by > div > div');
    items.forEach((item) => {
      const text = item.textContent.trim();
      const option = document.createElement('option');
      option.value = text.toLowerCase(); // Use lowercase text as the option value
      option.textContent = text; // Set the visible text in the dropdown
      dropdown.appendChild(option); // Add the option to the dropdown
    });
  
    // Clear the original content and add the title and dropdown
    block.textContent = ''; // Clear existing content in the block
    block.appendChild(title); // Add the title to the block
    block.appendChild(dropdown); // Add the dropdown to the block
  }
  