import { useState, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    TouchableWithoutFeedback
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { setAdmin, selectCurrentAdmin } from "@/redux/auth/authSlice";
import Checkbox from "expo-checkbox";
import PhoneInput from "react-native-phone-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDateTime } from "@/lib/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    FILE_PICKER = "filePicker",
    SELECT = "select",
    RADIO = "radio"
}
const FormInput = ({
    list,
    schema,
    initial,
    action,
    layoutClass,
    button,
    from,
    loading,
    files,
    setFiles
}) => {
    const signin = from === "sign-in";
    const signup = from === "sign-up";

    const showReset = true;

    const admin = useSelector(selectCurrentAdmin);
    const dispatch = useDispatch();

    const [openDate, setOpenDate] = useState(false);

    const phoneRef = useRef(null);
    const pickDocument = async type => {
        try {
            const { assets } = await DocumentPicker.getDocumentAsync({
                multiple: true,
                type
            });

            if (!assets) {
                console.log("error", error);
            }

            await assets.forEach(asset => {
                const { uri, size, mimeType: type, name } = asset;
                setFiles(prev => [...prev, { uri, size, type, name }]);
            });
        } catch (error) {
            console.log("error", error.message);
        }
    };
    const removeImage = clicked => {
        const filtered = files.filter(({ uri }) => uri !== clicked);
        setFiles(filtered);
    };

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: initial
    });

    const RenderInput = ({ items }) => {
        const {
            onChange,
            onBlur,
            value,
            name,
            placeholder,
            type,
            inputType,
            keyType,
            extra
        } = items;

        switch (inputType) {
            case FormFieldType.INPUT:
                return (
                    <TextInput
                        className="w-full text-white bg-transparent tracking-wider"
                        value={value}
                        onChangeText={onChange}
                        placeholder={placeholder}
                        placeholderTextColor="#e9f5ee93"
                        secureTextEntry={name === "password"}
                        keyboardType={keyType}
                        returnKeyType="done"
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        autoFocus={false}
                        contextMenuHidden={false}
                        dataDetectorTypes="all"
                        editable={!loading}
                        onBlur={onBlur}
                        textAlign="left"
                        textAlignVertical={"center"}
                        spellCheck={true}
                        inputMode={type}
                        passwordRules="required: lower; upper; numeric; special;"
                        selectionColor="#4ee17b"
                    />
                );
            case FormFieldType.TEXTAREA:
                return (
                    <TextInput
                        className="w-full text-white bg-transparent tracking-wider h-44"
                        value={value}
                        onChangeText={onChange}
                        placeholder={placeholder}
                        placeholderTextColor="#e9f5ee93"
                        secureTextEntry={name === "password"}
                        keyboardType={keyType}
                        returnKeyType="done"
                        multiline
                        //numberOfLines={7}
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        autoFocus={false}
                        contextMenuHidden={false}
                        dataDetectorTypes="all"
                        editable={!loading}
                        onBlur={onBlur}
                        textAlign="left"
                        textAlignVertical={"top"}
                        spellCheck={true}
                        inputMode={type}
                        passwordRules="required: lower; upper; numeric; special;"
                        selectionColor="#4ee17b"
                    />
                );
            case FormFieldType.SELECT:
                return (
                    <SelectDropdown
                        search
                        searchInputStyle={{
                            zIndex: 999,
                            width: 250,
                            backgroundColor: "#095c2f",
                            borderTopRightRadius: 5,
                            borderTopLeftRadius: 5
                        }}
                        searchInputTxtColor="#ffffff"
                        searchPlaceHolder={`search ${name}`}
                        searchPlaceHolderColor="#e9f5ee93"
                        dropdownStyle={{
                            width: 250,
                            backgroundColor: "#185132",
                            borderRadius: 5
                        }}
                        statusBarTranslucent
                        data={extra}
                        onSelect={onChange}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                                <View className="w-full p-2">
                                    {selectedItem ? (
                                        typeof selectedItem === "string" ? (
                                            <Text className="text-white capitalize">
                                                {selectedItem}
                                            </Text>
                                        ) : (
                                            <View className="flex-row space-x-2 items-center w-full">
                                                <Image
                                                    className="w-8 h-8 rounded-sm"
                                                    style={{
                                                        resizeMode: "cover"
                                                    }}
                                                    source={{
                                                        uri: selectedItem.image
                                                    }}
                                                />
                                                <Text className="text-white capitalize">
                                                    {selectedItem.name}
                                                </Text>
                                            </View>
                                        )
                                    ) : (
                                        <Text className="text-white py-1 capitalize">
                                            {`Select your ${name}`}
                                        </Text>
                                    )}
                                </View>
                            );
                        }}
                        renderItem={(item, index, isSelected) => {
                            return (
                                <View
                                    style={{
                                        backgroundColor: isSelected
                                            ? "#052f1841"
                                            : ""
                                    }}
                                >
                                    <View className="px-2 w-full">
                                        {typeof item === "string" ? (
                                            <Text className="text-white capitalize py-2">
                                                {item}
                                            </Text>
                                        ) : (
                                            <View className=" flex-row items-center space-x-2 my-1">
                                                <Image
                                                    className="w-8 h-8 rounded-sm"
                                                    style={{
                                                        resizeMode: "cover"
                                                    }}
                                                    source={{
                                                        uri: item.image
                                                    }}
                                                />
                                                <Text className="text-white  capitalize">
                                                    {item.name}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            );
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                );
            case FormFieldType.PHONE_INPUT:
                return (
                    <View className=" w-full">
                        <PhoneInput
                            textStyle={{ color: "white" }}
                            ref={phoneRef}
                            isValidNumber
                            autoFormat
                            disabled={false}
                            pickerBackgroundColor="#bfbfbfd9"
                            pickerButtonColor="#252525"
                            allowZeroAfterCountryCode={false}
                            accessibilityLabel="Telephone Input"
                            onChangePhoneNumber={onChange}
                            initialCountry={"us"}
                            textProps={{
                                placeholder: "Enter a phone number..."
                            }}
                        />
                    </View>
                );
            case FormFieldType.CHECKBOX:
                return (
                    <Checkbox
                        className="text-red-600 border-border border-[1px]"
                        value={value}
                        onValueChange={onChange}
                        color="#4ee17b"
                    />
                );
            case FormFieldType.RADIO:
                return (
                    <View className="w-full">
                        <RadioButtonGroup
                            selected={value}
                            onSelected={onChange}
                            radioStyle={{
                                borderWidth: 2,
                                backgroundColor: "#185132",
                                borderColor: "#4ee17b8f"
                            }}
                            radioBackground="#4ee17b"
                        >
                            {extra.map(r => (
                                <RadioButtonItem
                                    style={{
                                        color: "white",
                                        marginVertical: 5
                                    }}
                                    key={r.id}
                                    value={r.value}
                                    label={
                                        <Text className="capitalize text-white font-semibold px-2">
                                            {r.label}
                                        </Text>
                                    }
                                />
                            ))}
                        </RadioButtonGroup>
                    </View>
                );
            case FormFieldType.FILE_PICKER:
                return (
                    <View className="items-center w-full space-y-3 relative">
                        <TouchableWithoutFeedback
                            onPress={() => pickDocument(type)}
                        >
                            <View className=" items-center ">
                                <Image
                                    className=" w-12 h-12"
                                    style={{ resizeMode: "contain" }}
                                    source={require("@/assets/icons/upload.png")}
                                />
                                <Text className="text-white ">
                                    upload file (below 4mb)
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View className=" items-center justify-center flex-row flex-wrap gap-2 z-10">
                            {files.map(({ uri, size }, i) => (
                                <View
                                    key={i}
                                    className="border-border rounded-md h-16 w-16 rounded-md border-border relative"
                                >
                                    <View className="absolute -top-1 z-20 -left-1">
                                        <Text
                                            onPress={() => removeImage(uri)}
                                            className="text-destructive-2"
                                        >
                                            <Ionicons name="trash" size={20} />
                                        </Text>
                                    </View>
                                    <View className="absolute h-full w-full items-center justify-center z-10">
                                        <Text className="    text-primary-1 font-bold">
                                            {(size / 1000000).toFixed(1)} mb
                                        </Text>
                                    </View>
                                    <Image
                                        className=" w-full h-full rounded-md"
                                        style={{ resizeMode: "cover" }}
                                        source={{ uri }}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                );
            case FormFieldType.DATE_PICKER:
                return (
                    <View className="flex flex-row space-x-2">
                        <Text
                            onPress={() => setOpenDate(true)}
                            className="text-primary-1"
                        >
                            <Ionicons name="calendar" size={20} />
                        </Text>
                        <DateTimePickerModal
                            isVisible={openDate}
                            mode={type}
                            onChange={onChange}
                            onConfirm={date => {
                                onChange(date);
                                setOpenDate(false);
                            }}
                            onCancel={() => setOpenDate(false)}
                        />
                        <Text className="text-white capitalize">
                            {value
                                ? formatDateTime(value).dateTime
                                : "pick a date"}
                        </Text>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView className="">
            <View className="w-full px-6 flex-1">
                <View className="flex-row flex-wrap">
                    {list.map(
                        ({
                            label,
                            name,
                            placeholder,
                            type,
                            inputType,
                            keyType,
                            multiline,
                            extra,
                            size
                        }) => (
                            <View
                                className={`${size ? size : "w-full"} p-1`}
                                key={name}
                            >
                                {inputType !== FormFieldType.CHECKBOX &&
                                inputType !== FormFieldType.DATE_PICKER &&
                                inputType !== FormFieldType.FILE_PICKER &&
                                inputType !== FormFieldType.RADIO ? (
                                    <Text className="text-primary-1 capitalize font-semibold px-2 my-1">
                                        {label}
                                    </Text>
                                ) : null}
                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value }
                                    }) => (
                                        <View>
                                            <View className="flex-row border border-border bg-card-2  rounded-md py-3 px-2 ">
                                                <RenderInput
                                                    items={{
                                                        onChange,
                                                        onBlur,
                                                        value,
                                                        label,
                                                        name,
                                                        placeholder,
                                                        type,
                                                        inputType,
                                                        keyType,
                                                        multiline,
                                                        extra
                                                    }}
                                                />
                                                {inputType ===
                                                FormFieldType.CHECKBOX ? (
                                                    <Text className="text-white px-2">
                                                        {label}
                                                    </Text>
                                                ) : null}
                                            </View>
                                            {errors[name] && (
                                                <Text className="text-destructive-2 px-2 py-1">
                                                    {errors[name].message}
                                                </Text>
                                            )}
                                        </View>
                                    )}
                                    name={name}
                                    rules={{ required: true }}
                                />
                            </View>
                        )
                    )}
                </View>

                {signin && (
                    <Text className="text-primary-1 font-semibold p-2 py-2 ">
                        forgot password
                    </Text>
                )}
                {signin && (
                    <View className="flex-row items-center space-x-2 px-2">
                        <Checkbox
                            className="text-red-600 border-border border-[1px]"
                            value={admin}
                            onValueChange={() => dispatch(setAdmin())}
                            color="#4ee17b"
                        />
                        <Text className="text-dark-2 font-medium p-2 py-2 ">
                            sign in as an admin
                        </Text>
                    </View>
                )}

                <View className="flex  space-y-2  items-center py-3">
                    <TouchableOpacity
                        className="w-full items-center py-4 rounded-md bg-primary-1"
                        onPress={handleSubmit(action)}
                    >
                        <Text className="text-primary-2 font-semibold capitalize">
                            {loading ? "please wait ..." : button}
                        </Text>
                    </TouchableOpacity>
                    {showReset && (
                        <TouchableOpacity
                            className="grow items-center rounded-md py-4"
                            onPress={() => {
                                reset();
                                setFiles([]);
                            }}
                        >
                            <Text className="text-primary-1">Reset</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {(signin || signup) && (
                    <View className="flex-row p-2 py-2 justify-between items-center">
                        {
                            <Text className="text-dark-2 ">
                                {signin
                                    ? "no account ?"
                                    : "already have an account ?"}
                            </Text>
                        }
                        {
                            <Text
                                onPress={() =>
                                    router.replace(
                                        signin ? "sign-up" : "sign-in"
                                    )
                                }
                                className="text-primary-1 font-semibold capitalize text-center"
                            >
                                {signin ? "sign up" : signup ? "sign in" : null}
                            </Text>
                        }
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default FormInput;
