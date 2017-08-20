
/*
function runn(){
	
	for(var i=0; i<10; i++){
		if(i%2==0){
			return true;
		}
		else{
			return false;
		}
	}
	console.log(123)
}
console.log( runn() )

// ok so a return statement inside a conditional within a for loop does stop the function
// this one only runs once bcus it checks i=0, 0 %2==0 is true and ya it stop the loop and function
// ln 13 doesn't even run! at the 1st return the whole function does stop, interesting didn't know that

*/


var books = JSON.parse(localStorage.getItem('books')) || [];
var valueChanger = 1;

alert(localStorage.getItem('books'));

function addValue(){
  books.push({title:"TheGiver"});
  localStorage.setItem('books', JSON.stringify(books));
  alert(localStorage.getItem('books'));
}
addValue();


//MINDBLOWN! idk why I missed it! but now ISee how to keep saving the state of the LocalStorage
// instead of initializing an empty array, do a retrieval of what's already in it.