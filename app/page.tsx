import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold">
                    Welcome to <span className="text-blue-600">Admin Dashboard</span>
                </h1>
                <div className="mt-8">
                    <Link href="/login">
                        <Button size="lg">Login to Dashboard</Button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
