"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ImageUpload";
import { createProduct, updateProduct, deleteProduct } from "@/actions/product-actions";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { productSchema, ProductFormValues } from "@/lib/validations";

interface ProductFormProps {
    initialData?: ProductFormValues & { _id: string } | null;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Product" : "Create Product";
    const description = initialData ? "Edit a product" : "Add a new product";
    const toastMessage = initialData ? "Product updated." : "Product created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: initialData || {
            name: "",
            description: "",
            price: 0,
            stock: 0,
            category: "",
            images: [],
        },
    });

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await updateProduct(initialData._id, data);
                toast.success("Product updated.");
            } else {
                await createProduct(data);
                toast.success("Product created.");
            }
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            if (initialData) {
                await deleteProduct(initialData._id);
                router.refresh();
                router.push("/admin/products");
                toast.success("Product deleted.");
            }
        } catch (error) {
            toast.error("Make sure you removed all categories using this product first.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="icon"
                        onClick={onDelete}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value.map((image) => image)}
                                        disabled={loading}
                                        onChange={(url) => field.onChange([...field.value, url])}
                                        onRemove={(url) =>
                                            field.onChange([
                                                ...field.value.filter((current) => current !== url),
                                            ])
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Product name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="10" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Category" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Product description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </div>
    );
};
