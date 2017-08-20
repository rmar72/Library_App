//=============Book Class==============//
function Book(oData) {
	this.title 	= oData.title,
	this.author = oData.author,
	this.pages 	= oData.pages,
	this.publishDate = oData.publishDate
}

//DOC READY
$(function(){
	window.jsLib = new Lib("JS303", "Denver", "CO");
	window.jsLib.init();
});

//===========Library Class==========//
var Lib = function(name, city, state){
	this.libName = name,
	this.city =	city,
	this.state = state
};

Lib.prototype.init = function(){
	this.$displayArea = $("#displayArea");
	this.$displayArea2 = $("#displayArea2");
	this.bookArr = JSON.parse(localStorage.getItem('books')) || [];
	this._bindEvents();
	this._showBooks();

}

Lib.prototype._bindEvents = function(){
	$("#addBook").on("click", $.proxy(this._getAddBookValues,this ) );
	$("#getTitles").on("click", $.proxy(this._getBookByTitle,this) );
	$("#getAuthors").on("click", $.proxy(this._getBooksByAuthor,this) );
	$("#rBookByTitle").on("click", $.proxy(this._removeBookByTitle,this) );
	$("#rBooksByAuthor").on("click", $.proxy(this._removeBooksByAuthor,this) );
	$("#showCatalog").on("click", $.proxy(this._showBooks,this) );
	$("#getDistinctAuthors").on("click", $.proxy(this._getAuthors,this) );
	$("#randomBook").on("click", $.proxy(this._getRandomBook,this) );
	$("#randomAuthor").on("click", $.proxy(this._getRandomAuthors,this) );
	$("#moreBooks").on("click", $.proxy(this._addBooksSetup,this) );
	$(".addMultiple").on("click", $.proxy(this._addBooks,this));
	$('#togCatalog').on('click',function(){
		var name = $(this);
		name.text()=="Show Library" ? name.text("Hide Library") : name.text("Show Library");
		$('#displayArea2').slideToggle(100);
	});
	$('#adminBtn').on('click',function(){
		var name = $(this);
		name.text()=="Show Admin Features" ? name.text("Hide Admin Features") : name.text("Show Admin Features");
		$('.admin').slideToggle(100);
	});
	$("#adminArea").on("click", "#litrash", function (){
		$(this).parent().fadeOut(500, function(){
			$(this).remove();
		});
	});
	$("#displayArea2").on("click", "i", function (){
		//pending
	});
}

Lib.prototype._addBook = function(a){

	var aVals = a;
	console.log(aVals, aVals.length)
	if (aVals.length >= 4){
		this.$displayArea.empty();
		var book = new Book({title: aVals[0], author: aVals[1], pages: aVals[2], publishDate: aVals[3]});

        for(var i = 0; i < this.bookArr.length; i++){
            if(this.bookArr[i].title == book.title) {
                alert("Book already exists.");
				return false;
            }
        }
        this.bookArr.push(book);
		localStorage.setItem('books', JSON.stringify(this.bookArr));
        this.$displayArea.append("<h2>Added Book</h2>"+"<li>" + book.title + "</li>");
        return this._showBooks();
    }
    return alert("All fields must be filled out. Please check book fields");
}

//Lib.prototype._getAddBookValues = function () {
//	var aVals = new Array();
//    $('#adminArea input[type~="text"]').each(function (index, val) {
//        var vInput = $(this).val();
//        if (vInput !== "" && vInput !== NaN) {
//            aVals.push($(this).val());
//        }
//    });
//	this._addBook(aVals);
//}

Lib.prototype._addBooks = function(){
	var aVals = this._getValues2();
	for(var i=0; i < aVals.length; i++){
		this._addBook(aVals[i]);
	}
}

Lib.prototype._getValues2 = function(){
	var arr1 = [], arr2 = [], len;

	$(".aBooks input").each(function (index, val) {
        var vInput = $(this).val();
		arr1.push(vInput);
		vInput
	});

	len = (arr1.length/4)-1;

	for(var i = 0; i <= len; i++){ // interesting bug it was to find, of using arr1.length/4+somenumber...Resulta que as I spliced that same arr1 in the conditional was also changing!
		arr2.push(arr1.splice(0,4));
	}
	return arr2;
}

Lib.prototype._addBooksSetup = function(){
	var htmlGen = '<li class="aBooks">\
						<input type="text" placeholder="Title"/>\
						<input type="text" placeholder="Author"/>\
						<input type="text" placeholder="Num. Pages"/>\
						<input type="text" placeholder="Publish Date"/>\
						<i class="fa fa-minus" aria-hidden="true" id="litrash"></i>\
					</li>';

	var admin = $("#adminArea");
	if(admin.children().length<=5){
		admin.append(htmlGen);
	}
	else{
		alert("Max of 5 books at a time.");
	}
}

Lib.prototype._showBooks = function(){
	this.$displayArea2.empty();
	var self = this.$displayArea2;

	var arrOfMyBooks = this.bookArr;

	arrOfMyBooks.forEach(function(book){
		self.append("<li><span id='trash'><i class='fa fa-trash'></i></span>" + book.title + "</li>");
	});
};


//////////////////////////////////////
//////////////////////////////////////

Lib.prototype._removeBookByTitle = function(){
	var titleInput = $('#booksRemoval1 input[type~="text"]').val();

	for(var i=0; i < this.bookArr.length; i++){
		if(this.bookArr[i].title == titleInput){
			this.$displayArea.empty();
			this.bookArr.splice(i,1);
			localStorage.setItem('books', JSON.stringify(this.bookArr));
			this.$displayArea.append("<h2>Deleted Book</h2>"+"<li>" + titleInput + "</li>");
			return this._showBooks();
		}
	}
}

Lib.prototype._removeBooksByAuthor = function(){
	var authorInput = $('#booksRemoval2 input[type~="text"]').val();

		for(var i=0; i < this.bookArr.length; i++){
			if(this.bookArr[i].author == authorInput){
				this.$displayArea.empty();
				this.bookArr.splice(i,1);
				localStorage.setItem('books', JSON.stringify(this.bookArr));
				i--;
				this.$displayArea.append("<h2>Deleted Book</h2>"+"<li>" + authorInput + "</li>");
			}
		}

	return this._showBooks();
}


Lib.prototype._getBookByTitle = function(){
	this.$displayArea.empty();
	this.$displayArea.append("<h2>Search Results:</h2>");

	var title = $('#sTitles input[type~="text"]').val(),
		reg	  = new RegExp(title, 'gi'),
		results = true;

	for(var i=0; i < this.bookArr.length; i++){
		if(this.bookArr[i].title.match(reg)){
			this.$displayArea.append("<li><strong>" + this.bookArr[i].title + "</strong> by <em>"+this.bookArr[i].author+"</em></li>");
		}
	}
	//results ? "" : alert("No such book exist.");
}

Lib.prototype._getBooksByAuthor = function(){
	this.$displayArea.empty();

	var author = $('#sAuthors input[type~="text"]').val(),
		reg	   = new RegExp(author, 'gi');
	this.$displayArea.append("<h3>Search Results for: <strong><em>"+author+"</em></strong></h3>");

	for(var i=0; i < this.bookArr.length; i++){
		if(this.bookArr[i].author.match(reg)){
			this.$displayArea.append("<li>" + this.bookArr[i].title+" by <strong><em>"+this.bookArr[i].author+"</em></strong></li>");
		}
	}
}

Lib.prototype._getAuthors = function(){
	this.$displayArea.empty();
	this.$displayArea.append("<h2>Distinct Authors</h2>");
	var aAuthors = [];

	for(var i=0; i < this.bookArr.length; i++){
		var oBookAuthor = this.bookArr[i].author;
		if(aAuthors.indexOf(oBookAuthor) <= -1){
			aAuthors.push(oBookAuthor);
			this.$displayArea.append("<li>" + oBookAuthor + "</li>");
		}
	}
}

Lib.prototype._getRandomBook = function(){
	this.$displayArea.empty();
	this.$displayArea.append("<h2>Random Book</h2>");
	var randomIndex = Math.floor(Math.random()*this.bookArr.length);
	this.$displayArea.append("<li>" + this.bookArr[randomIndex].title+ "</li>");
}

Lib.prototype._getRandomAuthors = function(){
	this.$displayArea.empty();
	this.$displayArea.append("<h2>Random Author</h2>");
	var randomIndex = Math.floor(Math.random()*this.bookArr.length);
	this.$displayArea.append("<li>" + this.bookArr[randomIndex].author + "</li>");
}
