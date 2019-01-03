import {combineReducers} from 'redux';
import userInfo from "./UserReducer";
import conversation from "./ConversationReducer";
import listUser from "./ListUserReducer";
export default combineReducers({
    userInfo,
    conversation,
    listUser
})