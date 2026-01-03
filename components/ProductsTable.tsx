"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { deleteProducts } from "@/actions/product-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductsTableProps {
    products: any[];
}

export function ProductsTable({ products }: ProductsTableProps) {
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const toggleSelectAll = () => {
        if (selectedIds.length === products.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(products.map((p) => p._id));
        }
    };

    const toggleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((sid) => sid !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleBulkDelete = async () => {
        if (!confirm("Are you sure you want to delete selected items?")) return;

        setIsDeleting(true);
        try {
            await deleteProducts(selectedIds);
            toast.success("Products deleted successfully");
            setSelectedIds([]);
            router.refresh();
        } catch (error) {
            toast.error("Failed to delete products");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-4">
            {selectedIds.length > 0 && (
                <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
                    <span className="text-sm font-medium">{selectedIds.length} selected</span>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleBulkDelete}
                        disabled={isDeleting}
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Selected
                    </Button>
                </div>
            )}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    checked={products.length > 0 && selectedIds.length === products.length}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((item) => (
                            <TableRow key={item._id} data-state={selectedIds.includes(item._id) && "selected"}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedIds.includes(item._id)}
                                        onCheckedChange={() => toggleSelect(item._id)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="relative h-12 w-12 rounded-md overflow-hidden">
                                        {item.images?.[0] ? (
                                            <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                                        ) : (
                                            <div className="h-full w-full bg-secondary" />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{formatter.format(item.price)}</TableCell>
                                <TableCell>{item.stock}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/admin/products/${item._id}`}>
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
