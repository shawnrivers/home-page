import Image from 'next/image';

export const Img: React.FC<{
  src: string;
  width: number;
  height: number;
  alt?: string;
  unoptimized?: boolean;
  priority?: boolean;
}> = props => (
  <div className="mx-auto text-center">
    <Image
      src={props.src}
      alt={props.alt}
      role={!props.alt ? 'presentation' : undefined}
      width={props.width}
      height={props.height}
      unoptimized={props.unoptimized}
      priority={props.priority}
      className="asset-without-wrapper object-contain"
    />
  </div>
);
