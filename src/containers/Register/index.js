import Register from '../../components/Register';
import { connect } from 'react-redux'; 
import { register } from '../../api/auth';
import {get as _get} from 'lodash';
import { createNamespacer } from '../../commons/utils/reducer';

const mapStateToProps = (state) => {
    return {
        username: state.register.username,
        password: state.register.password,
        firstName: state.register.firstName,
        lastName: state.register.lastName,
        error: state.register.error,
        userDetails: state.session.userDetails,
    }
}

const validate = (getState) => {
    const state = getState().register;

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

    if(!state.firstName.value){
        errors.firstName = "First name is required."
    } else {
        errors.firstName = ''
    }

    if(!state.lastName.value){
        errors.lastName = "Last name is required."
    } else {
        errors.lastName = ''
    }

    return errors;
}

const namespacer = createNamespacer('REGISTER')

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
        setFirstName: (value) => {
            dispatch({
                type: namespacer("SET_FIRST_NAME"),
                payload: {
                    value,
                }
            })
        },
        setLastName: (value) => {
            dispatch({
                type: namespacer("SET_LAST_NAME"),
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
                            response = await register(data);
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
                            }
                        }
                    })()
                }
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)