document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('form-task');
    const taskInput = document.getElementById('input-task');
    const dateInput = document.getElementById('due-date');
    const taskList = document.getElementById('list-task');
    const deleteall = document.getElementById('delete-all');
    const filter = document.getElementById('Filter');
    const inputfilter = document.getElementById('input-filter');
    
    // Array untuk menyimpan semua data tugas
    let tasks = [];

    // Fungsi utama untuk me-render (menampilkan) daftar tugas
    function renderTasks( filtertext = '') {
        // 1. Kosongkan isi tabel terlebih dahulu
        taskList.innerHTML = '';

        const filteredTasks = tasks.filter(task => 
            task.text.toLowerCase().includes(filtertext.toLowerCase())
        );

        // 2. Cek apakah array 'tasks' kosong
        if (filteredTasks.length === 0) {
            // Jika ya, tampilkan pesan "No task found"
            const emptyRow = `
                <tr>
                    <td colspan="4">No task found</td>
                </tr>
            `;
            taskList.innerHTML = emptyRow;
        } else {
            // Jika tidak, loop melalui setiap tugas dan buat baris baru untuknya
            filteredTasks.forEach((task, index) => {
                const taskRow = document.createElement('tr');
                // (logika untuk menampilkan data tugas akan ada di sini)
                // contoh sederhana:
                taskRow.innerHTML = `
                    <td>${task.text}</td>
                    <td>${task.date}</td>
                    <td>Pending</td>
                    <td><button class="delete bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform" index="${index}">Delete</button></td>
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
        tasks = []; //Mengosongkan array tasks
        renderTasks(); //Memanggil renderTasks untuk memperbarui tampilan
    });

    filter.addEventListener('click', (e) => {
        
        if (inputfilter.classList.contains('hidden')) {
            inputfilter.classList.remove('hidden');
        } else {
            inputfilter.classList.add('hidden');
        }
    });

    inputfilter.addEventListener('input', (e) => {
        renderTasks(e.target.value);
    });

    taskList.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('delete')) {
            e.preventDefault(); // Mencegah navigasi halaman
            const index = target.dataset.index;
            tasks.splice(index, 1);
             renderTasks(inputfilter.value);  
        }
    });
    
    // Panggil renderTasks() saat halaman pertama kali dimuat
    // untuk menampilkan "No task found" pada awalnya.
    renderTasks();
    
});

