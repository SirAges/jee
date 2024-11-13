import ProfileCard from "@/components/ProfileCard";
import EditModal from "@/components/EditModal";

import { useGetUserOrderQuery } from "@/redux/order/orderApiSlice";
import { selectCurrentWish, clearWish } from "@/redux/wish/wishSlice";
import { selectCurrentCart, clearCart } from "@/redux/cart/cartSlice";
import { clearRecent } from "@/redux/product/productSlice";
import ProfileHero from "@/components/ProfileHero";
import { useState } from "react";
import { View, Text, Image } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentSession } from "@/redux/auth/authSlice";
import { setLoading } from "@/redux/loading/loadingSlice";
import Toast from "react-native-simple-toast";
import {
    useSignOutMutation,
    useGetCurrentQuery,
    useUpdateAccountMutation
} from "@/redux/auth/authApiSlice";

// tab from
const Profile = () => {
    const dispatch = useDispatch();
    const session = useSelector(selectCurrentSession);
    const [modal, setModal] = useState(false);
    const sessionId = session?.$id;
    const userId = session?.userId;
    const [signOut] = useSignOutMutation();
    const [updateAccount] = useUpdateAccountMutation();
    const { data: u } = useGetCurrentQuery();

    const { data } = useGetUserOrderQuery();

    const orders =
        data && data !== undefined
            ? data.documents.filter(f => f.userId === userId)
            : [];

    const carts = useSelector(selectCurrentCart);
    const wishes = useSelector(selectCurrentWish);

    const logOut = async () => {
        dispatch(setLoading());

        try {
           await signOut(sessionId);
           
        } catch (error) {
            console.log("error", error);
        } finally {
            dispatch(setLoading());
        }
    };
    const clear = () => {
        dispatch(clearCart());
        dispatch(clearWish());
        dispatch(clearRecent());
    };
    const handleEdit = async (field, value, password) => {
        try {
            const data = await updateAccount({ field, value, password });
            if (data?.error) {
                Toast.show("update failed check credetials");
            }
            Toast.show("updated");
        } catch (error) {
            console.log("error", error);
        }
    };
    return (
        <View className="bg-black">
            <Image
                className="h-full w-full  "
                style={{ resizeMode: "cover" }}
                source={require("@/assets/images/ts21.jpg")}
            />
            <View className="absolute top-0 bottom-0 right-0  left-0 ">
                <ProfileHero wishes={wishes} carts={carts} orders={orders} />
                <View className="py-2 px-2 space-y-1 flex-row items-center justify-between w-full bg-card-1">
                    <ProfileCard email={u?.email} name={u?.name} />
                    <Text className="capitalize font-semibold text-primary-2">
                        {session?.countryName}
                    </Text>
                </View>
                <View className="w-full h-[1px] bg-dark-2" />

                <View className="px-4 py-2 space-y-4 items-center justify-center flex-1">
                    <Text
                        onPress={() => setModal(true)}
                        className="font-semibold text-primary-2"
                    >
                        Edit profile
                    </Text>
                    <Text
                        onPress={clear}
                        className="font-semibold text-primary-2"
                    >
                        clear catch
                    </Text>
                    <Text
                        onPress={logOut}
                        className="font-semibold text-primary-2"
                    >
                        logout
                    </Text>
                </View>
            </View>
            <EditModal
                initialFields={["name", "email", "oldPassword"]}
                modalName="edit account"
                isPassword={true}
                modal={modal}
                item={{ email: u?.email, name: u?.name }}
                setModal={setModal}
                action={handleEdit}
            />
        </View>
    );
};

export default Profile;
