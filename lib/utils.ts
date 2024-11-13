

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
    const dateTimeOptions: Intl.DateTimeFormatOptions = {
        // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
        month: "short", // abbreviated month name (e.g., 'Oct')
        day: "numeric", // numeric day of the month (e.g., '25')
        year: "numeric", // numeric year (e.g., '2023')
        hour: "numeric", // numeric hour (e.g., '8')
        minute: "numeric", // numeric minute (e.g., '30')
        hour12: true // use 12-hour clock (true) or 24-hour clock (false)
    };

    const dateDayOptions: Intl.DateTimeFormatOptions = {
        weekday: "short", // abbreviated weekday name (e.g., 'Mon')
        year: "numeric", // numeric year (e.g., '2023')
        month: "2-digit", // abbreviated month name (e.g., 'Oct')
        day: "2-digit" // numeric day of the month (e.g., '25')
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
        month: "short", // abbreviated month name (e.g., 'Oct')
        year: "numeric", // numeric year (e.g., '2023')
        day: "numeric" // numeric day of the month (e.g., '25')
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric", // numeric hour (e.g., '8')
        minute: "numeric", // numeric minute (e.g., '30')
        hour12: true // use 12-hour clock (true) or 24-hour clock (false)
    };

    const formattedDateTime: string = new Date(dateString).toLocaleString(
        "en-US",
        dateTimeOptions
    );

    const formattedDateDay: string = new Date(dateString).toLocaleString(
        "en-US",
        dateDayOptions
    );

    const formattedDate: string = new Date(dateString).toLocaleString(
        "en-US",
        dateOptions
    );

    const formattedTime: string = new Date(dateString).toLocaleString(
        "en-US",
        timeOptions
    );

    return {
        dateTime: formattedDateTime,
        dateDay: formattedDateDay,
        dateOnly: formattedDate,
        timeOnly: formattedTime
    };
};

export function encryptKey(passkey: string) {
    return btoa(passkey);
}

export function decryptKey(passkey: string) {
    return atob(passkey);
}

export function formatAmount(amount: number): string {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    });

    return formatter.format(amount);
}
export const formatText = (len = 10, rwstring) => {
    const truncate = rwstring.slice(0, len);
    return `${truncate}...`;
};
export const removeSpecialCharacters = (value: string) => {
    return value.replace(/[^\w\s]/gi, "");
};

export const getRating = reviews => {
    const len = reviews?.length;
    const totalSumRating = reviews?.reduce(
        (acc, cur) => acc + parseFloat(cur.rate),
        0
    );
    const avgRating = totalSumRating > 0 ? totalSumRating / len : 0;
    const res = avgRating.toFixed(1);
    return parseFloat(res);
};

export const roundNum = num => {
    const validateNum = Number(num);
    if (validateNum > 99) {
        const calc = validateNum / 100;
        return `${calc.toFixed(1)}+H`;
    } else if (validateNum > 999) {
        const calc = validateNum / 1000;
        return `${calc.toFixed(1)}+K`;
    } else {
        return validateNum;
    }
};

export const resp = (
    status = 500,
    message = "an error occured please try again"
) => {
    const success = status < 300 && status >= 200;
    if (success) {
        return {
            isError: false,
            isSuccess: true,
            status,
            message
        };
    } else {
        return {
            isError: true,
            isSuccess: false,
            status,
            message
        };
    }
};

export const uploadFile = async (uri, name) => {
    try {
      

        const formData = new FormData();
        formData.append("file", {
            uri,
            name,
            type: "application/octet-stream"
        });

        const { data } = await useAxiosAdmin.post(
            `/storage/buckets/${process.env.EXPO_PUBLIC_BUCKET_ID}/files`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        console.log("File uploaded:", data);
        return data;
    } catch ({ status, message }) {
        console.error("Error uploading file:", status, message);
    }
};
