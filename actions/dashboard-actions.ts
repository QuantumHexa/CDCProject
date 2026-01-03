'use server'

import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";

export async function getDashboardStats() {
    try {
        const conn = await connectToDatabase();
        if (!conn) {
            return {
                totalProducts: 0,
                connected: false
            };
        }

        const productCount = await Product.countDocuments();

        return {
            totalProducts: productCount,
            connected: true
        };
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        return {
            totalProducts: 0,
            connected: false
        };
    }
}
