const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(express.json());

const books = [
  { title:'Last stop on Market Street',
    author:'de la Peña, Matt',
    isbn:'9780399257742',
    dateAdded:"4/5/2021",
    summary:'A young boy rides the bus across town with his grandmother and learns to appreciate the beauty in everyday things.',
    id:1},

  { title:'The cat in the hat',
    author:'Seuss, Dr.',
    isbn:'9780394800011',
    dateAdded:'4/5/2021',
    summary:'Two children sitting at home on a rainy day are visited by the Cat in the Hat who shows them some tricks and games.',
    id:2},
  { title:'LMNO peas',
    author:'Baker, Keith',
    isbn:'9781416991410',
    dateAdded:'4/5/2021',
    summary:'Busy little peas introduce their favorite occupations, from astronaut to zoologist.',
    id:3}
];

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Library REST API!');
  });

app.get('/api/books', (req,res)=> {
  res.send(books);
  });
app.get('/api/books/:id', (req, res) => {
  const book = books.find(c => c.id === parseInt(req.params.id));

  if (!book) res.status(404).send('<h2>Can not find what you are looking for!</h2>');
  res.send(book);
  });

app.post('/api/books', (req, res)=> {

  const book = {
  id: books.slice(-1)[0].id + 1,
  title: req.body.title,
  author:req.body.author,
  isbn:req.body.isbn,
  dateAdded:req.body.dateAdded,
  summary:req.body.summary
  };
  books.push(book);
  res.send(book);
  });

app.put('/api/books/:id', (req, res) => {
  const book = books.find(c=> c.id === parseInt(req.params.id));
  if (!book) res.status(404).send('<h2>Not Found!! </h2>');

  book.title = req.body.title;
  book.author = req.body.author;
  book.isbn = req.body.isbn;
  book.dateAdded = req.body.dateAdded;
  book.summary = req.body.summary;
  res.send(book);
  });

app.delete('/api/books/:id', (req, res) => {

  const book = books.find( c=> c.id === parseInt(req.params.id));
  if(!book) res.status(404).send('<h2> Not Found!! </h2>');

  const index = books.indexOf(book);
  books.splice(index,1);

  res.send(book);
  });

  const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));


