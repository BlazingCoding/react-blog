import React, {Component} from 'react';
import { connect } from 'react-redux'
import { registerUser } from '../../actions/user_actions'
// import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
// import RegisterLogin from "./index";

class Register extends Component {

    state = {
        lastname: "",
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: []
    }

    handleChange = event => {
        this.setState({[event.target.name]:event.target.value})
    }

    isFormValid = () => {
        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)){
            error = { message: "Fill in all fields"}
            this.setState({errors : errors.concat(error)})
        } else if(!this.isPasswordValid(this.state)) {
            error = { message: "Password is invalid"}
            this.setState({errors: errors.concat(error)})
        } else {
            return true
        }
    }

    isPasswordValid = ({password, passwordConfirmation}) => {
        if(password.length < 6 || passwordConfirmation.length <= 6){
            return false
        } else if(password !== passwordConfirmation) {
            return false
        } else {
            return true
        }
    }

    isFormEmpty = ({lastname, name, email, password, passwordConfirmation}) => {
        return (
            !name.length ||
            !lastname.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length
        )
    }

    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            email:this.state.email,
            name: this.state.name,
            lastname: this.state.lastname,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation
        }
        console.log(dataToSubmit);

        if(this.isFormValid()) {
            this.setState({errors: [] })
            this.props.dispatch(registerUser(dataToSubmit))
                .then(response => {
                    if(response.payload.success){
                        this.props.history.push('/login')
                    } else {
                        this.setState({
                            errors: this.state.errors.concat("your attempt to send data to DB was failed")
                        })
                    }
                })
                .catch(err => {
                    this.setState({
                        errors: this.state.errors.concat(err)
                    })
                })
        } else {
            console.error("Form is not vaild")
        }
    }

    render() {
        return (
            <div className="container">
                <h2>Sign Up</h2>

                <div className="row">
                    <form className="col s12">

                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    name="lastname"
                                    value={this.state.lastname}
                                    onChange={e => this.handleChange(e)}
                                    id="lastname"
                                    type="text"
                                    className="validate"
                                />
                                <label className="active" htmlFor="lastname">lastname</label>
                                <span
                                    className="helper-text"
                                    data-error="Type a right type email"
                                    data-success="right"
                                />
                            </div>
                        </div> {/* lastname */}

                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    name="name"
                                    value={this.state.name}
                                    onChange={e => this.handleChange(e)}
                                    id="name"
                                    type="text"
                                    className="validate"
                                />
                                <label className="active" htmlFor="name">name</label>
                                <span
                                    className="helper-text"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>
                        </div> {/* name */}

                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    name="email"
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                    id="email"
                                    type="email"
                                    className="validate"
                                />
                                <label className="active" htmlFor="email">email</label>
                                <span
                                    className="helper-text"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>
                        </div> {/* email */}

                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    name="password"
                                    value={this.state.password}
                                    onChange={e => this.handleChange(e)}
                                    id="password"
                                    type="password"
                                    className="validate"
                                />
                                <label className="active" htmlFor="password">Password</label>
                                <span
                                    className="helper-text"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>
                        </div> {/* password */}

                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    name="passwordConfirmation"
                                    value={this.state.passwordConfirmation}
                                    onChange={e => this.handleChange(e)}
                                    id="passwordConfirmation"
                                    type="password"
                                    className="validate"
                                />
                                <label className="active" htmlFor="passwordConfirmation">Password Confirmation</label>
                                <span
                                    className="helper-text"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>
                        </div> {/* passwordConfirmation */}

                        {/*{this.state.errors.length && (*/}
                        {/*    <div>*/}
                        {/*        {this.displayErrors(this.state.errors)}*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        <div className="row">
                            <div className="col s6">
                                {/* LOGIN*/}
                                <button
                                    className="btn waves-effect red lighten-2"
                                    type="submit"
                                    name="action"
                                    onClick={this.submitForm}
                                >
                                    Create an account
                                </button>
                            </div>
                        </div>



                    </form>
                </div>
            </div>
        );
    }
}

// export default Register;
export default connect()(Register)