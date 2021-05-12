import React, { useState } from 'react'

const AddBookForm = (props) => {
    
  const initialFormState = {title: '', author: '', isbn:'', dateAdded:'', summary:''}
  const [book, setBook] = useState(initialFormState)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setBook({ ...book, [name]: value })
  }

  const submitForm = e => {
      e.preventDefault();   
      props.addBook(book);
      console.log(book);
      setBook(initialFormState);
  }

  return (
    <form onSubmit={submitForm}>
       <div className="form-group">
        <label htmlFor="title">title</label>
        <input className = "form-control"
          type="text"
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
        <label htmlFor="isbn">isbn</label>
        <input className = "form-control"
          type="text"
          name="isbn"
          value={book.isbn}
          onChange={handleInputChange}
        />              
      </div>

      <div className="form-group">        
        <label htmlFor="dateAdded">date added</label>
        <input className = "form-control"
          type="text"
          name="dateAdded"
          value={book.dateAdded}
          onChange={handleInputChange}
        />              
      </div>

      <div className="form-group">        
        <label htmlFor="summary">summary</label>
        <input className = "form-control"
          type="text"
          name="summary"
          value={book.summary}
          onChange={handleInputChange}
        />             
      </div> 
      <div className="row">
        <div className="col">
          <button className="btn btn-primary">Add new book</button>
        </div>    
        <div className="col">
            <button className="btn btn-danger" onClick={() => {props.setShowing(false); props.setEditing(false)}}>Cancle</button>
        </div>
      </div>
    </form>
  )
}

export default AddBookForm