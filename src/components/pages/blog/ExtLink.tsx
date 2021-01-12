import * as React from 'react';

export const ExtLink: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
> = props => <a {...props} rel="noopener" target={props.target || '_blank'} />;
