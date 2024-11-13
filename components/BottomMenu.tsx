import React from "react";
import {
    View,
    Text,
    Modal,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native";
// tab from
const BottomMenu = ({ modal, setModal, buttons }) => {
    // tab run next
    return (
        <Modal
            animationType="slide"
            onRequestClose={() => setModal(false)}
            transparent
            visible={modal}
        >
            <View className=" bg-black/50 h-full w-full">
                <TouchableWithoutFeedback onPress={() => setModal(false)}>
                    <View className="justify-end flex-1">
                        <View
                            onStartShouldSetResponder={() => true} // Enable responder
                            onResponderRelease={e => e.stopPropagation()}
                            onTouchStart={e => e.stopPropagation()}
                            className="bg-white rounded-t-md h-56"
                        >
                            <Text className="font-semibold  text-md py-4 px-2 bg-dark-3 text-center rounded-t-md">
                                Product Options
                            </Text>
                            <ScrollView>
                                <View className="py-2 px-2 space-y-2">
                                    {buttons.map(({ title, color, action }) => (
                                        <Text
                                            onPress={action}
                                            style={{ backgroundColor: color }}
                                            className="font-semibold capitalize  py-4 px-2 rounded-md"
                                        >
                                            {title}
                                        </Text>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
};

export default BottomMenu;
