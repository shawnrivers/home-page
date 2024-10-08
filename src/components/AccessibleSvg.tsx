export const AccessibleSvg: React.FC<
  React.ComponentProps<'svg'> & { title?: string }
> = ({ title, children, ...svgProps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role={title !== undefined ? 'img' : undefined}
      aria-hidden={title !== undefined ? undefined : true}
      {...svgProps}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
};
