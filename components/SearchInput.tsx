"use client";

import { Input } from "@/components/ui/input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SearchInput() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        params.set("page", "1"); // Reset pagination
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
                placeholder="Search products..."
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                className="max-w-sm"
            />
        </div>
    );
}
