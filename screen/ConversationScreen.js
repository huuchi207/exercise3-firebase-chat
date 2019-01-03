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
            newMessage: "",
        }
    }

    componentDidMount()  {
        console.log("this.props.navigation", this.props.navigation);
        FIREBASE_DB_CHAT_REF.child(this.props.navigation.state.params.conversationId).once('value', async (snap) => {
            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push(child.val());
            });
            // console.log("items", items);
            await this.props.loadMessage(items);

            setTimeout(() => this.flatList.scrollToEnd(), 50)
        });
        FIREBASE_DB_CHAT_REF.child(this.props.navigation.state.params.conversationId).on('child_added', async (snap) => {
            console.log("snap.val()", snap.val());
            await this.props.addMessage(snap.val());
            setTimeout(() => this.flatList.scrollToEnd(), 50)
        });
    }
    componentWillUnmount() {
        FIREBASE_DB_CHAT_REF.child(this.props.navigation.state.params.conversationId).off('child_added', async (snap) => {

        });
    }

    render() {
        // console.log("this.props.conversation", this.props.conversation);
        return <View style={styles.container}>
            <FlatList
                style={styles.conversation}
                data={this.props.conversation}
                renderItem={({item, index}) => (
                    <CustomMsgView msg={item.text}
                                   isMyMsg={firebase.auth().currentUser.uid === item.user.id}
                                   createdAt={item.createdAt}/>
                )}
                keyExtractor={(item, index) => index.toString()}
                ref={ref => this.flatList = ref}
            />
            <View style={styles.enterMessageView}>
                <TextInput style={styles.textInput} onChangeText={(text) => {
                    this.setState({newMessage: text})
                }
                } ref={input => {
                    this.textInput = input
                }}/>
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
        let message = this.state.newMessage;
        let chatMessage = {
            text: message,
            createdAt: createdAt,
            user: {
                id: currentUser.uid,
                email: currentUser.email
            }
        }

        FIREBASE_DB_CHAT_REF.child(this.props.navigation.state.params.conversationId).push().set(chatMessage, (error) => {
            if (error) {
                console.log("error", error);
            } else {
                this.textInput.clear()
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    conversation: {
        // height: Dimensions.get("window").height / 13 * 12,
        flex: 1
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
