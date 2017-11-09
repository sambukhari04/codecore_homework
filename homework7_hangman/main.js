

$(document).ready(function() {
  const imageArray =["hangman-assets/gallows+head.jpg",
  "hangman-assets/gallows+head+torso.jpg", "hangman-assets/gallows+head+torso+arm.jpg", "hangman-assets/gallows+head+torso+2leg.jpg", "hangman-assets/gallows+head+torso+2leg+arm.jpg", "hangman-assets/gallows+head+torso+2leg+2arm.jpg",]
  const answer = "TODAY".split('');
  const answered = [];

  for (let i = 65; i <= 90; i++){
    $(".keyboard").append(
      `<div class="letter">${String.fromCharCode(i)}</div>`
    );
  }


  $('.letter').on('mouseover', function(event){
    $(this).addClass('highlight')
  })
  $('.letter').on('mouseleave', function(event) {
    $(this).removeClass('highlight')
  })

  $('.letter').on('click', function(event){
    if ($(this).hasClass("selected")){
      return
    }
    $(this).addClass('selected')
    // $(this).slideUp()
    const clickedLetter = $(this).html();
    // const index = answer.indexOf(clickedLetter);
    if (answer.includes(clickedLetter)) {
      for(let i = 0; i <= answer.length; i++){
        if (answer[i] === clickedLetter){
          answered[i] = clickedLetter
          $(`#${i}`).append(clickedLetter);
        }
      }
      if (answer.join("") === answered.join("")){
        setTimeout(function (){
          alert("You win!")
        }, 300)
        $('.letter').off();
      }
    }
    else {
      $('#hangman').attr('src', imageArray.shift());
      if (imageArray.length === 0){
        setTimeout(function (){
          alert("Try Again")
        }, 300)
        $('.letter').off();
      }
    }
  })
})
