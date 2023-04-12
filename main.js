const userList = document.querySelector(".user-list");
const todoList = document.querySelector(".todo-list");
const userName = document.querySelector(".user-name");

const loader = document.createElement('div');
loader.textContent = 'Загрузка приложения...';
loader.className = 'loader';
document.body.prepend(loader);

const error = document.createElement('div')
error.textContent = 'Произошла ошибка при попытке загрузить пользователей'
error.className = 'error'



fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    users.forEach((user) => {
      const userItem = document.createElement("li");
      const userButton = document.createElement("button");
      userButton.innerText = user.username;
      userButton.addEventListener("click", () => {
        const loaderLi = document.createElement('div')
        loaderLi.textContent = 'Загрузка...'
        loaderLi.className = 'loaderSmall'
        todoList.append(loaderLi)
        getUserTodos(user.id, user.username);

      });

      userItem.appendChild(userButton);
      userList.appendChild(userItem);
    });
  })
  .catch((e) => {
    todoList.remove()
    document.body.prepend(error)
  })
  .finally((e) => {
      loader.remove()
  });



async function getUserTodos(userId, name) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );
    const todos = await response.json();
    displayUserTodos(todos, name);
  } catch (error) {
    
  const errorLi = document.createElement('div')
  errorLi.textContent = 'Произошла ошибка'
  errorLi.className = 'errorSmall'
todoList.append(errorLi)
  }
}

function displayUserTodos(todos, name) {
  userName.innerText = `Список дел для ${name}`;
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.innerText = todo.title;
    if (todo.completed) {
      todoItem.classList.add("completed");
    }
    todoList.appendChild(todoItem);
  });
}