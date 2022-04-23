import React from "react";
import {View , Text, StyleSheet} from "react-native";   
import  PropTypes from "prop-types";
import RandomNumber from "./RandomNumber";

class Game extends React.Component{
    static propTypes={
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds:PropTypes.number.isRequired,
    };


    state={
        selectedIds:[],
        remainingSeconds: this.props.initialSeconds,
    };

    isNumberSelected = (numberIndex) =>{
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    };

    selectNumber = (numberIndex) => {
    this.setState((prevState) =>({
        selectedIds:[...prevState.selectedIds, numberIndex],
    }));
    };

    componentDidMount(){
        this.intervalId=setInterval(() => {
            this.setState((prevState) => {
                return {remainingSeconds : prevState.remainingSeconds -1}
            },() => {
                if(this.state.remainingSeconds === 0){
                    clearInterval(this.intervalId);
                }
            });
        },1000)
    };

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    randomNumbers = Array.from({length:this.props.randomNumberCount})
    .map(() => 1 + Math.floor(10 * Math.random()) );
    target = this.randomNumbers.slice(0,this.props.randomNumberCount -2)
    .reduce((acc, curr) => acc + curr,0);

    //game state :PLAYING , WIN , LOSS
    gameStatus = () => {
        const sumSelected =this.state.selectedIds.reduce((acc, curr) => {
            return acc + this.randomNumbers[curr];
        },0)
        console.warn(sumSelected);
        if(this.state.remainingSeconds === 0){
            return 'LOSS';
        }
        if(sumSelected < this.target){
            return 'PLAYING';
        }
        if(sumSelected == this.target){
            return 'WON'
        }
        if(sumSelected > this.target){
            return 'LOSS'
        }
    } 
     
    render(){
        const gameStatus = this.gameStatus()
        return(
            <View style={styles.container}> 
            <Text style={[
                styles.target, 
                styles[`STATUS_${gameStatus}`] ] }> {this.target}</Text>
             <View style={styles.randomContainer}> 

                {this.randomNumbers.map( (randomNumber, index) =>
                <RandomNumber 
                key= {index} 
                id= {index} 
                number={randomNumber} 
                isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'} 
                onPress={this.selectNumber}/>  
                 )}
             </View>
             <Text>{gameStatus +' '+ this.state.remainingSeconds}</Text>
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
        marginHorizontal:50,
        textAlign:'center',
        margin:50,

    },

    randomContainer:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around'
        
    },
    STATUS_WON:{
        backgroundColor:'green',
    },
    STATUS_LOSS:{
        backgroundColor:'red', 
    },
    STATUS_PLAYING:{
        backgroundColor:'#adadad', 
    }
})

export default Game;