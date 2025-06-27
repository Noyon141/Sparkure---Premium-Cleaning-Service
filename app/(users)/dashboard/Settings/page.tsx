import ChangePasswordForm from "@/components/change-password-form";
import { Card } from "@/components/ui/card";
import UserSettingsForm from "@/components/user-settings-form";

import { Suspense } from "react";

const UserSettingsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-primary mb-6">
            User Settings
          </h1>
          <Suspense fallback={<div>Loading profile...</div>}>
            <UserSettingsForm />
          </Suspense>
        </Card>
        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Change Password
          </h2>
          <Suspense fallback={<div>Loading password form...</div>}>
            <ChangePasswordForm />
          </Suspense>
        </Card>
      </div>
    </div>
  );
};

export default UserSettingsPage;
