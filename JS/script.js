let users = [];
let todos = [];

function generateUID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

const handlesubmit = () => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (users.find(user => user.email === email)) {
        alert('User already exists');
    } else {
        const newUser = { email:email, password:password, uid: generateUID(), status: 'active', createdAt: new Date() };
        users.push(newUser);
        alert('Registration successful!');
        window.location.href = 'login.html';
    }
}

const handlelogin = () => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = users.find(user => user.email == email && user.password == password);
    if (user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'todos.html';
    } else {
        alert('Invalid email or password');
    }
}

const todo = () => {


    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const newTodo = {
        title,
        description,
        date,
        id: generateUID(),
        status: 'pending',
        createdAt: new Date(),
        user_id: loggedInUser.uid
    };
    todos.push(newTodo);
    displayTodos();
}
function displayTodos() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const userTodos = todos.filter(todo => todo.user_id === loggedInUser.uid);
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    userTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<strong>${todo.title}</strong> - ${todo.description} - ${todo.date}`;
        todoList.appendChild(li);
    });
}

window.onload = function() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById('userEmail').innerText = loggedInUser.email;
        displayTodos();
    }
};
