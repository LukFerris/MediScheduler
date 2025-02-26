// ... (codice per dati di esempio, getWeekDates, renderStatsCards) ...

// Renderizza la tabella del personale
function renderStaffTable() {
  const tbody = document.querySelector("#staffTable tbody");
  tbody.innerHTML = "";
  staff.forEach((member) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${member.name}</td>
      <td>${member.department}</td>
      <td>${member.role}</td>
      <td>${member.shift}</td>
      <td><span class="status ${
        member.status
      }">${member.status === "active" ? "In servizio" : member.status === "vacation" ? "Ferie" : "Malattia"}</span></td>
      <td>
         <button class="action-btn tooltip" data-id="${member.id}" data-action="view">
            <i class="fas fa-eye"></i>
            <span class="tooltip-text">Visualizza</span>
         </button>
         <button class="action-btn tooltip" data-id="${member.id}" data-action="edit">
            <i class="fas fa-edit"></i>
            <span class="tooltip-text">Modifica</span>
         </button>
      </td>`;
    tbody.appendChild(tr);
  });

  // Aggiungi gli event listener per i pulsanti "Visualizza" ed "Edit"
  document.querySelectorAll("[data-action='view']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      const member = staff.find((s) => s.id === id);
      openModal(
        `Dettagli di ${member.name}`,
        `Reparto: ${member.department}<br>Ruolo: ${member.role}<br>Orario: ${member.shift}`
      );
    });
  });

  document.querySelectorAll("[data-action='edit']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      const member = staff.find((s) => s.id === id);
      // Invece di aprire una modale statica, reindirizza alla pagina di modifica
      window.location.href = `staff.html?id=${member.id}`; 
    });
  });
}

// ... (codice per renderCalendar, openModal, closeModal, etc.) ...
