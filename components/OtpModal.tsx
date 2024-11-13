import OTPInput from "./OTPInput";
import {
   
    Text,
   
    View,
    Modal
} from "react-native";
const OtpModal = ({ codes, setCodes, len, admin, setAdmin,modal,setModal }) => {
    return (
        <Modal
            animationType="fade"
            onRequestClose={() => setModal(false)}
            transparent
            visible={modal}
        >
            <View className="bg-black/70 flex-1">
                <View className={"flex flex-col gap-y-4 p-4"}>
                    <View>
                        <Text className="mb-2 text-center text-2xl font-semibold text-white">
                            Sign Up
                        </Text>
                        <Text className="text-center text-lg text-white">
                            1/3
                        </Text>
                    </View>
                    <View className={"flex flex-col items-center mb-4"}>
                        <Text className="mb-2 text-center text-2xl font-semibold text-white">
                            Enter verification code
                        </Text>
                        <Text className="w-2/3 text-center text-lg text-white">
                            We just texted the code to your phone number
                        </Text>
                    </View>
                    <OTPInput codes={codes} setCodes={setCodes} len={len} />
                </View>
            </View>
        </Modal>
    );
};

export default OtpModal;
