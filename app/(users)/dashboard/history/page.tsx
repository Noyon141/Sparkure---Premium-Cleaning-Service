import { Card } from "@/components/ui/card";
import UserHistoryList from "@/components/user-history-list";

import { Suspense } from "react";

const UserHistoryPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Service History
          </h1>
          <p className="text-neutral-200/80">
            View your past cleaning services and activities
          </p>
        </div>
        <Card className="p-8">
          <Suspense fallback={<div>Loading history...</div>}>
            <UserHistoryList />
          </Suspense>
        </Card>
      </div>
    </div>
  );
};

export default UserHistoryPage;
