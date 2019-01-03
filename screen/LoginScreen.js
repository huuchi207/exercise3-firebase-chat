import React from "react";
import firebase from 'react-native-firebase';
import {View, Dimensions, Text, TextInput, StyleSheet, Button} from "react-native";
import {connect} from "react-redux";
import * as actions from '../redux/action';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "user1@gmail.com",
            password: "123456",
            error: ""
        }
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.loginForm}>
                <Text style={styles.loginText}>Login</Text>
                <View style={styles.userNameView}>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput style={styles.textInput}
                               onChangeText={(userName) => {
                                   this.setState({userName: userName})
                               }
                               }
                               defaultValue='user1@gmail.com'
                    />
                </View>
                <View style={styles.userNameView}>
                    <Text style={styles.label}>Password:</Text>
                    <TextInput style={styles.textInput}
                               secureTextEntry={true}
                               onChangeText={(password) => {
                                   this.setState({password: password})
                               }}
                               defaultValue='123456'
                    />
                </View>
                <Text style={styles.errorText}>{this.state.error}</Text>
                <View style={styles.buttonloginView}>
                    <Button style={styles.buttonLogin} title="Login" onPress={this.onLogin} />
                </View>
            </View>
        </View>
    }

    onLogin = () => {
                    console.log(this.state);
        if (this.state.userName === "" || this.state.password === "") {

        } else {
            firebase.auth().signInWithEmailAndPassword(this.state.userName
                , this.state.password).
            then(userCredential => {
                this.props.navigation.navigate("ListUser");
            }).catch(error=>{
                this.setState({error: error.message});
                console.log("error", error.message);

            });
        }
    }
}


const mapStateToProps = state =>({
});

export default connect(mapStateToProps, actions)(LoginScreen);

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    loginForm: {
        height: Dimensions.get("window").height / 2,
        width: Dimensions.get("window").width / 2,
        flexDirection: "column",
    },
    loginText: {
        fontSize: 15,
        fontWeight: "bold",
        // flex: 1,
        width: Dimensions.get("window").width / 2,
        textAlign: "center"
    },
    userNameView: {
        // flex: 2,
        flexDirection: "row",
        width: Dimensions.get("window").width / 2 - 10,
        marginTop: 10,
        alignItems: "center"
    },
    label: {
        flex: 2,
        marginRight: 10
    },
    textInput: {
        flex: 2
    },
    errorText: {
      color: "red",
      width: Dimensions.get("window").width/2,
      textAlign: "center",
        marginTop: 10,
        marginBottom: 10
    },
    buttonloginView: {
        width: Dimensions.get("window").width / 2,
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonLogin: {
        width: 100,
        height: 70
    }
});