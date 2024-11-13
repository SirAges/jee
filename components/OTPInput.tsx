import { useState, useEffect, useRef, type RefObject } from "react";
import { TextInput, View } from "react-native";

interface OTPInputProps {
    codes: string[];
    refs: RefObject<TextInput>[];
    errorMessages: string[] | undefined;
    onChangeCode: (text: string, index: number) => void;
    config: OTPInputConfig;
}

interface OTPInputConfig {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    errorColor: string;
    focusColor: string;
}

export default function OTPInput({ codes, setCodes, len }: OTPInputProps) {
    useEffect(() => {
        setCodes(Array(len).fill(""));
        return () => [];
    }, [len]);

    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    const [errorMessages, setErrorMessages] = useState<string[]>("");
    const refs: RefObject<TextInput>[] = [
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null)
    ];

    const onChangeCode = (text: string, index: number) => {
        if (text.length > 1) {
            setErrorMessages(undefined);
            const newCodes = text.split("");
            setCodes(newCodes);
            refs[5]!.current?.focus();
            return;
        }
        setErrorMessages(undefined);
        const newCodes = [...codes!];
        newCodes[index] = text;
        setCodes(newCodes);
        if (text !== "" && index < 5) {
            refs[index + 1]!.current?.focus();
        }
    };
    const handleFocus = (index: number) => setFocusedIndex(index);
    const handleBlur = () => setFocusedIndex(null);

    return (
        <View className="flex-row space-x-2 justify-center items-center">
            {codes.map((code, index) => (
                <TextInput
                    className="bg-card-2 rounded-md border-border border font-semibold text-center px-3 py-4 text-white"
                    key={index}
                    autoComplete="one-time-code"
                    enterKeyHint="next"
                    inputMode="numeric"
                    onChangeText={text => onChangeCode(text, index)}
                    value={code}
                    onFocus={() => handleFocus(index)}
                    onBlur={handleBlur}
                    maxLength={index === 0 ? codes.length : 1}
                    ref={refs[index]}
                    onKeyPress={({ nativeEvent: { key } }) => {
                        if (key === "Backspace" && index > 0) {
                            onChangeCode("", index - 1);
                            refs[index - 1]!.current!.focus();
                        }
                    }}
                />
            ))}
        </View>
    );
}
