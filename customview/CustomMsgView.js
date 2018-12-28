import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";

const styles= StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 70
    },
    msg: {
        flex: 1
    },
    blankSpace: 5
})
export const CustomMsgView = ({msg, isMyMsg, createdAt})=> (
  <View style={styles.container}>
      <ViewPriority isMyMsg={isMyMsg}/>
  </View>
);

const ViewPriority=(isMyMsg) => {
    if (!isMyMsg){
        return (
        <View>
            <Text style={styles.msg}>{msg}</Text>
            <View style={styles.blankSpace}/>
        </View>)
    } else {
            return (
        <View>
            <View style={styles.blankSpace}/>
            <Text style={styles.msg}>{msg}</Text>
        </View>)
    }
}