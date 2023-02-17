import { Loader } from '@/components/Loader';

export default function Loading() {
  return (
    <div className="flex justify-center p-2">
      <Loader className="h-8 w-8" />
    </div>
  );
}
