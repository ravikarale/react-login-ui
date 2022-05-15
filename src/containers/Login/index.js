import Login from '../../components/Login';
import { connect } from 'react-redux'; 
import { login } from '../../api/auth';
import {get as _get} from 'lodash';
import { createNamespacer } from '../../commons/utils/reducer';

const mapStateToProps = (state) => {
    return {
        username: state.login.username,
        password: state.login.password,
        error: state.login.error,
        userDetails: state.session.userDetails,
    }
}

const validate = (getState) => {
    const state = getState().login;

    let errors = {}

    if(!state.username.value){
        errors.username = "Username or Email is required."
    } else {
        errors.username = ''
    }

    if(!state.password.value){
        errors.password = "Password is required."
    } else {
        errors.password = ''
    }

    return errors;
}

const namespacer = createNamespacer('LOGIN')
const sessionnamespacer = createNamespacer('SESSION')

const mapDispatchToProps = (dispatch) => {
    return {
        setUsername: (value) => {
            dispatch({
                type: namespacer("SET_USERNAME"),
                payload: {
                    value,
                }
            })
        },
        setPassword: (value) => {
            dispatch({
                type: namespacer("SET_PASSWORD"),
                payload: {
                    value,
                }
            })
        },
        submit: (data) => {
            const handleError = (value) => {
                dispatch({
                    type: namespacer("SET_ERROR"),
                    payload: {
                        value
                    },
                })
            }
            dispatch((dispatch, getState) => {
                let errors = validate(getState)

                dispatch({
                    type: namespacer('SET_FIELD_ERRORS'),
                    payload: {
                        value: errors
                    }
                })

                if(!Object.values(errors).filter(Boolean).length){
                    (async () => {
                        let response;
                        try {
                            response = await login(data);
                        } catch (e) {
                            if(_get(e, 'response.data.errors')){
                                handleError(e.response.data.errors)
                            } else {
                                handleError("Oops! Something went wrong. Please try again.")
                            }
                            return;
                        }
                        if(response.data.hasOwnProperty("errors")){
                            handleError(response.data.errors);
                        } else {
                            if(response.data){
                                let userDetails = response.data;
                                localStorage.setItem("token", response.headers["x-access-token"])
                                dispatch({
                                    type: sessionnamespacer("SET_LOGGED_IN"),
                                    payload: {
                                        value: true,
                                    }
                                });

                                dispatch({
                                    type: sessionnamespacer("SET_USER_DATA"),
                                    payload: {
                                        value: true,
                                    }
                                });
                
                                dispatch({
                                    type: namespacer("CLEAR_LOGIN_FORM"),
                                });
                            }
                        }
    
                        
                    })()
                }
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)