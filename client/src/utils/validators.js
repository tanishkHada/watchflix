const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(email)){
        throw new Error("Invalid email")
    }
}

const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if(!regex.test(password)){
        throw new Error("Use 8+ chars with uppercase, number & symbol");
    }
}

const validators = {
    validateEmail,
    validatePassword
}

export default validators;