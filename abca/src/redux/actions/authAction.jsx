export const signUp = (user) => ({
    type: "SIGNUP",
    payload: user
});

export const logIn = () => ({
    type: "LOGIN"
});

export const logOut = () => ({
    type: "LOGOUT"
});
export const addUser = (user) => ({
    type: 'ADD_USER',
    payload: user,
});