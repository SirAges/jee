import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { Link, router } from "expo-router";
import * as Progress from "react-native-progress";
import { useSelector } from "react-redux";
import {
    selectCurrentSession,
    selectCurrentAdmin
} from "@/redux/auth/authSlice";

import { persistor } from "./store";
const Index = () => {
    const session = useSelector(selectCurrentSession);
    const admin = useSelector(selectCurrentAdmin);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            if (session) {
                if (admin) {
                    setLoading(false);
                    router.replace("admin");
                } else {
                    setLoading(false);
                    router.replace("tab");
                }
            }
        }, 2000);
    }, []);
    if (loading) {
        return (
            <View className=" w-full items-center justify-center py-10 h-full">
                <Progress.Circle
                    size={30}
                    indeterminate={true}
                    borderWidth={2}
                    showsText={true}
                    useNativeDriver={true}
                    color="#4ee17b"
                />
            </View>
        );
    }
    return (
        <View className="flex-1 items-center justify-center bg-black">
            <Image
                className="object-center h-full w-full opacity-40"
                style={{ resizeMode: "cover" }}
                source={require("@/assets/images/ts15.jpg")}
            />

            <View className="absolute w-full items-center justify-center">
                <Text
                    onPress={async () => await persistor.purge()}
                    className="text-white font-bold  text-3xl"
                >
                    JEE Fashion
                </Text>

                <Link
                    replace
                    href={session ? "tab" : "sign-in"}
                    className="w-1/2 text-center bg-green-700  px-3 py-5 text-white font-bold rounded-sm"
                >
                    Shop Now
                </Link>

                <Text className="text-white font-medium  text-md pt-5">
                    Your best fashion store
                </Text>
            </View>
        </View>
    );
};

export default Index;
