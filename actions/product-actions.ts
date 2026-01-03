"use server";

import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import { productSchema, ProductFormValues } from "@/lib/validations";
import { redirect } from "next/navigation";

export async function createProduct(data: ProductFormValues) {
    try {
        const conn = await connectToDatabase();
        if (!conn) return { error: "Demo mode: Database not connected" };

        const validatedFields = productSchema.safeParse(data);

        if (!validatedFields.success) {
            return { error: "Invalid fields" };
        }

        await Product.create(validatedFields.data);

        revalidatePath("/admin/products");
        revalidatePath("/admin/dashboard");
    } catch (error) {
        console.error("Failed to create product:", error);
        return { error: "Failed to create product" };
    }
    redirect("/admin/products");
}

export async function updateProduct(id: string, data: ProductFormValues) {
    try {
        const conn = await connectToDatabase();
        if (!conn) return { error: "Demo mode: Database not connected" };

        const validatedFields = productSchema.safeParse(data);

        if (!validatedFields.success) {
            return { error: "Invalid fields" };
        }

        await Product.findByIdAndUpdate(id, validatedFields.data);

        revalidatePath("/admin/products");
        revalidatePath(`/admin/products/${id}`);
    } catch (error) {
        console.error("Failed to update product:", error);
        return { error: "Failed to update product" };
    }
    redirect("/admin/products");
}

export async function deleteProduct(id: string) {
    try {
        const conn = await connectToDatabase();
        if (!conn) return { error: "Demo mode: Database not connected" };
        await Product.findByIdAndDelete(id);
        revalidatePath("/admin/products");
        return { message: "Deleted Product" };
    } catch (error) {
        return { error: "Failed to delete product" };
    }
}

export async function deleteProducts(ids: string[]) {
    try {
        const conn = await connectToDatabase();
        if (!conn) return { error: "Demo mode: Database not connected" };

        await Product.deleteMany({ _id: { $in: ids } });
        revalidatePath("/admin/products");
        return { message: "Deleted Products" };
    } catch (error) {
        console.error("Bulk delete failed:", error);
        return { error: "Failed to delete products" };
    }
}

export async function getProducts(query?: string, page = 1, limit = 10) {
    const conn = await connectToDatabase();
    if (!conn) {
        return {
            products: [],
            totalPages: 0,
            currentPage: 1,
            totalProducts: 0,
        };
    }
    const skip = (page - 1) * limit;

    const filter = query
        ? { name: { $regex: query, $options: "i" } }
        : {};

    const products = await Product.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Product.countDocuments(filter);

    // Serialize for Client Components
    return {
        products: JSON.parse(JSON.stringify(products)),
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalProducts: total,
    };
}

export async function getProduct(id: string) {
    const conn = await connectToDatabase();
    if (!conn) return null;
    const product = await Product.findById(id);
    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
    return JSON.parse(JSON.stringify(product));
}

export async function getAllProductsForExport() {
    const conn = await connectToDatabase();
    if (!conn) return [];

    const products = await Product.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
}
