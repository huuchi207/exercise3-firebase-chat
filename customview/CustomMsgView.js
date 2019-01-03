import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";

const styles= StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 70,
        marginLeft: 10,
        marginRight: 10
    },
    msg: {
        flex: 1
    },
    blankSpace: {
        flex: 5
    }
})
export const CustomMsgView = ({msg, isMyMsg, createdAt})=> (
    <ViewPriority isMyMsg={isMyMsg} msg={msg}/>
);

const ViewPriority=({isMyMsg,msg}) => {
    console.log("isMyMsg", isMyMsg);
    if (!isMyMsg){
        return (
        <View style={styles.container}>
            <Text style={styles.msg}>{msg}</Text>
            <View style={styles.blankSpace}/>
        </View>)
    } else {
            return (
        <View style={styles.container}>
            <View style={styles.blankSpace}/>
            <Text style={styles.msg}>{msg}</Text>
        </View>)
    }
};