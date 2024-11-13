import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
const AboutItem = ({ about, setVariant, variant }) => {
    const { shortdesc, desc, colors, sizes, weight } = about;
    const colorArray = colors.split(",");
    const sizesArray = sizes.split(",");
    return (
        <View className="space-y-4">
            <Text className="font-semibold capitalize">{shortdesc}</Text>
            <View className="space-x-2 flex-row items-center">
                <Text className="capitalize font-semibold">colors:</Text>
                <View className="flex-row ">
                    {colorArray.map(c => (
                        <TouchableWithoutFeedback
                            key={c}
                            onPress={() =>
                                setVariant(prev => ({
                                    ...prev,
                                    color: c
                                }))
                            }
                        >
                            <View
                                className="border border-2 border-dark-3 rounded-full items-center justify-center h-7 w-7 mx-1"
                                style={{ backgroundColor: c }}
                            >
                                {variant.color === c && (
                                    <Text className="rounded-full">
                                        &#x2713;
                                    </Text>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>
            </View>
            <View className="space-x-2 flex-row items-center">
                <Text className="capitalize font-semibold">sizes:</Text>
                <View className="flex-row ">
                    {sizesArray.map(s => (
                        <TouchableWithoutFeedback
                            key={s}
                            onPress={() =>
                                setVariant(prev => ({
                                    ...prev,
                                    size: s
                                }))
                            }
                        >
                            <View
                                className={`items-center justify-center h-7 w-7 mx-1 ${
                                    variant.size === s
                                        ? "border-b-2 border-primary-2"
                                        : ""
                                }`}
                            >
                                <Text className="rounded-full uppercase font-semibold">
                                    {s}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>
            </View>
            <View className="flex-row items-center space-x-2">
                <Text className="capitalize font-semibold text-dark-1">weight:</Text>
                <Text className="capitalize font-semibold text-dark-2">
                    {weight} kg
                </Text>
            </View>
            <Text className="text-dark-1">{desc}</Text>
        </View>
    );
};

export default AboutItem;
