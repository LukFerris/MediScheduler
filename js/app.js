import "./staff.js";

// Dati di esempio
const staff = [
  {
    id: 1,
    name: "Dr. Marco Bianchi",
    department: "Cardiologia",
    role: "Primario",
    shift: "08:00 - 16:00",
    status: "active",
  },
  {
    id: 2,
    name: "Dr.ssa Laura Verdi",
    department: "Neurologia",
    role: "Specializzando",
    shift: "08:00 - 16:00",
    status: "active",
  },
  {
    id: 3,
    name: "Dr. Antonio Neri",
    department: "Pronto Soccorso",
    role: "Medico",
    shift: "16:00 - 00:00",
    status: "active",
  },
  {
    id: 4,
    name: "Dr.ssa Giulia Rossi",
    department: "Pediatria",
    role: "Primario",
    shift: "08:00 - 16:00",
    status: "vacation",
  },
  {
    id: 5,
    name: "Dr. Roberto Ferrari",
    department: "Radiologia",
    role: "Medico",
    shift: "00:00 - 08:00",
    status: "sick",
  },
];

// Turni settimanali di esempio (usa date complete)
const weeklySchedule = {
  "2024-07-01": [
    { staffId: 1, shift: "08:00 - 16:00", type: "day" },
    { staffId: 2, shift: "08:00 - 16:00", type: "day" },
    { staffId: 3, shift: "16:00 - 00:00", type: "night" },
  ],
  "2024-07-02": [
    { staffId: 1, shift: "08:00 - 16:00", type: "day" },
    { staffId: 2, shift: "16:00 - 00:00", type: "night" },
  ],
  "2024-07-03": [{ staffId: 4, shift: "08:00 - 16:00", type: "day" }],
  "2024-07-04": [{ staffId: 5, shift: "00:00 - 08:00", type: "night" }],
  "2024-07-05": [{ staffId: 3, shift: "16:00 - 00:00", type: "night" }],
  "2024-07-06": [{ staffId: 1, shift: "08:00 - 16:00", type: "day" }],
  "2024-07-07": [{ staffId: 2, shift: "08:00 - 16:00", type: "day" }],
};

// Variabile per il controllo della settimana corrente
let currentWeekOffset = 0;

// Funzione per ottenere le date della settimana (lunedì-domenica)
function getWeekDates(referenceDate) {
  const date = new Date(referenceDate);
  const day = date.getDay();
  const monday = new Date(date);
  if (day === 0) {
    monday.setDate(date.getDate() - 6);
  } else {
    monday.setDate(date.getDate() - (day - 1));
  }
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d.toISOString().split("T")[0]); // Formato YYYY-MM-DD
  }
  return dates;
}

// Calcola i turni scoperti
function calculateUncoveredShifts(weeklySchedule, staff) {
  let uncovered = 0;
  for (const day in weeklySchedule) {
    weeklySchedule[day].forEach((shift) => {
      const staffMember = staff.find((s) => s.id === shift.staffId);
      if (!staffMember || staffMember.status !== "active") {
        uncovered++;
      }
    });
  }
  return uncovered;
}

// Renderizza le statistiche nella dashboard
function renderStatsCards() {
  const statsContainer = document.getElementById("statsCards");
  statsContainer.innerHTML = "";
  const activeCount = staff.filter((s) => s.status === "active").length;
  const vacationCount = staff.filter((s) => s.status === "vacation").length;
  const sickCount = staff.filter((s) => s.status === "sick").length;
  const uncoveredShifts = calculateUncoveredShifts(weeklySchedule, staff);

  const stats = [
    {
      title: "Personale Attivo",
      value: activeCount,
      icon: "fas fa-user-md",
      iconClass: "primary",
      description: "+3 rispetto al mese scorso",
    },
    {
      title: "Turni Coperti",
      value: `${((Object.values(weeklySchedule).flat().length - uncoveredShifts) / Object.values(weeklySchedule).flat().length * 100).toFixed(0)}%`,
      icon: "fas fa-check-circle",
      iconClass: "success",
      description: "+5% rispetto al mese scorso",
    },
    {
      title: "Personale Assente",
      value: vacationCount + sickCount,
      icon: "fas fa-user-clock",
      iconClass: "warning",
      description: `${vacationCount} ferie, ${sickCount} malattia`,
    },
    {
      title: "Turni Scoperti",
      value: uncoveredShifts,
      icon: "fas fa-exclamation-circle",
      iconClass: "danger",
      description: "Necessario trovare sostituti",
    },
  ];

  stats.forEach((stat) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-header">
        <h3 class="card-title">${stat.title}</h3>
        <div class="card-icon ${stat.iconClass}"> 
          <i class="${stat.icon}"></i>
        </div>
      </div>
      <div class="card-value">${stat.value}</div>
      <div class="card-description">${stat.description}</div>
    `;
    statsContainer.appendChild(card);
  });
}

// ... (Resto del codice: renderStaffTable, renderCalendar, gestione modale, ecc.) ...
function renderStaffTable() {
  const tbody = document.querySelector("#staffTable tbody");
  tbody.innerHTML = "";
  staff.forEach((member) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="math-inline">\{member\.name\}</td\>
<td\></span>{member.department}</td>
      <td><span class="math-inline">\{member\.role\}</td\>
<td\></span>{member.shift}</td>
      <td><span class="status <span class="math-inline">\{
member\.status
\}"\></span>{member.status === "active" ? "In servizio" : member.status === "vacation" ? "Ferie" : "Malattia"}</span></td>
      <td>
          <button class="action-btn tooltip" data-id="<span class="math-inline">\{member\.id\}" data\-action\="view"\>
<i class\="fas fa\-eye"\></i\>
<span class\="tooltip\-text"\>Visualizza</span\>
</button\>
<button class\="action\-btn tooltip" data\-id\="</span>{member.id}" data-action="edit">
            <i class="fas fa-edit"></i>
            <span class="tooltip-text">Modifica</span>
          </button>
      </td>`;
    tbody.appendChild(tr);
  });

  document.querySelectorAll("[data-action='view']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      const member = staff.find((s) => s.id === id);
      openModal(
        `Dettagli di ${member.name}`,
        `Reparto: ${member.department}<br>Ruolo: ${member.role}<br>Orario:
        ${member.shift}`
      );
    });
  });

  document.querySelectorAll("[data-action='edit']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      const member = staff.find((s) => s.id === id);
      window.location.href = `staff.html?id=${member.id}`;
    });
  });
}

function renderCalendar() {
  const now = new Date();
  now.setDate(now.getDate() + currentWeekOffset * 7);
  const weekDates = getWeekDates(now);
  const calendarDateEl = document.getElementById("calendarDate");
  const options = { day: "numeric", month: "long", year: "numeric" };
  const startDate = new Date(weekDates[0]);
  const endDate = new Date(weekDates[6]);

  calendarDateEl.textContent = `${startDate.toLocaleDateString(
    "it-IT",
    options
  )} - ${endDate.toLocaleDateString("it-IT", options)}`;

  const calendarGrid = document.getElementById("calendarGrid");
  calendarGrid.innerHTML = "";
  weekDates.forEach((date) => {
    const cell = document.createElement("div");
    cell.className = "calendar-cell";

    const dateNumber = document.createElement("div");
    dateNumber.className = "date-number";
    dateNumber.textContent = new Date(date).getDate();
    cell.appendChild(dateNumber);

    const daySchedule = weeklySchedule[date] || [];
    daySchedule.forEach((item) => {
      const shiftDiv = document.createElement("div");
      shiftDiv.className = "schedule-item";
      if (item.type === "night") shiftDiv.classList.add("night");
      const staffMember = staff.find((s) => s.id === item.staffId);
      shiftDiv.textContent = `${staffMember ? staffMember.name : "N/A"} (${
        item.shift
      })`;
      shiftDiv.addEventListener("click", () => {
        openModal(
          `Dettagli turno per ${staffMember ? staffMember.name : "N/A"}`,
          `Turno: ${item.shift}<br>${
            item.type === "night" ? "Notturno" : "Diurno"
          }`
        );
      });
      cell.appendChild(shiftDiv);
    });

    calendarGrid.appendChild(cell);
  });
}

const modalBackdrop = document.getElementById("modalBackdrop");
const modalTitleEl = document.getElementById("modalTitle");
const modalBodyEl = document.getElementById("modalBody");

function openModal(title, bodyContent) {
  modalTitleEl.textContent = title;
  modalBodyEl.innerHTML = bodyContent;
  modalBackdrop.classList.add("active");
}

function closeModal() {
  modalBackdrop.classList.remove("active");
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalOk").addEventListener("click", closeModal);

document.getElementById("prevWeek").addEventListener("click", () => {
  currentWeekOffset--;
  renderCalendar();
});

document.getElementById("nextWeek").addEventListener("click", () => {
  currentWeekOffset++;
  renderCalendar();
});

document.getElementById("staffSearch").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const tbody = document.querySelector("#staffTable tbody");
  tbody.querySelectorAll("tr").forEach((row) => {
    const name = row.querySelector("td").textContent.toLowerCase();
    row.style.display = name.includes(query) ? "" : "none";
  });
});

document.querySelectorAll(".sidebar-menu a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetPage = link.getAttribute("data-page");
    document.querySelectorAll(".page").forEach((page) => {
      if (page.id === targetPage) {
        page.style.display = "block";
        page.classList.add("active");
      } else {
        page.style.display = "none";
        page.classList.remove("active");
      }
    });
    document
      .querySelectorAll(".sidebar-menu li")
      .forEach((li) => li.classList.remove("active"));
    link.parentElement.classList.add("active");
  });
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("active");
});

renderStatsCards();
renderStaffTable();
renderCalendar();
