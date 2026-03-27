import { HeroSkeleton, PageHeaderSkeleton } from '@/components/ui/LoadingSkeletons'

export default function HomeLoading() {
  return (
    <>
      <HeroSkeleton />
      <PageHeaderSkeleton />
      <PageHeaderSkeleton />
      <PageHeaderSkeleton />
    </>
  )
}
