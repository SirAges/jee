import React from "react";
    import { View, Text, StyleSheet } from "react-native";
    // tab from 
    const Dash = () => {
     // tab run next 
     return (
      <View style={styles.container}>
      <Text>Hello, World!</Text>
      </View>
      );
    };
    
    const styles = StyleSheet.create({
     container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
     }
     //
    });
    export default Dash;
    
    