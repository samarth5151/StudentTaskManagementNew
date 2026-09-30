const studentForm = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable');


// Load students
async function loadStudents() {

    try {

        const response = await fetch('/api/students');

        const students = await response.json();

        studentTable.innerHTML = '';

        students.forEach(student => {

            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>
                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                </td>
            `;

            studentTable.appendChild(row);
        });

    } catch (error) {

        console.error('Error loading students:', error);

    }
}


// Add student
studentForm.addEventListener('submit', async function(event) {

    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const course = document.getElementById('course').value;

    try {

        const response = await fetch('/api/students', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                name,
                email,
                course
            })

        });

        if (!response.ok) {

            const error = await response.json();

            alert(error.message);

            return;
        }

        studentForm.reset();

        loadStudents();

    } catch (error) {

        console.error('Error adding student:', error);

    }

});


// Delete student
async function deleteStudent(id) {

    if (!confirm('Are you sure you want to delete this student?')) {
        return;
    }

    try {

        await fetch(`/api/students/${id}`, {
            method: 'DELETE'
        });

        loadStudents();

    } catch (error) {

        console.error('Error deleting student:', error);

    }
}


// Load students when page opens
loadStudents();
