interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`skeleton rounded-lg ${className}`} aria-hidden="true" />;
}

/** Pre-built skeleton for product card loading state */
export function ProductSkeleton() {
  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <Skeleton className="w-full h-48 rounded-2xl" />
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-1/2 h-4" />
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
      </div>
    </div>
  );
}
