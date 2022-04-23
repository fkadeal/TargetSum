import React from "react";
import {View , Text, StyleSheet} from "react-native";
import  PropTypes from "prop-types";
class Game extends React.Component{
    static PropTypes={
        randomNumberCount: PropTypes.number.isRequired,
    };
    randomNumbers = Array.from({length:this.props.randomNumberCount})
    .map(() => 1 + Math.floor(10 * Math.random()) );
    target = this.randomNumbers.slice(0,this.props.randomNumberCount -2)
    .reduce((acc, curr) => acc + curr,0);

    render(){
        return(
            <View style={styles.container}> 
            <Text style={styles.target}> {this.target}</Text>
             {this.randomNumbers.map((randomNumber, index) =>
                 <Text key={index}>{randomNumber}</Text> )} 
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