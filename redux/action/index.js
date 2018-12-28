import * as Constant from "./Constant";

export const saveCurrentUser=
    (userCredential) =>
        ({payload: userCredential, type: Constant.ADD_CURRENT_USER});

export const removeCurrentUser= ()=> ({type: Constant.REMOVE_CURRENT_USER});

export const addMessage= (msg) => ({payload: msg, type: Constant.ADD_MSG});

export const loadMessage= (msgs) => ({payload: msgs, type: Constant.ALL_MSG});