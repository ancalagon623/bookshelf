var books = [
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    imageURL: 'https://books.google.com/books/content?id=WV8pZj_oNBwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    isbn: '9781921479311',
    pageCount: 268
  }
];

var renderBooks = function () {
  var $booksDiv = $('.books');
  $booksDiv.empty();
  var source = $('#book-template').html();
  var bookTemplate = Handlebars.compile(source);

  for (var i = 0; i < books.length; i++) {
    var currentBook = books[i];
    var completeBookTemplate = bookTemplate({title: currentBook.title, author: currentBook.author, pageCount: currentBook.pageCount, isbn: currentBook.isbn, imageURL: currentBook.imageURL});

    $booksDiv.append(completeBookTemplate);
  }
};

renderBooks();