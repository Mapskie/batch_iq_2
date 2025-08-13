// app/dashboard/sync-success/page.tsx

export default function SyncErrorPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600">❌ Sync Failed!</h1>
      <p className="mt-2 text-sm text-gray-600">
        Error encountered while syncing files.
      </p>
    </div>
  );
}