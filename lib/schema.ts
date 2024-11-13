import * as z from "zod";
export const authSchema = z.object({
    email: z.string().email("Invalid email address"),
    firstName: z.string("Invalid first name").optional(),
    lastName: z.string("Invalid last name ").optional(),
    password: z.string().min(8, "minimum character 4")
});

export const productSchema = z.object({
    title: z
        .string()
        .min(4, { message: "title is require and from 4 characters" }),
    desc: z
        .string()
        .min(50, { message: "description must not be less than 50 character" }),
    shortdesc: z.string().min(20, {
        message: "short description must not be less than 50 character"
    }),
    price: z.string().min(1, { message: "price is required" }),
    discount: z.string().min(1, { message: "discount is required" }),
    brand: z.string(),
    category: z.string().min(1, { message: "category is required" }),
    shipping: z.string().min(1, { message: "shipping is required" }),
    colors: z.string().min(1, { message: "color is required" }),
    sizes: z.string().min(1, { message: "size is required" }),
    weight: z.string().min(1, { message: "weight is required" }),
    sku: z.string().optional()
});
