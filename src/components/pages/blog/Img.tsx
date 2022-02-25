import Image from 'next/image';

export const Img: React.FC<{
  src: string;
  width: number;
  height: number;
  alt?: string;
  unoptimized?: boolean;
  priority?: boolean;
}> = props => (
  <div className="mx-auto my-8 overflow-hidden text-center">
    <span className="post-image-wrapper">
      <Image
        src={props.src}
        alt={props.alt}
        role={!props.alt ? 'presentation' : undefined}
        width={props.width}
        height={props.height}
        unoptimized={props.unoptimized}
        priority={props.priority}
        lazyBoundary="1000px"
        className="object-cover"
      />
    </span>
  </div>
);
