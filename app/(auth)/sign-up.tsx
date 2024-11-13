import FormInput from "@/components/FormInput";
import { View, Text, Image,  } from "react-native";
import { authInitial } from "@/lib/initial";
import { setLoading, selectCurrentLoading } from "@/redux/loading/loadingSlice";
import { signUpForm } from "@/lib/form";
import { authSchema } from "@/lib/schema";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    useSignUpMutation,
    useSignInMutation
} from "@/redux/auth/authApiSlice";
import { useAddNewUserMutation } from "@/redux/user/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {  router } from "expo-router";
import Toast from "react-native-simple-toast";
import UUID from "react-native-uuid";
const SignUp = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectCurrentLoading);
    
    const [signUp] = useSignUpMutation();
    const [signIn] = useSignInMutation();
    const [addNewUser] = useAddNewUserMutation();
    const onSubmit = async value => {
        dispatch(setLoading());
        const uniqueID = UUID.v4();
        try {
            const data = await signUp({
                ...value,
                name: `${value.lastName} ${value.firstName}`,
                userId: uniqueID
            });
            if (data.error) {
                Toast.show("an error occured, check credentials");
                return;
            }

            const createUser = await addNewUser({
                documentId: uniqueID,
                data: {
                    email: value.email,
                    name: `${value.lastName} ${value.firstName}`,
                    userId: uniqueID
                }
            });
            if (createUser.error) {
                Toast.show("an error occured, check credentials");
            }

            const user = await signIn({
                email: value.email,
                password: value.password
            });
            if (user.error) {
                Toast.show("an error occured, check credentials");
                router.push("sign-in");
            }else{
            router.replace("tab");}
        } catch (error) {
            console.log("error-signup", error);
        } finally {
            dispatch(setLoading());
        }
    };

    return (
        <View className="relative items-center justify-center bg-black">
            <Image
                className="object-center h-full w-full opacity-40"
                style={{ resizeMode: "cover" }}
                source={require("@/assets/images/ts12.jpg")}
            />

            <View className="absolute h-full w-full ">
                <SafeAreaView className="flex-1 items-center">
                    <Image
                        className="object-center h-10 w-10 rounded-full"
                        style={{ resizeMode: "cover" }}
                        source={require("@/assets/icons/Logo.png")}
                    />
                    <Text className="text-white text-3xl font-semibold px-2 py-4">
                        Sign up
                    </Text>

                    <FormInput
                        from="sign-up"
                         files={[]}
                        setFiles={() => []}
                        loading={loading}
                        list={signUpForm}
                        schema={authSchema}
                        initial={authInitial}
                        action={onSubmit}
                        layoutClass=""
                        button="sign up"
                    />
                </SafeAreaView>
            </View>
        </View>
    );
};

export default SignUp;
