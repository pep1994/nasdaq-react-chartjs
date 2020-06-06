import React, { Component } from 'react'

class Search extends Component {
    constructor(props){
        super(props);
        console.log(props);
        
        this.state = {
            search: ""
        }
    }

    submitHandler = e => {
        e.preventDefault();
        this.props.onInputSearch(this.state.search); 
        this.setState({
            search: ""
        })   
    }

    focusHandler = e => {
        e.target.blur();
    }

    onInputChange = e => {
        this.setState({
            search: e.target.value
        })
    }
    render() {
        return (
            <form className="form-inline" onSubmit={this.submitHandler} style = {{marginBottom: '20px'}}>
                <div className="form-group">
                    <input 
                    type="text" name="search" onChange={this.onInputChange} className="form-control" placeholder="...cerca" value={this.state.search} aria-describedby="helpId"/>
                </div>
                <button onFocus={this.focusHandler} type="submit" className="btn btn-warning cercaButton"><i className="fas fa-search"></i></button>
            </form>
        )
    }
}

export default Search
