const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true"
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGNUP":
            localStorage.setItem("user", JSON.stringify(action.payload));
            return { ...state, user: action.payload };

        case "LOGIN":
            localStorage.setItem("isAuthenticated", "true");
            return { ...state, isAuthenticated: true };

        case "LOGOUT":
            localStorage.removeItem("isAuthenticated");
            return { ...state, isAuthenticated: false };
        case 'ADD_USER':
            return {
                ...state,
                users: [...state.users, action.payload],
            };

        default:
            return state;
    }
};

export default authReducer;
