// validate name
export const isValidName = (stringName) => {
    return stringName;
}

// validate email
export const isValidEmail = (stringEmail) => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/).test(stringEmail)
}

//validate password
export const isValidPassword = (stringPassword) => {
    return stringPassword.length >= 6;
}

// validate passwordConfirm
export const isValidPasswordConfirm = (stringPassword, stringPasswordConfirm) => {
    return stringPasswordConfirm == stringPassword;
}