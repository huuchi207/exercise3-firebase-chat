import * as ActionConstant from "../action/Constant";
var listUser = [];
export default function (state = listUser, action) {
    switch (action.type) {
        case ActionConstant.ALL_USER:
            return action.payload;
        default:
            return state;
    }
}