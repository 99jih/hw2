document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-todo');
    const inputField = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const newTodoPrompt = document.getElementById('new-todo-prompt');
    const todoInputContainer = document.getElementById('todo-input-container');

    newTodoPrompt.addEventListener('click', () => {
        newTodoPrompt.classList.toggle('hidden');
        todoInputContainer.classList.toggle('hidden');
    });

    addButton.addEventListener('click', () => {
        if (inputField.value.trim() !== '') {
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.push({ text: inputField.value, completed: false });
            localStorage.setItem('todos', JSON.stringify(todos));
            inputField.value = '';
            loadTodos();
        }
    });

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';

            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.checked = todo.completed;
            checkBox.className = 'todo-checkbox';
            checkBox.onchange = () => toggleTodo(index);
            li.appendChild(checkBox);

            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.value = todo.text;
            textInput.className = 'todo-text';
            textInput.readOnly = true;
            li.appendChild(textInput);

            const editButton = document.createElement('button');
            editButton.className = 'edit-btn';
            editButton.onclick = () => toggleEditMode(index, textInput);
            li.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.onclick = () => removeTodo(index);
            li.appendChild(deleteButton);

            todoList.appendChild(li);
        });
    }

    function toggleEditMode(index, textInput) {
        const isReadOnly = textInput.readOnly;
        textInput.readOnly = !isReadOnly;
        textInput.focus();

        if (!isReadOnly) {
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos[index].text = textInput.value;
            localStorage.setItem('todos', JSON.stringify(todos));
            loadTodos();
        }
    }

    function toggleTodo(index) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos[index].completed = !todos[index].completed;
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
    }

    function removeTodo(index) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
    }

    loadTodos();
});
