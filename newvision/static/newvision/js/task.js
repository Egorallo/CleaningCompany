 const employees = [];

        function addEmployee() {
            const lastName = document.getElementById('lastName').value;
            const firstName = document.getElementById('firstName').value;
            const middleName = document.getElementById('middleName').value;
            const age = parseInt(document.getElementById('age').value);
            const experience = parseInt(document.getElementById('experience').value);

            employees.push({ lastName, firstName, middleName, age, experience });

            document.getElementById('lastName').value = '';
            document.getElementById('firstName').value = '';
            document.getElementById('middleName').value = '';
            document.getElementById('age').value = '';
            document.getElementById('experience').value = '';

            displayInitial(employees);
        }

        function findYoungEmployees() {
            const requiredExperience = 3;
            const youngEmployees = employees.filter(employee => employee.age === Math.min(...employees.map(e => e.age)) && employee.experience >= requiredExperience);

            displayResults(youngEmployees);
        }

        function displayResults(employees) {
            const resultContainer = document.getElementById('result');
            resultContainer.innerHTML = '<h2>Young Employees with at least 3 years of experience:</h2>';

            if (employees.length === 0) {
                resultContainer.innerHTML += '<p>No employees found.</p>';
            } else {
                employees.forEach(employee => {
                    resultContainer.innerHTML += `<p>${employee.lastName} ${employee.firstName} ${employee.middleName} - Age: ${employee.age}, Experience: ${employee.experience} years</p>`;
                });
            }
        }


        function displayInitial(employees) {
            const initialContainer = document.getElementById('initial');
            initialContainer.innerHTML = '<h2>Initial Employees:</h2>';

            if (employees.length === 0) {
                initialContainer.innerHTML += '<p>No employees.</p>';
            } else {
                employees.forEach(employee => {
                    initialContainer.innerHTML += `<p>${employee.lastName} ${employee.firstName} ${employee.middleName} - Age: ${employee.age}, Experience: ${employee.experience} years</p>`;
                });
            }
        }