let userAnswer = '';
let tasks = [];

class Task {
  // в constructor мы передаем параметры, которые хотим получить от пользователя
  // если пользователь не введет параметры для description и/или priority,
  // то они будут назначены по умолчанию.
  constructor(name, description = 'Описание не добавлено', priority = 'high') {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.startDate = new Date();
    this.status = 'new';
  }

  // метод getTask создан для более удобного возврата информации о задаче
  getTask() {
    return `${this.name}: ${this.description}` +
      `\nДата создания задачи: ${this.startDate}` +
      `\nПриоритет: ${this.priority}` +
      `\nСтатус: ${this.status}`;
  }
}

while (userAnswer !== 'end') {
  userAnswer = prompt('Какую команду выполнить?');
  const userCommandsArray = getCommands(userAnswer); // []
  const firstUserCommand = userCommandsArray[0];

  switch (firstUserCommand) {
    case 'add':
      handleAdd(userCommandsArray);
      break;
    case 'print':
      handlePrint(userCommandsArray);
      break;
    case 'status':
      handleStatus(userCommandsArray);
      break;
    case 'delete':
      handleDelete(userCommandsArray);
      break;
    case 'search':
      handleSearch(userCommandsArray);
      break;
    default:
      console.log('Вы не ввели команду');
  }
}

function getCommands(answerStr) {
  return answerStr.split(': ');
}


function printTasks(tasks) {
  return tasks.forEach((task, key) => {
    console.log(key, task.getTask());
  })
}

function handleAdd(userCommandsArray) {
  // задача вводится так: имя, описание, приоритет
  const [name, description, priority] = userCommandsArray.pop().split(', '); // Task1, Description, low
  if (name) {
    const task = new Task(name, description, priority);
    tasks.push(task);
  }
}

function handlePrint(userCommandsArray) {

  //print: task: <index>
  // формат print: <value:> task // print: priority: low
  const value = userCommandsArray.pop();
  let tasksToPrint = [];
  // принимаем команду и значение, либо две команды и значение
  if (userCommandsArray.length > 1) {
    const subcommand = userCommandsArray.pop();

    if (subcommand === 'task') {
      tasksToPrint = [tasks[+value]];
    } else {
      tasksToPrint = tasks.filter((task) => task[subcommand] === value);
    }
  } else {
    tasksToPrint = [...tasks];
  }

  printTasks(tasksToPrint);
}

function handleStatus(userCommandsArray) {
  // формат status: <index>: <new/done>
  const newValue = userCommandsArray.pop();
  const index = userCommandsArray.pop();
  tasks[index] = {
    ...tasks[index],
    status: newValue
  }
}

function handleDelete(userCommandsArray) {
  // формат delete: <index>
  const index = userCommandsArray.pop();
  tasks = [...tasks.splice(index, 1)];
}

function handleSearch(userCommandsArray) {
  // формат search: <start/full>: <str>
  const str = userCommandsArray.pop();
  const mode = userCommandsArray.pop();

  if (mode !== 'start' && mode !== 'full') {
    console.log('Значение не найдено');
    return;
  }

  const regExp = mode === 'start' ? new RegExp(`^${str}`) : new RegExp(`${str}`); // ask
  const result = tasks.filter((task) => task.name.match(regExp));
  printTasks(result);
}