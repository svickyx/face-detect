import React, {Component} from 'react';

// Front-end + Back-end
// 1. in order to check if the email and password is correct in the back end, it's the best to just do in sign-in compoennt, and transfer simple sign in function to a class component
// 2. add email and password state, and add 2 function to setState for email and password, put them in the email and password <input> with onChange
// 3. add onSignInSubmit(will change the route to 'home' if sign in successed) to listen to submit <input> sign in
// 4. working on fetch(connect front and back through fetch function) in the onSignInSubmit function, fetch has 2 props, 1) url 2) an object describe what the POSTMAN did before, method, headers, body
// 5. once we get success response from backend, we can keep wring fetch, use .then to add if condition to limit what the front-end should show. success lead to homepage, error logging in lead to re-enter the information

class SignIn extends Component {
    constructor(){
        super();
        this.state = {
          signInEmail: '',
          signInPassword: ''  
        }
    }

    onEmailChange = (event)=> {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event)=> {
        this.setState({signInPassword: event.target.value})
    }

    onSignInSubmit = ()=> {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home')
            }
        })
    }


    render(){
    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80 center">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor='email'>Email</label>
                        <input 
                        onChange = {this.onEmailChange}
                        //MISTAKE: onChange = {this.state.SignInEmail}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor='password'>Password</label>
                        <input
                        onChange = {this.onPasswordChange} 
                        //MISTAKE: onChange = {this.state.SignInPassword}
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password" />
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                    onClick = {this.onSignInSubmit}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                    <a onClick = {()=> this.props.onRouteChange('register')} href="#0" className="f6 link dim black db center">Register</a>
                    </div>
                </div>
            </main>
        </article>
        )
    }
};

export default SignIn;