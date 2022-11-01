import { ReactElement, cloneElement } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

type ActiveLinkProps = LinkProps & {
  children: ReactElement;
  activeClassName: string;
}

export function ActiveLink({ children, activeClassName, ...props }: ActiveLinkProps) {
  const { asPath } = useRouter();

  const isCurrentPath = props.href === '/'
    ? asPath === props.href
    : asPath.includes(String(props.href));

  const className = isCurrentPath ? activeClassName : '';

  return (
    <Link {...props}>
      {cloneElement(children, {
        className
      })}
    </Link>
  )
}
