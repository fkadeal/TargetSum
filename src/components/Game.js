import React from "react";
import {View , Text, StyleSheet, Button} from "react-native";   
import  PropTypes from "prop-types";
import RandomNumber from "./RandomNumber";
import shuffle from "lodash.shuffle";

class Game extends React.Component{
    static propTypes={
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
    };


    state={
        selectedIds:[],
        remainingSeconds: this.props.initialSeconds,
    };

    gameStatus= 'PLAYING';

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

    ShuffledRandomNumbers = shuffle(this.randomNumbers);
 
    UNSAFE_componentWillUpdate(nextPrev, nextState) {
        if(nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0){
            this.gameStatus = this.CalcGameStatus(nextState);
            if(this.gameStatus !== 'PLAYING') {
                clearInterval(this.intervalId);
            }
        } 

     }

    CalcGameStatus = (nextState) => {
        const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
            return acc + this.ShuffledRandomNumbers[curr];
        },0)
        console.log(nextState)
        // console.warn(sumSelected);
        if(nextState.remainingSeconds === 0){
            return 'LOSS';
        }
        if(sumSelected < this.target){
            return 'PLAYING';
        }
        if(sumSelected == this.target){
            return 'WON';
        }
        if(sumSelected > this.target){
            return 'LOSS';
        }
    } 
     
    render(){
        const gameStatus = this.gameStatus;
        return(
            <View style={styles.container}> 
            <Text style={[
                styles.target, 
                styles[`STATUS_${gameStatus}`] ] }> {this.target}</Text>
             <View style={styles.randomContainer}> 

                {this.ShuffledRandomNumbers.map( (randomNumber, index) =>
                <RandomNumber 
                key= {index} 
                id= {index} 
                number={randomNumber} 
                isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'} 
                onPress={this.selectNumber}/>  
                 )}
             </View>
             <Button  title="PLAY AGAIN" />
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