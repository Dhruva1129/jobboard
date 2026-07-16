export const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-bg-secondary ${className}`} />
)

export const JobCardSkeleton = () => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
    <div className="flex items-start gap-3">
      <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3.5 w-1/3" />
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
    <div className="mt-4 flex gap-2">
      <Skeleton className="h-5 w-14 rounded-md" />
      <Skeleton className="h-5 w-14 rounded-md" />
      <Skeleton className="h-5 w-14 rounded-md" />
    </div>
  </div>
)
