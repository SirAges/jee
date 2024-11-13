import FormInput from "@/components/FormInput";
import { View, Text, Image } from "react-native";
import { authInitial } from "@/lib/initial";
import { useDispatch, useSelector } from "react-redux";
import { useSignInMutation } from "@/redux/auth/authApiSlice";
import { setLoading, selectCurrentLoading } from "@/redux/loading/loadingSlice";
import { selectCurrentAdmin } from "@/redux/auth/authSlice";
import { signInForm } from "@/lib/form";
import { authSchema } from "@/lib/schema";
import { SafeAreaView } from "react-native-safe-area-context";

import Toast from "react-native-simple-toast";
import { router } from "expo-router";
const SignIn = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectCurrentLoading);
    const admin = useSelector(selectCurrentAdmin);

    const [signIn] = useSignInMutation();

    const onSubmit = async value => {
        dispatch(setLoading());

        try {
            const data = await signIn(value);

            if (data?.error) {
                console.log("data", data);
                Toast.show("error signing in check credentials");
                return;
            }

            if (admin) {
                router.replace("admin");
            } else {
                router.replace("tab");
            }
        } catch ({ message }) {
            Toast.show(message);
        } finally {
            dispatch(setLoading());
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-black">
            <Image
                className="object-center h-full w-full opacity-40"
                style={{ resizeMode: "cover" }}
                source={require("@/assets/images/ts14.jpg")}
            />

            <View className="absolute h-full w-full ">
                <SafeAreaView className="flex-1 items-center">
                    <Image
                        className="object-center h-10 w-10 rounded-full"
                        style={{ resizeMode: "cover" }}
                        source={require("@/assets/icons/Logo.png")}
                    />
                    <Text className="text-white text-3xl font-semibold px-2 py-4">
                        Sign in
                    </Text>

                    <FormInput
                        from="sign-in"
                        files={[]}
                        setFiles={() => []}
                        loading={loading}
                        list={signInForm}
                        schema={authSchema}
                        initial={authInitial}
                        action={onSubmit}
                        layoutClass=""
                        button="sign in"
                    />
                </SafeAreaView>
            </View>
        </View>
    );
};

export default SignIn;
