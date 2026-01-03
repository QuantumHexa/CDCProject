
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

export async function GET() {
    try {
        await connectToDatabase();

        const existingUser = await User.findOne({ email: "admin@example.com" });
        if (existingUser) {
            existingUser.password = "admin123";
            await existingUser.save();
            return NextResponse.json({ message: "Admin user already exists. Password RESET to: admin123" });
        }

        const newUser = await User.create({
            email: "admin@example.com",
            password: "admin123", // In a real app, hash this!
            role: "admin"
        });

        return NextResponse.json({ message: "Admin user created successfully!", user: newUser });
    } catch (error) {
        return NextResponse.json({ error: "Failed to seed database", details: error }, { status: 500 });
    }
}
