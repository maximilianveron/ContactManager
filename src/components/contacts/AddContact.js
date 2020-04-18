import React, { Component } from 'react'

import { Consumer } from '../../context'
import TextInputGroup from '../layout/TextInputGroup'
import axios from 'axios'
import { v4 as uuid4 } from 'uuid';

class AddContact extends Component {
state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
}
    onSubmit = async(dispatch, e) => {
        e.preventDefault();
        
        const { name, email, phone, errors } = this.state;

        //Check For Error
        if(name === '') {
            this.setState({errors: { name: 'Name Is Required'}})
            return;
        }
        if(email === '') {
            this.setState({errors: { email: 'Email Is Required'}})
            return;
        }
        if(phone === '') {
            this.setState({errors: { phone: 'Phone Is Required'}})
            return;
        }
        const newContact = {
            name,
            email,
            phone
        }
        const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact)
        
        dispatch({type: 'ADD_CONTACT', payload: res.data});
        
        this.setState ({
            name:'',
            email:'',
            phone:'',
            errors: {}

        })

        this.props.history.push('/');

    }

    onChange = e => this.setState({[e.target.name]: e.target.value});
   
    render() {
        const { name, email, phone, errors } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return(
                        <div className="card mb-3">
                        <div className="card-header">
                            Add Contact
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                <TextInputGroup 
                                    label="Name"
                                    name="name"
                                    placeholder="Enter Your Name ..."
                                    value={name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                />
                                 <TextInputGroup 
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter Your Email"
                                    value={email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />
                                 <TextInputGroup 
                                    label="Phone"
                                    name="phone"
                                    placeholder="Enter Your Phone"
                                    value={phone}
                                    onChange={this.onChange}
                                    error={errors.phone}
                                />
                               
                                <input type="submit" value="Add Contact" className="btn btn-light btn-block"/>
                            </form>
                        </div>
                    </div>
                    )
                }}
            </Consumer>
        )
     
    }
}


export default AddContact;