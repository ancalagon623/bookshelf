var books = [

];

var fetch = function (query) {
  $('.books').empty();
  $('.spinner').toggle();
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=" + query,
    dataType: "json",
    success: function (data) {
      addBooks(data);
      $('.spinner').toggle();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    },
  });
};

var addBooks = function (data) {
  books = [];

  for (var i = 0; i < data.items.length; i++) {
    var bookData = data.items[i];

    var book = {
      title: bookData.volumeInfo.title || null,
      author: bookData.volumeInfo.authors ? bookData.volumeInfo.authors[0] : null,
      imageURL: bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.thumbnail : null,
      pageCount: bookData.volumeInfo.pageCount || null,
      isbn: bookData.volumeInfo.industryIdentifiers ?
        bookData.volumeInfo.industryIdentifiers[0].identifier : null
    };

    books.push(book);
  }

  renderBooks();
};

var renderBooks = function () {
  var $booksDiv = $('.books');
  $booksDiv.empty();
  var source = $('#book-template').html();
  var bookTemplate = Handlebars.compile(source);

  for (var i = 0; i < books.length; i++) {
    var currentBook = books[i];
    var completeBookHTML = bookTemplate({title: currentBook.title, author: currentBook.author, pageCount: currentBook.pageCount, isbn: currentBook.isbn, imageURL: currentBook.imageURL});

    $booksDiv.append(completeBookHTML);
  }
};

$('.search').on('click', function () {
  var search = $('#search-query').val();

  fetch(search);
});

renderBooks();