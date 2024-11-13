import { Slot } from "expo-router";
import * as Progress from "react-native-progress";
import { router } from "expo-router";
import { View, Text } from "react-native";
import { useEffect } from "react";
import Toast from "react-native-simple-toast";
import { useSelector } from "react-redux";
import { selectCurrentLoading } from "@/redux/loading/loadingSlice";
import { useGetCurrentQuery } from "@/redux/auth/authApiSlice";
import { selectCurrentAdmin } from "@/redux/auth/authSlice";
export default function AdminLayout() {
    const loading = useSelector(selectCurrentLoading);
    const admin = useSelector(selectCurrentAdmin);

    const { data: user } = useGetCurrentQuery();
    const userIsAdmin = user?.labels.includes("admin");
    useEffect(() => {
        const checkUser = () => {
            if (user !== undefined) {
                if (admin && userIsAdmin) {
                    Toast.show("welcome admin");
                } else {
                    router.replace("tab");
                }
            }
        };
        checkUser();
        return () => false;
    }, [user,admin]);
    if (!userIsAdmin) {
        return (
            <View className="h-full w-full justify-center items-center space-y-3">
                <Text>You are not an admin</Text>
                <Text
                    onPress={() => router.replace("tab")}
                    className="text-primary-2 font-semibold"
                >
                    go back
                </Text>
            </View>
        );
    }
    return (
        <>
            {loading && (
                <View className=" w-full items-center absolute z-50 top-0 py-10 h-full flex-1 bg-black/30">
                    <Progress.Circle
                        size={30}
                        indeterminate={true}
                        borderWidth={2}
                        showsText={true}
                        useNativeDriver={true}
                        color="#4ee17b"
                    />
                </View>
            )}
            <Slot />
        </>
    );
}
//
