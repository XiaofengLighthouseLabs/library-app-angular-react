import React, { useState, useEffect } from 'react';

const EditBookForm = props => {
    const [book, setBook] = useState(props.currentBook);

    const handleInputChange = event => {
        const { name, value } = event.target
        setBook({ ...book, [name]: value })
    };

    const submitForm = event => {
        event.preventDefault();    
        props.updateBook(book.id, book);
    };

    useEffect(() => {
        setBook(props.currentBook);
    }, [props]);

    return (
        <div>
            <form 
                onSubmit={submitForm}>
                <div className="form-group">              
                    <label htmlFor="title">title</label>
                    <input  className = "form-control" type="text" 
                        name="title"
                        value={book.title}
                        onChange={handleInputChange} 
                        />              
                </div>
                <div className="form-group">                
                    <label htmlFor="author">author</label>
                    <input className = "form-control"
                        type="text" 
                        name="author" 
                        value={book.author}
                        onChange={handleInputChange} 
                    />                  
                </div>
                <div className="form-group">               
                    <label htmlFor="isbn">ISBN</label>
                    <input className = "form-control"
                        type="text" 
                        name="isbn" 
                        value={book.isbn}
                        onChange={handleInputChange} 
                    />                 
                </div>
                
                <div className="form-group">               
                    <label htmlFor="dateAdded">Date Added</label>
                    <input className = "form-control"
                        type="text" 
                        name="dateAdded" 
                        value={book.dateAdded}
                        onChange={handleInputChange} 
                    />                 
                </div>

                <div className="form-group">               
                    <label htmlFor="summary">Summary</label>
                    <input className = "form-control"
                        type="text" 
                        name="summary" 
                        value={book.summary}
                        onChange={handleInputChange} 
                    />                 
                </div>

                <div className="row">
                    <div className="col">

                        <button className="btn btn-primary">Update</button>
                    </div>

                    <div className="col">
                        <button 
                            className="btn btn-danger"
                            onClick={() => props.setEditing(false)}>
                                Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditBookForm;