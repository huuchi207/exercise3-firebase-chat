import * as ActionConstant from "../action/Constant";
var msgs = [];
export default function (state = msgs, action) {
    switch (action.type) {
        case ActionConstant.ADD_MSG:
        console.log("case ActionConstant.ADD_MSG:");
            return [...state, action.payload];
        case ActionConstant.ALL_MSG:
            console.log("case ActionConstant.ALL_MSG:");
            return action.payload;
        default:
            console.log("case default:");
            return state;
    }
}