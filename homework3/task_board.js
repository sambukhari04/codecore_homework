



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
// const myTask = new Task('Laundry', 'You');
// const yourTask = new Task('Buy Apples');
// const myTaskWithAssignee = new Task('Pay Phone Bill', 'Me');
// console.log(myTask.render());
// console.log(myTaskWithAssignee.render());

class List {
  constructor(name) {
    this.name = name;
    this.arrayTask = [];
  }
  addTask (task) {
    this.arrayTask.push(task);
    // console.log(task.render());
    return this;
  }

  remove (removeTask){
    let count = 0;
    for (let task of this.arrayTask){
      if(task.task === removeTask){
        this.arrayTask.splice(count,1)
        // console.log("Task Removed");
        return task;

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

// const toDoList = new List('To Do');
// toDoList.addTask(myTask);
// toDoList.addTask(yourTask);
// toDoList.addTask(myTaskWithAssignee);
//
// const hello = new List('hey');
// hello.addTask(myTask);
// hello.addTask(yourTask);
// hello.addTask(myTaskWithAssignee);
// // console.log(myTask.render());
// // console.log(myTaskWithAssignee.render());
// // console.log(toDoList.render());
// // console.log(toDoList.render());
// toDoList.remove('Buy Apples');
// // console.log(toDoList.render());
//


//creating a board

class Board {
  constructor(name) {
    this.name = name;
    this.arrayList = [];
  }

  addList(list){
    this.arrayList.push(list);
    // console.log(list.name);
    return this;
  }

  removeList (name){
    let count = 0;
    for (let list of this.arrayList){
      if(list.name === name){
        this.arrayList.splice(count,1)
        // console.log("List Removed");
        return `list`;

      }  count++;
    }
    return null;
  }

  render (){
    let string = '';
    // let num = 0;
    for (let list of this.arrayList){
      string = string + `${list.render()} \n`
      // num = num + 1;
    }
    return `|*******\n|${this.name}\n|*******\n${string}`;
  }


  moveTaskTo(task,fromList,toList) {
     let taskToBeMoved='';
     let flagFromList=false;
     let flagToList=false;
     for(let list of this.arrayList){
      //  console.log(`fromlist ` + fromList + `\nlist ` + list.name);
       if (list.name === fromList){
          taskToBeMoved = list.remove(task)

       }
       if (list.name === toList){
         list.addTask(taskToBeMoved)
       }

     }

   }
}








const myTask = new Task('Laundry', 'You');
const yourTask = new Task('Buy Apples');
const myTaskWithAssignee = new Task('Pay Phone Bill', 'Me');
const toDoList = new List('To Do');

toDoList.addTask(myTask);
toDoList.addTask(yourTask);
toDoList.addTask(myTaskWithAssignee);

const hello = new List('hey');
hello.addTask(myTask);
hello.addTask(yourTask);
hello.addTask(myTaskWithAssignee);


 const myBoard = new Board('dodo')
 myBoard.addList(toDoList);
 myBoard.addList(hello);
 // console.log(myBoard.render());
 // myBoard.removeList('hey');
 // console.log(myBoard.render());
myBoard.moveTaskTo('Buy Apples', 'To Do', 'hey');
console.log(JSON.stringify(myBoard.arrayList, null, 2));
// console.log(myBoard.arrayList[0].remove('Laundry'));





//
