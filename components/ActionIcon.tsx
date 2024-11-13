import React from "react";
import {  Text,  } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
const ActionIcon = ({ action, cond, icon ,classes}) => {
    return (
        <Text onPress={action} className={classes}>
            <Ionicons
                size={24}
                color="#4ee17b"
                name={cond ? icon : `${icon}-outline`}
            />
        </Text>
    );
};
export default ActionIcon;
