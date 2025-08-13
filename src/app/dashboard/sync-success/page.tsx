// app/dashboard/sync-success/page.tsx

export default function SyncSuccessPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600">✅ Sync Successful!</h1>
      <p className="mt-2 text-sm text-gray-600">
        Your files were successfully copied based on the selected date range.
      </p>
    </div>
  );
}