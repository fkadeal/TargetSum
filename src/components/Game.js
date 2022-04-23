import React from "react";
import {View , Text, StyleSheet} from "react-native";   
import  PropTypes from "prop-types";
import RandomNumber from "./RandomNumber";

class Game extends React.Component{
    static PropTypes={
        randomNumberCount: PropTypes.number.isRequired,
    };


    state={
        selectedNumbers:[0, 4],
    };

    isNumberSelected = (numberIndex) =>{
        return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
    }

    randomNumbers = Array.from({length:this.props.randomNumberCount})
    .map(() => 1 + Math.floor(10 * Math.random()) );
    target = this.randomNumbers.slice(0,this.props.randomNumberCount -2)
    .reduce((acc, curr) => acc + curr,0);

    render(){
        return(
            <View style={styles.container}> 
            <Text style={styles.target}> {this.target}</Text>
             <View style={styles.randomContainer}> 

                {this.randomNumbers.map( (randomNumber, index) =>
                <RandomNumber key= {index} number={randomNumber} isSelected={this.isNumberSelected(index)}/>  
                 )}  
             </View>
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
        margin:50,

    },

    randomContainer:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around'
        
    }
})

export default Game;