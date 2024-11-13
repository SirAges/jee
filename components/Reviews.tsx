import ProfileCard from "./ProfileCard";
import React from "react";
import { View, Text, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
const Reviews = ({ reviews }) => {
    return (
        <View>
            <FlatList
                data={reviews}
                renderItem={({ item: { $id, rate, review, name, email } }) => (
                    <View>
                        <ProfileCard email={email} name={name} />

                        <Text>{review}</Text>
                        <View className="flex-row">
                            {Array(Number(rate)).fill(
                                <Ionicons
                                    name="star"
                                    size={10}
                                    color="#4ee17b"
                                />
                            )}
                        </View>
                        <Text></Text>
                    </View>
                )}
                keyExtractor={item => item.$id}
            />
        </View>
    );
};

export default Reviews;
