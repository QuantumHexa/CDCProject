"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { getAllProductsForExport } from "@/actions/product-actions";

export function ExportButton() {
    const handleExport = async () => {
        const products = await getAllProductsForExport();

        if (!products || products.length === 0) {
            alert("No products to export");
            return;
        }

        const headers = ["ID", "Name", "Category", "Price", "Stock", "Created At"];
        const csvContent = [
            headers.join(","),
            ...products.map((p: any) => [
                p._id,
                `"${p.name.replace(/"/g, '""')}"`, // Escape quotes
                `"${p.category}"`,
                p.price,
                p.stock,
                new Date(p.createdAt).toISOString()
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "products_export.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
    );
}
