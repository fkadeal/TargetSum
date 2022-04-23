import React from "react";
import {View , Text, StyleSheet} from "react-native";

class Game extends React.Component{
    target = 0 + Math.floor(10 * Math.random());
    render(){
        return(
            <View style={styles.container}> 
            <Text style={styles.target}> {this.target}</Text>
            </View>
        ) 
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#dddf',
        flex:1, 
    },
    target:{
        fontSize:40,
        backgroundColor:'#adadad',
        marginHorizontal:50,
        textAlign:'center',
    },
})

export default Game;