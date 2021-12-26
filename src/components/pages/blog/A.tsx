export const A: React.FC<React.ComponentProps<'a'>> = props => {
  const { children, ...restProps } = props;
  return (
    <a target="_blank" rel="noopener noreferrer" {...restProps}>
      {children}
    </a>
  );
};
