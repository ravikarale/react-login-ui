import React from 'react';
import { Button, Form } from 'reactstrap';
import FormInput from '../shared/FormInput'
import { Link } from 'react-router-dom';

function Login(props) {
    const handleUsernameChange = (event) => {
        props.setUsername(event.target.value)  
    }

    const handlePasswordChange = (event) => {
        props.setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        props.submit({
            email: props.username.value,
            password: props.password.value,
        });
    }

    return (
        <React.Fragment>
            <div className="auth-container">
                <div className="wrapper">
                    <div className="login-text-wrapper">
                        <h2 className="login-header text-center"><span>Welcome,</span> to be pythonmater!</h2>
                    </div>
                    {
                        props.error ? <div className="error-message">{props.error}</div> : null
                    }
                    <Form className="form" onSubmit={handleSubmit} noValidate>
                        <div className="form-fields-block">
                            <FormInput type="email"
                                label="Enter your username or email ID"
                                className="email-filed has-icon"
                                labelClass="has-icon"
                                value={props.username.value}
                                onChange={handleUsernameChange}
                                error={props.username.error}
                            />

                            <FormInput type="password"
                                label="Enter your password"
                                className="password-field"
                                labelClass="has-icon"
                                value={props.password.value}
                                onChange={handlePasswordChange}
                                error={props.password.error}
                            />
                        </div>
                        
                        <div className="footer">
                            <Button className="btn submit-btn" type="submit">Login</Button>
                            <div className='btn link'>
                                Not register? <Link to="/register">Register</Link>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;