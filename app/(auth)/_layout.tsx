import { Stack } from "expo-router/stack";
import { selectCurrentLoading } from "@/redux/loading/loadingSlice";
import { useSelector } from "react-redux";
import { View } from "react-native";
import * as Progress from "react-native-progress";

export default function Layout() {
    const loading = useSelector(selectCurrentLoading);

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
            <Stack>
                <Stack.Screen name="sign-in" options={{ headerShown: false }} />
                <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}
