// Function to toggle sidebar
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("w3-collapse");
  let navTextElements = document.getElementsByClassName("nav-text");
  
  for (var i = 0; i < navTextElements.length; i++) {
    navTextElements[i].classList.toggle("hide");
  }
}

// Search function
function searchTable(inputId, columnIndex) {
  const filter = document.getElementById(inputId).value.toUpperCase();
  const rows = document.getElementsByTagName("tr");
  
  for (const row of rows) {
    const td = row.getElementsByTagName("td")[columnIndex];
    
    if (td) {
      const txtValue = td.textContent.toUpperCase();

      row.style.display =
        txtValue.includes(filter) ? "" : "none";
    }
  }
}

//sorting table when you click on icon
function sortTable(columnIndex) {
  const table = document.querySelector(".w3-table-all");
  const rows = Array.from(table.querySelectorAll("tr"));
  const isNumber = columnIndex === 2;
  let isAscending = table.dataset.sortOrder === "asc";

  const sortedRows = rows.slice(1).sort((a, b) => {
    const aValue = a.cells[columnIndex].textContent;
    const bValue = b.cells[columnIndex].textContent;

    return isNumber
      ? isAscending
        ? parseFloat(aValue) - parseFloat(bValue)
        : parseFloat(bValue) - parseFloat(aValue)
      : isAscending
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  table.innerHTML = "";
  table.append(rows[0], ...sortedRows);

  table.dataset.sortOrder = isAscending ? "desc" : "asc";
}

//request for cat facts
async function showCatFact() {
  const table = document.querySelector('.w3-table-all');
  const rows = table.querySelectorAll('tr');
  const pageNumber = Math.floor(Math.random() * 34) + 1; // Random page number between 1 and 34
  const response = await fetch(`https://catfact.ninja/facts?page=${pageNumber}`);
  const facts = await response.json().then(data => data.data); // Array of facts

  // Add new header to the table
  table.querySelector('thead tr').appendChild(createElement('th', 'Факти про котів'));

  // Add new cells with cat facts to each row of the table
  rows.forEach((row, i) => {
    if (i !== 0) { // Skip the header row
      row.appendChild(createElement('td', facts[i % facts.length].fact));
    }
  });
}

// Helper function to create an element with text
function createElement(type, text) {
  const element = document.createElement(type);
  element.textContent = text;
  return element;
}