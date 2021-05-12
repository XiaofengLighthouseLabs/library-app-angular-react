import React, { Component, } from 'react';
import BooksTable from '../components/BooksTable';
import AddBookForm from '../components/AddBookForm';
import EditBookForm from '../components/EditBookForm';
import qs from 'querystring';
import axios from 'axios';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            books:[],
            currentBook: { title: '', author: '', isbn:'', dateAdded:'', summary:''},
            editing: false,
            showing:false
        }
    }
    componentDidMount(){
        this.refreshBooksTable();
    }

    refreshBooksTable(){
        let config = {
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Accept': 'application/json'
            } 
       }
        this.usersData = axios.get('http://localhost:8080/api/books/', config)
        .then(response => response.data)
        .then(data =>{
            this.setState({
                books:data,
                setBooks:data
            })
        })
    }

    addBook = (book) =>{
        let config = {
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Accept': 'application/json'
            } 
       }       
       axios.post('http://localhost:8080/api/books/', qs.stringify(book), config)
            .then(res => {           
                this.refreshBooksTable();
            });
        this.setShowing(false);
        this.setEditing(false);
    };

    deleteBook = id => {
        let config = {
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Accept': 'application/json'
            } 
       }
       axios.delete(`http://localhost:8080/api/books/${id}`, config)
            .then(res => {
                this.refreshBooksTable();
            });
    };

    updateBook = (id, book) => {
        let config = {
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Accept': 'application/json'
            } 
       }
        axios.put(`http://localhost:8080/api/books/${id}`, qs.stringify(book),config)
            .then(res => {

                this.refreshBooksTable();
            });
        
        this.setState({ 
            currentBook: { id: book.id, title: '', author: '', isbn:'', dateAdded:'', summary:'' }
        });

        this.setEditing(false);
    };

    editRow = book => {

        this.setState({ 
            currentBook: { id:book.id, title: book.title, author: book.author, isbn:book.isbn, dateAdded:book.dateAdded, summary:book.summary }
        });

        this.setEditing(true);
    };

    setEditing = isEditing => {
        this.setState({ editing: isEditing });
    };

    setShowing = isShowing => {
        this.setState({
            showing: isShowing
        });
    }

    render(){
        const { books } = this.state;
        return(
            <div className="container">

                <div className="col s12 l6">
                    <h4>Books List</h4>
                    <BooksTable books={books} editRow={this.editRow} deleteBook={this.deleteBook} />
                </div>
                <button className="btn btn-info" onClick={()=>this.setState({showing:true})}>Add a New Book</button>
                    
                <div className="row">
                    {
                        (this.state.editing && !this.state.showing)? (
                            <div className="col s12 l6">
                                <h5>Edit Book</h5>
                                <EditBookForm 
                                    editing={this.state.editing}
                                    setEditing={this.setEditing}
                                    currentBook={this.state.currentBook}
                                    updateBook={this.updateBook} 
                                />
                            </div>
                        ) : (this.state.showing)?(
                            <div className="col s12 l6">
                                <h5>Add Book</h5>
                                <AddBookForm addBook={this.addBook} showing={this.state.showing} setShowing={this.setShowing} setEditing={this.setEditing}/>
                            </div>
                        ):<div></div>
                    }
                    
                    
                </div>
            </div>
        )
    }
}

export default Home;