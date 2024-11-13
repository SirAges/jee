import { useFonts } from "expo-font";
import { Slot, router } from "expo-router";
import * as Updates from "expo-updates";
import { StripeProvider } from "@stripe/stripe-react-native";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";

import React, { useEffect } from "react";
import { BackHandler, Alert } from "react-native";

import "react-native-reanimated";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf")
    });
    const publishableKey = process.env.EXPO_PUBLIC_STRIPE_KEY;
    useEffect(() => {
        const backAction = () => {
            if (router.canGoBack()) {
                router.back();
            } else {
                Alert.alert(
                    "Hold on!",
                    "Are you sure you want to exit from doer fashion?",
                    [
                        {
                            text: "Cancel",
                            onPress: () => null,
                            style: "cancel"
                        },
                        { text: "YES", onPress: () => BackHandler.exitApp() }
                    ]
                );
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);
    const onFetchUpdateAsync = async () => {
        try {
            const update = await Updates.checkForUpdateAsync();

            if (update.isAvailable) {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
            }
        } catch (error) {
            alert(`Error fetching latest Expo update: ${error}`);
        }
    };
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);
    useEffect(() => {
        onFetchUpdateAsync();
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <StripeProvider
                    style="light"
                    publishableKey={publishableKey}
                    merchantIdentifier="com.doer.fashion"
                >
                    <Slot />
                </StripeProvider>
            </PersistGate>
        </Provider>
    );
}
//
