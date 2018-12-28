import * as ActionConstant from "../action/Constant";
var userCredential = null;
export default function (state = userCredential, action) {
    switch (action.type) {
        case ActionConstant.ADD_CURRENT_USER:
            return action.payload;
        case ActionConstant.REMOVE_CURRENT_USER:
            return null;
        default:
            return state;
    }
}