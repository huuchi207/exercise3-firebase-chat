import React from "react";
import {
    View, StyleSheet, FlatList, TextInput,
    TouchableOpacity, Text, Dimensions
} from "react-native";
import firebase from 'react-native-firebase';
import {connect} from "react-redux";
import * as actions from "../redux/action";
import LoginScreen from "./LoginScreen";
import {CustomMsgView} from "../customview/CustomMsgView";

const FIREBASE_DB_CHAT_REF = firebase.database().ref("conversation");

class ConversationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: ""
        }
    }

    componentDidMount() {
        // FIREBASE_DB_CHAT_REF.on('value', (snapshot) => {
        //     console.log("snapshot", snapshot.val());
        //     // this.props.loadMessage(snapshot.val())
        // }, (errorObject) => {
        //     // dispatch(loadMessagesError(errorObject.message))
        // });
        FIREBASE_DB_CHAT_REF.on("child_added", function(snapshot, prevChildKey) {
            var newPost = snapshot.val();
            console.log("newPost", newPost);
            this.props.addMessage(newPost);
        });
    }


    render() {
        return <View style={styles.container}>
            <FlatList
                style={styles.conversation}
                data={this.props.conversation}
                renderItem={({item, index}) => (
                    <Text>{item.text}</Text>
                )}
                // keyExtractor={(item, index) => index}
            />
            <View style={styles.enterMessageView}>
                <TextInput style={styles.textInput} onChangeText={(text) => {
                    this.setState({newMessage: text})
                }
                }/>
                <TouchableOpacity style={styles.buttonSend} onPress={this.onSendMsg}>
                    <Text>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    }

    onSendMsg = () => {
        if (this.state.newMessage === "") {
            return;
        }
        let currentUser = firebase.auth().currentUser;
        let createdAt = new Date().getTime();
        let message= this.state.newMessage;
        let chatMessage = {
            text: message,
            createdAt: createdAt,
            user: {
                id: currentUser.uid,
                email: currentUser.email
            }
        }

        FIREBASE_DB_CHAT_REF.push().set(chatMessage, (error) => {
            // if (error) {
            //     dispatch(chatMessageError(error.message))
            // } else {
            //     dispatch(chatMessageSuccess())
            // }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    conversation: {
        height: Dimensions.get("window").height / 13 * 12
    },
    enterMessageView: {
        height: Dimensions.get("window").height / 13,
        flexDirection: "row",
        alignItems: "center"
    },
    textInput: {
        flex: 7
    },
    buttonSend: {
        flex: 1
    }
});
const mapStateToProps = state => ({
    conversation: state.conversation
});

export default connect(mapStateToProps, actions)(ConversationScreen);
