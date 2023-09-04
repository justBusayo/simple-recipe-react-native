export const SET_USER_DETAILS = "setUserDetails"
export const SET_IS_LOGIN = "setIsLogin"
export const SET_MENU_DETAILS = "setMenuDetails"
export const userInitialState = {
    isLogin: false,
    userDetails: {
        name: "a",
        email: "a@b.com",
        password: ""
    },
    menuDetails: {}
}

const userStoreReducer = (state, action) => {
    switch (action.type) {
        case SET_IS_LOGIN:
            return {
                ...state,
                isLogin: action.payload
            };
        case SET_USER_DETAILS: 
            return {
                ...state,
                userDetails: action.payload
            };
        case SET_MENU_DETAILS:
            return {
                ...state,
                menuDetails: action.payload
            }
        default:
            return state;
    }
}

export default userStoreReducer;
