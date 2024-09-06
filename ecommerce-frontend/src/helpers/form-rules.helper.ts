const FIELD_IS_REQUIRED = { required: { message: 'Field is required', value: true } }

const FIELD_IS_EMAIL = {
    pattern: {
        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Please enter a valid email',
    }
}

const FORM_RULES = {
    FIELD_IS_REQUIRED,
    FIELD_IS_EMAIL
}

export default FORM_RULES