// Synchronous loading using XMLHttpRequest
function loadDataSync() {
    const xhr = new XMLHttpRequest();
    // Perform synchronous request to fetch reference.json
    xhr.open('GET', 'data/reference.json', false);  // false indicates synchronous
    xhr.send();

    if (xhr.status === 200) {
        // Parse the reference data
        const reference = JSON.parse(xhr.responseText);
        // Load the next file based on reference's data_location
        loadNextSync(`data/${reference.data_location}`);
    }
}

function loadNextSync(url) {
    const xhr = new XMLHttpRequest();
    // Perform synchronous request to fetch the file at `url`
    xhr.open('GET', url, false);  // false indicates synchronous
    xhr.send();

    if (xhr.status === 200) {
        // Parse the data from the current file
        const data = JSON.parse(xhr.responseText);
        // Process the student data
        processStudents(data.data);

        // If there's a `data_location`, load the next file
        if (data.data_location) {
            loadNextSync(`data/${data.data_location}`);
        }
        // If there is no `data_location`, load the next file (data3.json)
        else if (url === 'data/data2.json') {
            loadNextSync('data/data3.json');
        }
    }
}

// Function to process student data and display in a table
function processStudents(students) {
    students.forEach(student => {
        // Split name into first name and surname
        const [name, surname] = student.name.split(" ");
        // Add a new row in the table for each student
        addRow(name, surname, student.id);
    });
}

// Helper function to create table rows
function addRow(name, surname, id) {
    const table = document.querySelector("#student-table tbody");
    const row = document.createElement("tr");
    // Add the student information into the row
    row.innerHTML = `<td>${name}</td><td>${surname}</td><td>${id}</td>`;
    table.appendChild(row);
}

// Asynchronous loading using XMLHttpRequest with callbacks
function loadDataAsync() {
    const xhr = new XMLHttpRequest();
    // Perform asynchronous request to fetch reference.json
    xhr.open('GET', 'data/reference.json', true);  // true indicates asynchronous
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Parse the reference data when loaded
            const reference = JSON.parse(xhr.responseText);
            // Load the next file based on reference's data_location
            loadNextAsync(`data/${reference.data_location}`);
        }
    };
    xhr.send();
}

function loadNextAsync(url) {
    const xhr = new XMLHttpRequest();
    // Perform asynchronous request to fetch the file at `url`
    xhr.open('GET', url, true);  // true indicates asynchronous
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Parse the data from the current file
            const data = JSON.parse(xhr.responseText);
            // Process the student data
            processStudents(data.data);

            // If there's a `data_location`, load the next file
            if (data.data_location) {
                loadNextAsync(`data/${data.data_location}`);
            }
            // If there is no `data_location`, load the next file (data3.json)
            else if (url === 'data/data2.json') {
                loadNextAsync('data/data3.json');
            }
        }
    };
    xhr.send();
}

// Fetch and Promises
function loadDataFetch() {
    // Use Fetch API to get reference.json
    fetch('data/reference.json')
        .then(response => response.json())
        .then(reference => loadNextFetch(`data/${reference.data_location}`));
}

function loadNextFetch(url) {
    // Use Fetch API to get the file at `url`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Process the student data
            processStudents(data.data); 

            // If there's a `data_location`, load the next file
            if (data.data_location) {
                loadNextFetch(`data/${data.data_location}`);
            }
            // If the current file is data2.json, load data3.json
            else if (url === 'data/data2.json') {
                loadNextFetch('data/data3.json');
            }
            // If no `data_location` and it's not data2.json, stop loading
        })
}
