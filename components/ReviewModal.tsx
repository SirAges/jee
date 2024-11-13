import { useState,  } from "react";
import {
    View,
    Text,
    Modal,
    TouchableWithoutFeedback,
    TextInput,
  
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import {  selectCurrentLoading } from "@/redux/loading/loadingSlice";

import {  useSelector } from "react-redux";

const ReviewModal = ({ modal, setModal, action, item }) => {
    const loading = useSelector(selectCurrentLoading);

    const [value, setValue] = useState("");
    const [rate, setRate] = useState(null);

    return (
        <Modal
            animationType="slide"
            onRequestClose={() => setModal(false)}
            transparent
            visible={modal}
        >
            <View className=" bg-black/50 h-full w-full">
                <TouchableWithoutFeedback
                    onPress={() => (loading ? null : setModal(false))}
                >
                    <View className="justify-center items-center px-2 flex-1">
                        <View
                            onStartShouldSetResponder={() => true} // Enable responder
                            onResponderRelease={e => e.stopPropagation()}
                            onTouchStart={e => e.stopPropagation()}
                            className="bg-white rounded-md pb-2 w-full"
                        >
                            <Text className="font-semibold  text-md py-4 px-2 bg-dark-3 text-center rounded-t-md">
                                Your feedback is important to us
                            </Text>
                            <View className="px-2 space-y-2 py-2">
                                <View className="bg-card-2 border-border border rounded-md w-full py-3 px-2">
                                    <TextInput
                                        className="w-full text-primary-2 bg-transparent tracking-wider max-h-44 h-20"
                                        value={value}
                                        multiline
                                        onChangeText={setValue}
                                        placeholder={"write a review"}
                                        placeholderTextColor="#185132"
                                        keyboardType={""}
                                        returnKeyType="done"
                                        autoCapitalize="sentences"
                                        autoCorrect={false}
                                        autoFocus={false}
                                        contextMenuHidden={false}
                                        dataDetectorTypes="all"
                                        editable={!loading}
                                        textAlign="left"
                                        textAlignVertical={"top"}
                                        spellCheck={true}
                                        inputMode={"text"}
                                        passwordRules="required: lower; upper; numeric; special;"
                                        selectionColor="#4ee17b"
                                    />
                                </View>
                                <View className="flex-row items-center space-x-2">
                                    <Text className="text-primary-2">
                                        Rating:
                                    </Text>
                                    {Array(5)
                                        .fill()
                                        .map((_, i) => (
                                            <Ionicons
                                                key={i}
                                                onPress={() => setRate(i + 1)}
                                                name={
                                                    rate > i
                                                        ? "star"
                                                        : "star-outline"
                                                }
                                                size={14}
                                                color="#185132"
                                            />
                                        ))}
                                </View>
                                <Text
                                    onPress={
                                        loading
                                            ? null
                                            : async () => {
                                                  await action({ value, rate });
                                                  setValue("");
                                                  setRate(null);
                                              }
                                    }
                                    className="py-4 px-2 bg-primary-1 rounded-md text-center font-semibold"
                                >
                                    Submit
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
};

export default ReviewModal;
