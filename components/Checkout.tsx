// @ts-nocheck
import { useStripe } from "@stripe/stripe-react-native";
import React from "react";
import { View, Text, Alert } from "react-native";
import Toast from "react-native-simple-toast";

import { useSelector, useDispatch } from "react-redux";
import { setLoading, selectCurrentLoading } from "@/redux/loading/loadingSlice";
import { selectCurrentSession } from "@/redux/auth/authSlice";
import { useAddNewOrderMutation } from "@/redux/order/orderApiSlice";
import { useGetCurrentQuery } from "@/redux/auth/authApiSlice";

import UUID from "react-native-uuid";
const Checkout = ({ amount, products, variant }) => {
    const uniqueID = UUID.v4();
    const { data: user } = useGetCurrentQuery();
    const dispatch = useDispatch();
    const loading = useSelector(selectCurrentLoading);
    const session = useSelector(selectCurrentSession);
    const userId = session?.userId;
    const [addNewOrder] = useAddNewOrderMutation();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const onCheckout = async () => {
        dispatch(setLoading());
        try {
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_STRIPE_API_URL}/payments/intent`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        amount: Math.floor(amount * 100)
                    })
                }
            );

            const data = await response.json();
            const status = response.status;
            console.log("response", response);
            if (status !== 200) {
                Alert.alert(
                    "Something went wrong",
                    "unable to checkout try again"
                );
                return;
            }

            const { error: paymentSheetError } = await initPaymentSheet({
                merchantDisplayName: "Doer Fashion",
                paymentIntentClientSecret: data?.clientSecret,
                defaultBillingDetails: {
                    name: user?.name
                    //email: user?.email
                }
            });
            if (paymentSheetError) {
                Alert.alert("Something went wrong", paymentSheetError.message);
                return;
            }
            const { error: paymentError } = await presentPaymentSheet();

            if (paymentError) {
                Alert.alert(
                    `Error code: ${paymentError.code}`,
                    paymentError.message
                );

                return;
            }
            const orderData = {
                documentId: uniqueID,
                data: {
                    userId,
                    totalAmount: amount,
                    status: "pending",
                    products
                }
            };
            const { data: order } = await addNewOrder(orderData);

            if (order && order !== undefined) {
                Toast.show("checkout completed");
            }
        } catch ({ message }) {
            console.log("error", message);
        } finally {
            dispatch(setLoading());
        }
    };

    return (
        <View className="justify-center items-center">
            <Text
                onPress={loading ? null : onCheckout}
                className="text-white text-lg  px-2 py-3 h-fit bg-primary-2 rounded-md items-center"
            >
                Checkout
            </Text>
        </View>
    );
};

export default Checkout;
