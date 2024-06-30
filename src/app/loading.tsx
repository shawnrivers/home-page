import { Loader } from '@/components/Loader';

export default function Loading() {
  return (
    <div className="flex justify-center p-2">
      <Loader className="size-8" />
    </div>
  );
}
