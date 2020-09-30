import React, {Component} from 'react';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        }
    }

    onNameChange = (event)=> {
        this.setState({registerName: event.target.value})
    }

    onEmailChange = (event)=> {
        this.setState({registerEmail: event.target.value})
    }

    onPasswordChange = (event)=> {
        this.setState({registerPassword: event.target.value})
    }

    onRegisterSubmit = ()=> {
        fetch('http://localhost:3000/register', {
            method:'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }
    // in backend, response of register is user, so if we get the user information, route to 'home'
    // once people are registered, we also want to store their information, so it's time to create a new state at app.js to store the user information, go to App.js for the next step



    render(){
        const {onRouteChange} = this.props;
        return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80 center">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f3 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor='name'>Name</label>
                        <input 
                        onChange = {this.onNameChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" 
                        name="name"  
                        id="name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor='email'>Email</label>
                        <input 
                        onChange = {this.onEmailChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor='password'>Password</label>
                        <input
                        onChange = {this.onPasswordChange} 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password" />
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                    onClick = {this.onRegisterSubmit}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Register" />
                    </div>
                    <div className="lh-copy mt3">
                    <a onClick = {()=> onRouteChange('signin')} href="#0" className="f6 link dim black db center">Sign In</a>
                    </div>
                </div>
            </main>
        </article>
        )
    }
};

export default Register;