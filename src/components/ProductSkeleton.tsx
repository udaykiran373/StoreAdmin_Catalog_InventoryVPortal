export default function ProductSkeleton() {
  return (
    <div className="card p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-full md:w-48 h-48 skeleton rounded-xl"></div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="h-6 skeleton rounded-lg w-3/4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-16 skeleton rounded-xl"></div>
            <div className="h-16 skeleton rounded-xl"></div>
            <div className="h-16 skeleton rounded-xl"></div>
            <div className="h-16 skeleton rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

