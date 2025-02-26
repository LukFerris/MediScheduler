document.addEventListener("DOMContentLoaded", () => {
  const staffForm = document.getElementById("staffForm");
  const staffTableBody = document.getElementById("staffTableBody");

  let staffList = JSON.parse(localStorage.getItem("staffList")) ||;

  function renderStaffTable() {
    staffTableBody.innerHTML = "";
    staffList.forEach((staff, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${staff.name}</td>
                <td>${staff.department}</td>
                <td>${staff.role}</td>
                <td>
                    <button class="btn btn-outline edit-btn" data-index="${index}">Modifica</button>
                    <button class="btn btn-danger delete-btn" data-index="${index}">Elimina</button>
                </td>
            `;
      staffTableBody.appendChild(row);
    });

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        editStaff(index);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        deleteStaff(index);
      });
    });
  }

  function addOrUpdateStaff(e) {
    e.preventDefault();
    const id = document.getElementById("staffId").value;
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const role = document.getElementById("role").value;

    if (id) {
      staffList[id] = { name, department, role };
    } else {
      staffList.push({ name, department, role });
    }

    localStorage.setItem("staffList", JSON.stringify(staffList));
    renderStaffTable();
    staffForm.reset();
    document.getElementById("staffId").value = "";
  }

  function editStaff(index) {
    document.getElementById("staffId").value = index;
    document.getElementById("name").value = staffList[index].name;
    document.getElementById("department").value = staffList[index].department;
    document.getElementById("role").value = staffList[index].role;
  }

  function deleteStaff(index) {
    if (confirm("Sei sicuro di voler eliminare questo medico?")) {
      staffList.splice(index, 1);
      localStorage.setItem("staffList", JSON.stringify(staffList));
      renderStaffTable();
    }
  }

  staffForm.addEventListener("submit", addOrUpdateStaff);
  renderStaffTable();
});
