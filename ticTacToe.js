//obteniendo las celdas de la matriz
var myTurn = true
let level = 0
let contador = 0
let cuadricula = ['1','2','3','4','5','6','7','8','9']
let ids = [1,2,3,4,5,6,7,8,9]
let arr = [1,2,3,4,5,6,7,8,9]
let winner = false

function getId (id) {

    return document.getElementById(id)
}



 //function get(key) {
//   return document.querySelector(`#${key}`)
// }



function init() {
  myTurn =  true
console.log('comienza el juego')
arr = [1,2,3,4,5,6,7,8,9]
contador = 0
winner = false


//swal("Time to Play")
  //clearing board
  cuadricula.forEach((item) => getId(item).innerHTML = "")

    cuadricula.forEach( (item) => getId(item).addEventListener("click",  callback ))

    getId("msg").innerHTML = "Your turn,  X begins"
}





function callback(ev) {
  let id = ev.target.id
  writeOn(id)
  }


  function writeOn(id) {

  if (winner) {
    return console.log('over')
  }
  else {

  insertText(id)
  getId(id).removeEventListener("click", callback)
  narrowing(id)
  myTurn = !myTurn
  level++
  newLevel(id)
  }
}

function insertText (id) {


  console.log('se dibujo en ' + id)
//check if game is over

  if (myTurn && contador < 5) {
    contador++

    getId(id).innerHTML = "X" ;
    getId('msg').innerHTML = `O's turn` ;

    if (checkWinner("X")) {
      console.log('GANO x')

       setTimeout( () => {
         //sweet alert library
         swal( {
                title: `Game Over X's won`,
                text: 'Wanna play again?',
                showCancelButton: true,
                confirmButtonText: "Ok",
                closeOnConfirm: true
                }, function (ok) {
                    if (ok) {
                      init()
                    }
                   })
       },300)

        return winner = true
    }
  }

  else if (!myTurn && contador < 5) {

    getId(id).innerHTML = "O"
    getId('msg').innerHTML = `X's turn`
    if (checkWinner("O")) {

       setTimeout(() => {
         swal({
           title: `Game Over O's won`,
           text: 'Wanna play again?',
           showCancelButton: true,
           confirmButtonText: "Ok",
           closeOnConfirm: true
         }, function (ok) {
           if (ok) {
             init()
           }
            })

       },300)
        return winner = true
    }
  }

  else if (contador = 5) {
    return swal({
      title: `Game Over`,
      text: 'Wanna play again?',
      showCancelButton: true,
      confirmButtonText: "Ok",
      closeOnConfirm: true
      }, function (ok) {
          if (ok) {
            init()
          }
         })
  }

}



function generateMove() {
  let max = Math.max.apply(null, arr);
  let min = Math.min.apply(null, arr);

return Math.round(Math.random()*(max-min)+min)
}



function narrowing(id) {

  let index = arr.indexOf(parseInt(id))

  arr.splice(index,1)
}



function newLevel(id) {

console.log('toca en ' +id)
if(myTurn) {
  console.log('juegas tu')
}

//necesito reducir las opciones de juego de la pc

else if (!myTurn) {

  let randomMove = baseCase()


//check if move is allowed

while (randomMove == id) {
  console.log('looping 1')

  randomMove = generateMove()
}

//bases cases
//baseCase(id)

  //esta en el array?

  while( arr.indexOf(randomMove) == -1  && arr.length >1) {
    console.log('looping 2')
      //este valor no sirve, dame otro

      randomMove = generateMove()

  }

//jugea la pc
  console.log('juega la pc en '+ randomMove)
  setTimeout(() => writeOn(randomMove) ,500)

}

}





//check for winner

function getSquare(id) {
  return getId(id).innerHTML
}


function  checkRow(a,b,c,move) {
  let result = false
  if (getSquare(a) ==  move && getSquare(b) == move && getSquare(c) == move ) {
    result = true
  }
  return result
}


function checkWinner(move) {
  let won =  false
  if(checkRow(1,2,3,move) ||
     checkRow(4,5,6,move) ||
     checkRow(7,8,9,move) ||
     checkRow(1,4,7,move) ||
     checkRow(2,5,8,move) ||
     checkRow(3,6,9,move) ||
     checkRow(1,5,9,move) ||
     checkRow(3,5,7,move) )
  {
       won = true
  }
return won
}



function baseCase(id) {

let move = generateMove();

  if (getSquare(1) ==  'X' && getSquare(2) == 'X' && getSquare(3) == '' ) {
    move = 3
  console.log('juego en el vacio')
  }

  if (getSquare(1) ==  'X' && getSquare(4) == 'X' && getSquare(7) == '' ) {
    move = 7
  console.log('juego en el vacio')
  }

  return move
}
