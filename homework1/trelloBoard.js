//  this is the change


const hello = {
    'Tester Board': {
      'To Do': ['Laundry', 'Buy Apples', 'Pay Phone Bill'],
      'Doing': ['Laundry', 'Studying Javascript', 'Studying HTML', 'Studying Ruby'],
      'Done': ['Laundry']
    },
    'Dreams': {
      'Wish List': ['Conquer the Seven Kingdoms', 'Get my baby back', 'My hand needs to chill'],
    }
};
//
function listboards (boards) {
  let count = 1;
  let result = "";
  for ( let key in boards) {
    result += "------------\n";
    result += `${count} - ${key} \n`;
    count +=1;
  }
  result += "------------";
  return result;
}

console.log(listboards(hello));

// func to create a Board

function createBoard (boardName){
  if (hello[boardName]){
    return 'Board name already exists';
  } else {
    hello[boardName] = "Empty Board";
    return`New ${boardName} board created`;
  }
}
//
console.log(createBoard("cuisine"));
console.log(createBoard("Dreams"));

// console.log(hello)


//func to remove the board


function removeBoard(boardName){
  if (hello[boardName]){
    delete hello[boardName]
    return`Board ${boardName} was removed`;
  } else {
    return 'Board does not exist';
  }
}
console.log(removeBoard("Dreamer"))
console.log(removeBoard("Tester Board"))

//creating the displayBoard
function displayBoard(boardName){
  let result = "";
  if (hello[boardName]){
    for (let listName in hello[boardName]){
      result += ("------------\n");
      result += (`${listName}\n`);

      for (let cardName of hello[boardName][listName]) {
        result+= (`|> ${cardName}\n`)
      }
    }
  } else {
    return'Board does not exist';
  }
  result += '-----------------';
  //  console.log("------------\n");
  return result;
}

console.log(displayBoard("Tester Board"))
console.log(displayBoard("Dreams"))


//creating the createList

function createList(boardName, listName) {
  if (hello[boardName]) {
    if (hello[boardName][listName]) {
      return `${listName} present`;
    } else {
      hello[boardName][listName] = [];
      return "Created";
    }
  } else {
    return "Board does not exist";
  }
}
console.log(createList('Laundry'));
console.log(createList('Dreams', 'Tester List'));
console.log("hello", hello);

//creating card

function createCard(boardName, listName, cardName){
  if (hello[boardName]) {
    if (hello[boardName][listName]){
      hello[boardName][listName].push(cardName)
      return "card added";
    } else {
      return "list doesn't exist";
    }
  } else {
    return "board doesn't exist";
  }
}
console.log(createCard('Dreams', 'Tester List'));



//remove list
function removeList(boardName, listName){
  if (hello[boardName]){
    if (hello[boardName][listName]){
      delete hello[boardName][listName]
      return`${listName} was removed`;
    } else {
      return "list does not exist";
    }
  } else {
    return "Board doesn't exist";
  }
}
console.log(removeList("Dreams", "Tester List"));
