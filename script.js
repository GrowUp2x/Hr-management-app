let employees = JSON.parse(localStorage.getItem('employees')) || [];

// Handle form submission
document.getElementById("employeeForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const salary = document.getElementById("salary").value;
    const profilePic = document.getElementById("profilePic").files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
        const newEmployee = {
            name,
            position,
            salary,
            profilePic: reader.result || null
        };

        employees.push(newEmployee);
        saveEmployees();
        displayEmployees();
        cancelAddEmployee();
    };

    if (profilePic) {
        reader.readAsDataURL(profilePic);
    } else {
        reader.onloadend();
    }
});

// Save employees to localStorage
function saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(employees));
}

// Display all employees
function displayEmployees() {
    const tableBody = document.getElementById("employeeTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    employees.forEach((employee, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                ${employee.profilePic ? `<img src="${employee.profilePic}" alt="Profile">` : 'No Image'}
            </td>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.salary}</td>
            <td>
                <button onclick="deleteEmployee(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Delete an employee
function deleteEmployee(index) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees.splice(index, 1);
        saveEmployees();
        displayEmployees();
    }
}

// Search for employees
function searchEmployees() {
    const query = document.getElementById("searchEmployee").value.toLowerCase();
    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(query) || employee.position.toLowerCase().includes(query)
    );
    displayFilteredEmployees(filteredEmployees);
}

function displayFilteredEmployees(filteredEmployees) {
    const tableBody = document.getElementById("employeeTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    filteredEmployees.forEach((employee, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                ${employee.profilePic ? `<img src="${employee.profilePic}" alt="Profile">` : 'No Image'}
            </td>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.salary}</td>
            <td>
                <button onclick="deleteEmployee(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function showAddEmployeeForm() {
    document.getElementById("add-employee-form").style.display = "block";
}

function cancelAddEmployee() {
    document.getElementById("add-employee-form").style.display = "none";
    document.getElementById("employeeForm").reset();
}

displayEmployees();
