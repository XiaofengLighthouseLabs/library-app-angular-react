import React from 'react';

const BooksTable = props => (
  
    <table className="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">ISBN</th>
                <th scope="col">Date Added</th>
                <th scope="col">Summary</th>
                
            </tr>
        </thead>
    <tbody>
        {
            props.books.length > 0 ? (
                props.books.map (book => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.isbn}</td>
                        <td>{book.dateAdded}</td>
                        <td>{book.summary}</td>
                        <td className="center-align">
                            <button 
                                className="btn btn-info"
                                onClick={() => props.editRow(book)}>
                                edit
                            </button>
                        </td>
                        <td className="center-align">
                            <button 
                                className="btn btn-danger"
                                onClick={() => props.deleteBook(book.id)}>
                                delete
                            </button>
                        </td> 
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3}>{props.books[0]} No Books</td>
                    </tr>
                )
        }          
    </tbody>
  </table>
);
    
export default BooksTable;