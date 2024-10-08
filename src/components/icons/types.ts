import type { AccessibleSvg } from '@/components/AccessibleSvg';

export type SvgIconProps = Omit<
  React.ComponentProps<typeof AccessibleSvg>,
  'children'
>;
