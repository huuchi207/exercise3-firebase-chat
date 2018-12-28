import {combineReducers} from 'redux';
import userInfo from "./UserReducer";
import conversation from "./ConversationReducer";
export default combineReducers({
    userInfo,
    conversation
})