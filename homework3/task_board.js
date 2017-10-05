class Task {
  constructor(task, name) {
    this.task = task;
    this.name = name;
  }
  render (){
    if(this.name === undefined){
      return `'${this.task}'`;

    } else {
      return `'${this.task}'•'${this.name}'`;
    }
  }
}

// const myTask = new Task('Clean dishes');
// const myTask = new Task('Wash clothes'•'Sam');
const myTask = new Task('Laundry', 'You');
const yourTask = new Task('Buy Apples');
const myTaskWithAssignee = new Task('Pay Phone Bill', 'Me');
console.log(myTask.render());
console.log(myTaskWithAssignee.render());

class List {
  constructor(name) {
    this.name = name;
    this.arrayTask = [];
  }
  addTask (task) {
    this.arrayTask.push(task);
    console.log(task.render());
  }

  remove (removeTask){
    let count = 0;
    for (let task of this.arrayTask){
      if(task.task === removeTask){
        this.arrayTask.splice(count,1)
        console.log("Task Removed");
        return `task`

      }  count++;
    }
    return null;
  }
 // toDoList.removeTask('Remove Me!');


  render (){
    let string = '';
    let num = 0;
    for (let task of this.arrayTask){
    string = string + `|${num}> ${task.render()} \n`
    num = num + 1;
  }
  return `|---------\n|${this.name}\n|---------\n${string}`;
}
}

const toDoList = new List('To Do');
toDoList.addTask(myTask);
toDoList.addTask(yourTask);
toDoList.addTask(myTaskWithAssignee);
// console.log(myTask.render());
// console.log(myTaskWithAssignee.render());
console.log(toDoList.render());
// console.log(toDoList.render());
toDoList.remove('Buy Apples');
console.log(toDoList.render());









//
