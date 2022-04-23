import React from "react";
import {View , Text, StyleSheet} from "react-native";   
import  PropTypes from "prop-types";
import RandomNumber from "./RandomNumber";

class Game extends React.Component{
    static propTypes={
        randomNumberCount: PropTypes.number.isRequired,
    };


    state={
        selectedNumbers:[],
    };

    isNumberSelected = (numberIndex) =>{
        return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
    };

    selectNumber = (numberIndex) => {
    this.setState((prevState) =>({
        selectedNumbers:[...prevState.selectedNumbers, numberIndex],
    })
    );
};

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
                <RandomNumber 
                key= {index} 
                id= {index} 
                number={randomNumber} 
                isDisabled={this.isNumberSelected(index)} 
                onPress={this.selectNumber}/>  
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