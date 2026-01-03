import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            </div>
            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Settings</CardTitle>
                        <CardDescription>
                            Manage your account settings and preferences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current">Current Password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new">New Password</Label>
                            <Input id="new" type="password" />
                        </div>
                        <Button>Save Changes (Demo)</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
