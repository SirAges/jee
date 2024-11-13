import { FormFieldType } from "@/components/FormInput";
import { brands } from "@/lib/data";
export const signInForm = [
    {
        inputType: FormFieldType.INPUT,
        name: "email",
        type: "text",
        keyType: "",
        placeholder: "example@mail.com",
        label: "Email"
    },
    {
        inputType: FormFieldType.INPUT,
        name: "password",
        type: "text",
        keyType: "",
        placeholder: "********",
        label: "Password"
    }
];
export const signUpForm = [
    {
        inputType: FormFieldType.INPUT,
        name: "email",
        type: "text",
        keyType: "",
        placeholder: "example@mail.com",
        label: "Email"
    },
    {
        inputType: FormFieldType.INPUT,
        name: "lastName",
        type: "text",
        keyType: "",
        placeholder: "joe",
        label: "Last Name"
    },
    {
        inputType: FormFieldType.INPUT,
        name: "firstName",
        type: "text",
        keyType: "",
        placeholder: "john",
        label: "First Name"
    },
    {
        inputType: FormFieldType.INPUT,
        name: "password",
        type: "text",
        keyType: "",
        placeholder: "********",
        label: "Password"
    }
];

export const productForm = [
    {
        inputType: FormFieldType.INPUT,
        name: "title",
        type: "text",
        keyType: "",
        placeholder: "my best product",
        label: "Title"
    },
    {
        inputType: FormFieldType.INPUT,
        name: "price",
        type: "text",
        keyType: "",
        placeholder: "$43",
        label: "Price"
    },
    {
        inputType: FormFieldType.INPUT,
        name: "discount",
        type: "text",
        keyType: "",
        placeholder: "in percent 10% as 10",
        label: "Discount"
    },
    {
        inputType: FormFieldType.SELECT,
        name: "brand",
        type: "text",
        keyType: "",
        placeholder: "christian dior",
        label: "Brand",
        extra: brands.map(b => b)
    },
    {
        inputType: FormFieldType.TEXTAREA,
        name: "desc",
        type: "text",
        keyType: "",
        placeholder: "quality tshirt with a vintage style",
        label: "Description"
    },
    {
        inputType: FormFieldType.TEXTAREA,
        name: "shortdesc",
        type: "text",
        keyType: "",
        placeholder: "black,quality,silk,soft material",
        label: "Short description"
    },
    {
        inputType: FormFieldType.INPUT,
        name: "colors",
        type: "text",
        keyType: "",
        placeholder: "blue,white,yello,#deedaf",
        label: "Colors"
    },
    {
        inputType: FormFieldType.INPUT,
        name: "sizes",
        type: "text",
        keyType: "",
        placeholder: "sm,xl,xxl",
        label: "Sizes"
    },
    {
        inputType: FormFieldType.INPUT,
        name: "category",
        type: "text",
        keyType: "",
        placeholder: "tshirt",
        label: "Category"
    },
    {
        inputType: FormFieldType.INPUT,
        name: "weight",
        type: "text",
        keyType: "",
        placeholder: "15kg",
        label: "Weight"
    },
    {
        inputType: FormFieldType.SELECT,
        name: "shipping",
        type: "text",
        keyType: "",
        placeholder: "free shipping",
        label: "Shipping",
        extra: [
            "free shipping",
            "cheap shipping",
            "fast shipping",
            "moderate shipping",
            "custom shipping",
            "Immediate delivery"
        ]
    },

    {
        inputType: FormFieldType.INPUT,
        name: "sku",
        type: "text",
        keyType: "",
        placeholder: "sku043",
        label: "SKU"
    },
    {
        inputType: FormFieldType.FILE_PICKER,
        name: "images",
        type: ["image/png", "image/jpg", "image/jpeg"],
        keyType: "",
        placeholder: "beautiful",
        label: "Images"
    }
];
