import { ProductForm } from "@/components/ProductForm";
import { getProduct } from "@/actions/product-actions";
import { redirect } from "next/navigation";

export default async function EditProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        redirect('/admin/products');
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm initialData={product} />
            </div>
        </div>
    );
}
