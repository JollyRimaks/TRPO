document.getElementById('student-form').addEventListener('submit', addStudent);

let students = [];

function addStudent(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const year = document.getElementById('year').value;
    const group = document.getElementById('group').value;
    const subjects = document.getElementById('subjects').value.split(',').map(subject => {
        const [name, grade] = subject.split(':');
        return { name: name.trim(), grade: parseInt(grade.trim()) };
    });

    students.push({ name, year, group, subjects });
    document.getElementById('student-form').reset();
    alert('Студент добавлен');
}

function searchStudent() {
    const searchName = document.getElementById('search-name').value.toLowerCase();
    const student = students.find(s => s.name.toLowerCase() === searchName);
    
    const resultDiv = document.getElementById('student-result');
    resultDiv.innerHTML = '';

    if (student) {
        resultDiv.innerHTML = `
            <p>ФИО: ${student.name}</p>
            <p>Год поступления: ${student.year}</p>
            <p>Группа: ${student.group}</p>
            <h3>Успеваемость:</h3>
            <ul>
                ${student.subjects.map(subject => `<li>${subject.name}: ${subject.grade}</li>`).join('')}
            </ul>
        `;
    } else {
        resultDiv.innerHTML = '<p>Студент не найден</p>';
    }
}

function generateReport() {
    const reportDiv = document.getElementById('report-result');
    reportDiv.innerHTML = '';

    const failingStudents = students.filter(student => 
        student.subjects.some(subject => subject.grade < 3)
    );

    if (failingStudents.length === 0) {
        reportDiv.innerHTML = '<p>Нет неуспевающих студентов</p>';
        return;
    }

    const table = document.createElement('table');
    const header = table.insertRow();
    header.insertCell(0).textContent = 'ФИО';
    header.insertCell(1).textContent = 'Предмет';
    header.insertCell(2).textContent = 'Оценка';

    failingStudents.forEach(student => {
        student.subjects.forEach(subject => {
            if (subject.grade < 3) {
                const row = table.insertRow();
                row.insertCell(0).textContent = student.name;
                row.insertCell(1).textContent = subject.name;
                row.insertCell(2).textContent = subject.grade;
            }
        });
    });

    reportDiv.appendChild(table);
}
