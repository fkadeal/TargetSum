import React from "react";
import  PropTypes from "prop-types";
import { Text, TouchableOpacity, StyleSheet} from "react-native";

class RandomNumber extends React.Component { 
    static propTypes = {
        number: PropTypes.number.isRequired,  
        isDisabled: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired,
        onPress: PropTypes.func.isRequired,
    };
    
    handlePress = () =>{
        // console.log(this.props.number); 
        this.props.onPress(this.props.id);
    }
    render() {
        return(
            <Text >{console}</Text>,
            <TouchableOpacity onPress={this.handlePress}>
            <Text style={[styles.random, this.props.isDisabled && styles.Disabled]}>Q{/* {this.props.number} */}</Text>   
            </TouchableOpacity>
        );
    }     
}
const styles = StyleSheet.create({ 
    random:{
        backgroundColor:"#999",
        width:100,
        marginHorizontal:15,
        marginVertical:25,
        fontSize:35,
        textAlign:"center",
    },
    Disabled:{
        opacity:0.3,
    }
})

export default RandomNumber;