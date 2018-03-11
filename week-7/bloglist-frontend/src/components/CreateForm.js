import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

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
        await this.props.createBlog({ title, author, url })
        await this.props.notify(`Blog ${title} added!`, 5)
        this.setState({ title: '', author: '', url: '' })
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

const mapStateToProps = (state) => {
    return {}
}

const ConnectedCreateForm = connect(mapStateToProps, { createBlog, notify })(CreateForm)

export default ConnectedCreateForm