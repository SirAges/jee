import { useState, useEffect } from "react";
import { router } from "expo-router";
import { View, Text, Image } from "react-native";

const Hero = ({ data }) => {
    const [hero, setHero] = useState({
        productId: "",
        tag: "",
        images: [],
        desc: "",
        cta: "",
        frontColor: "",
        backColor: "",
        layout: "",
        discount: ""
    });

    useEffect(() => {
        if (data && data !== undefined) {
            setHero(data.documents[0]);
        }
        return () => [];
    }, [data]);

    const {
        tag,
        images,
        desc,
        cta,
        frontColor,
        backColor,
        layout,
        discount,
        productId
    } = hero;

    return (
        <View className="h-72 bg-black relative">
            <View className="bg-black">
                <Image
                    className="w-full h-full"
                    style={{ resizeMode: "cover" }}
                    source={{ uri: images[0] }}
                />
            </View>
            <View
                className={`absolute py-2 right-0 bottom-0 top-0 left-0 ${layout} w-full h-full space-y-2 px-5`}
            >
                <View
                    style={{ backgroundColor: backColor }}
                    className="space-y-1 w-3/5 px-2 rounded-sm py-2"
                >
                    <Text
                        style={{ color: frontColor }}
                        className="font-semibold "
                    >
                        {tag}
                    </Text>
                    <Text
                        style={{ color: frontColor }}
                        className="text-4xl uppercase font-black "
                    >
                        {discount} off
                    </Text>
                    <Text
                        style={{ color: frontColor }}
                        className="text-muted-2"
                    >
                        {desc}
                    </Text>
                </View>
                <Text
                    onPress={() => router.push(`/tab/${productId}`)}
                    style={{ color: frontColor, backgroundColor: backColor }}
                    className="py-2 w-32 rounded-md text-lg px-4 items-center text-center font-bold"
                >
                    {cta}
                </Text>
            </View>
        </View>
    );
};

export default Hero;
