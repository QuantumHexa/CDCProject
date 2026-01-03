import { Button } from "@/components/ui/button";
import { getProducts } from "@/actions/product-actions";
import Link from "next/link";
import { Plus } from "lucide-react";
import { SearchInput } from "@/components/SearchInput";
import { ExportButton } from "@/components/ExportButton";
import { ProductsTable } from "@/components/ProductsTable";

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ page: string; query: string }>;
}) {
    const { page, query } = await searchParams;
    const pageNum = Number(page) || 1;
    const searchQuery = query || "";
    const { products, totalPages, currentPage } = await getProducts(searchQuery, pageNum);

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between transition-all duration-300 ease-in-out">
                <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                <Link href="/admin/products/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </Link>
            </div>
            <div className="flex items-center justify-between gap-2">
                <SearchInput />
                <ExportButton />
            </div>
            <ProductsTable products={products} />
            <div className="flex items-center justify-end space-x-2 py-4">
                {/* Pagination controls could go here */}
                <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </div>
            </div>
        </div>
    );
}
