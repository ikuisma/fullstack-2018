import React from 'react'
import blogService from '../services/blogs'

class CreateForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            author: '',
            url: ''
        }
    }

    handleFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    
    submitBlog = async (event) => {
        event.preventDefault()
        const {title, author, url} = this.state
        const newBlog = await blogService.create({title, author, url})
        this.setState({
            title: '',
            author: '',
            url: ''
        })
        this.props.onSuccess(newBlog)
    }
    
    render() {
        return (
            <form onSubmit={this.submitBlog}>
                <div>
                    Title <input type="text" name="title" onChange={this.handleFieldChange} value={this.state.title}/>
                </div>
                <div>
                    Author <input type="text" name="author" onChange={this.handleFieldChange} value={this.state.author}/>
                </div>
                <div>
                    URL<input type="text" name="url" onChange={this.handleFieldChange} value={this.state.url}/>
                </div>
                <input type="submit" value="Create"/>
            </form>
        )
    }
}

export default CreateForm