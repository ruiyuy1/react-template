import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils";
import { setToken as _setToken, getToken,removeToken } from "../../utils";
const userStore = createSlice({
    name: "user",
    initialState: {
        token: getToken() || "",
        userInfo: {}
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            _setToken(action.payload);
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        clearUserInfo(state) {
            state.userInfo = {};
            state.token = "";
            removeToken();
        }
    }
});

const { setToken,setUserInfo,clearUserInfo } = userStore.actions;


const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await request.post("/login", loginForm);
        dispatch(setToken(res.data.token));
    }
};

const userReducer = userStore.reducer;

export { setToken, setUserInfo, clearUserInfo, fetchLogin };

export default userReducer;