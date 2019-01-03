import React from "react";
import firebase from 'react-native-firebase';
import {View, Dimensions, Text, TouchableOpacity, StyleSheet, FlatList} from "react-native";
import {connect} from "react-redux";
import * as actions from '../redux/action';
const FIREBASE_DB_LIST_USER_REF = firebase.database().ref("users");
const FIREBASE_DB_CURRENT_USER_CONVERSATION_IDS = firebase.database().ref("users/"+ firebase.auth().currentUser.uid+"/conversationIds");

class ListUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listUser: []
        }
    }

    render() {
        return <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={this.props.listUser}
                renderItem={({item, index})=>(
                    <TouchableOpacity
                        style={{height: 70, alignItems: "center", flexDirection: "row", width: Dimensions.get("window").width}}
                        onPress={()=>{this.onPressItem(index)}}>
                        <Text style={{marginLeft: 10}}>{item.mail}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    }

    onPressItem = (index) => {
        var friend = this.props.listUser[index];
        console.log("firebase.auth().currentUser", firebase.auth().currentUser);
        console.log("selected friend", friend);
        FIREBASE_DB_CURRENT_USER_CONVERSATION_IDS.once('value', async(snapshot)=> {
            var found = false;
            snapshot.forEach((child) => {
                if (child.key === friend.uid){
                    found = true;
                    this.props.navigation.navigate("ConversationScreen", {
                        conversationId: child.val().conversationId
                    });
                    return true;
                }
            });
            if (!found){
                var conversationId = friend.uid+firebase.auth().currentUser.uid;
                FIREBASE_DB_CURRENT_USER_CONVERSATION_IDS.child(friend.uid).set({
                    conversationId
                }, (error) => {
                    if (error) {
                        console.log("error", error);
                    } else {
                        firebase.database().ref("users/"+ friend.uid+"/conversationIds/"+firebase.auth().currentUser.uid).set({
                            conversationId
                        }, (error) => {
                            if (error) {
                                console.log("error", error);
                            } else {
                                this.props.navigation.navigate("ConversationScreen", {
                                    conversationId
                                });
                            }
                        })
                    }
                })
            }

        })
    };

    componentDidMount() {
        FIREBASE_DB_LIST_USER_REF.on('value', async (snap) => {
            // get children as an array
            var items = [];
            snap.forEach((child) => {
                if (child.key !== firebase.auth().currentUser.uid){
                    items.push({
                        uid: child.key,
                        mail: child.val().mail
                    });
                }

            });
            // console.log("items", items);
            await this.props.loadAllUser(items);

        });
    }

    componentWillUnmount() {
        FIREBASE_DB_LIST_USER_REF.off('value', (snap) => {

        });
    }
}


const mapStateToProps = state => ({
    listUser: state.listUser
});

export default connect(mapStateToProps, actions)(ListUser);

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    list: {
        flex: 1
    }
});