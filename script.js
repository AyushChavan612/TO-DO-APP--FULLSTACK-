let todos = [];
let serialNumber = 1;

function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        serialNumber = todos.length ? todos[todos.length - 1].serial + 1 : 1;
        displayTodos();
    }
}

function updateSerialNumber() {
    let no = 1;
    for (let i = 0; i < todos.length; ++i) todos[i].serial = no++;
}

function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodoEventListener() {
    const addButton = document.getElementById("add-todo");
    const newTodoInput = document.getElementById("new-todo");
    
    if (addButton && newTodoInput) {
        addButton.addEventListener('click', () => {
            const todoItem = newTodoInput.value;
            if (todoItem.trim() !== '') {
                const newTodo = {
                    serial: serialNumber++,
                    name: todoItem,
                    date: new Date(),
                };
                todos.push(newTodo);
                updateLocalStorage();
                displayTodos();
                newTodoInput.value = '';
            }
        });
    }
}

function displayTodos() {
    const todoList = document.getElementById("todo-list");
    if (!todoList) return;

    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="todo-item">
                <div class="todo-text" id="todo-text-${todo.serial}">${todo.serial}. ${todo.name}</div>
                <div class="todo-actions">
                    <button onclick="deleteTodo(${todo.serial})">Delete</button>
                    <button onclick="showEditField(${todo.serial})">Update</button>
                </div>
                <input type="text" id="edit-input-${todo.serial}" class="edit-input" value="${todo.name}" style="display:none;" />
                <button onclick="saveEdit(${todo.serial})" id="save-btn-${todo.serial}" class="save-btn" style="display:none;">Save</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

function deleteTodo(serial) {
    todos = todos.filter(todo => todo.serial !== serial);
    updateSerialNumber();
    updateLocalStorage();
    displayTodos();
}

function showEditField(serial) {
    const todoText = document.getElementById(`todo-text-${serial}`);
    const editInput = document.getElementById(`edit-input-${serial}`);
    const saveButton = document.getElementById(`save-btn-${serial}`);

    if (todoText && editInput && saveButton) {
        todoText.style.display = 'none';
        editInput.style.display = 'inline-block';
        saveButton.style.display = 'inline-block';
    }
}

function saveEdit(serial) {
    const editInput = document.getElementById(`edit-input-${serial}`);
    if (editInput && editInput.value.trim() !== '') {
        todos = todos.map(todo => {
            if (todo.serial === serial) {
                todo.name = editInput.value.trim();
                todo.date = new Date();
            }
            return todo;
        });
        updateLocalStorage();
        displayTodos();
    }
}
loadTodos();
 addTodoEventListener();
