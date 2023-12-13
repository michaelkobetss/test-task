// Function to toggle sidebar
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("w3-collapse");
}

// Search function
function searchTable() {
  const filter = document.querySelector(".w3-input").value.toUpperCase();
  const rows = document.getElementsByTagName("tr");

  for (const row of rows) {
    const [td1, td2] = row.getElementsByTagName("td");

    if (td1 && td2) {
      const txtValue1 = td1.textContent.toUpperCase();
      const txtValue2 = td2.textContent.toUpperCase();

      row.style.display =
        txtValue1.includes(filter) || txtValue2.includes(filter) ? "" : "none";
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
    const response = await fetch('https://catfact.ninja/fact');
    const data = await response.json();
    document.getElementById('catFact').textContent = 'Цікавий факт про котиків: ' + data.fact;
  }