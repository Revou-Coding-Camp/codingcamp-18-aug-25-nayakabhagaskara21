document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('form-task');
    const taskInput = document.getElementById('input-task');
    const dateInput = document.getElementById('due-date');
    const taskList = document.getElementById('list-task');
    const deleteall = document.getElementById('delete-all');
    // Array untuk menyimpan semua data tugas
    let tasks = [];

    // Fungsi utama untuk me-render (menampilkan) daftar tugas
    function renderTasks() {
        // 1. Kosongkan isi tabel terlebih dahulu
        taskList.innerHTML = '';

        // 2. Cek apakah array 'tasks' kosong
        if (tasks.length === 0) {
            // Jika ya, tampilkan pesan "No task found"
            const emptyRow = `
                <tr>
                    <td colspan="4">No task found</td>
                </tr>
            `;
            taskList.innerHTML = emptyRow;
        } else {
            // Jika tidak, loop melalui setiap tugas dan buat baris baru untuknya
            tasks.forEach(task => {
                const taskRow = document.createElement('tr');
                // (logika untuk menampilkan data tugas akan ada di sini)
                // contoh sederhana:
                taskRow.innerHTML = `
                    <td>${task.text}</td>
                    <td>${task.date}</td>
                    <td>Pending</td>
                    <td>Actions...</td>
                `;
                taskList.appendChild(taskRow);
            });
        }
    }

    // Event listener untuk form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah halaman reload

        // Buat objek tugas baru
        const newTask = {
            text: taskInput.value,
            date: dateInput.value
        };

        // Tambahkan tugas baru ke array
        tasks.push(newTask);

        // Render ulang tabel
        renderTasks();

        // Kosongkan form input
         taskForm.reset();

    });
    deleteall.addEventListener('click', (e) => {
        tasks = []; // Mengosongkan array tasks
        renderTasks(); // Memanggil renderTasks untuk memperbarui tampilan
    });  

    // Panggil renderTasks() saat halaman pertama kali dimuat
    // untuk menampilkan "No task found" pada awalnya.
    renderTasks();
});