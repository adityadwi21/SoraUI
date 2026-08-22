import type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps, CardTitleProps, CardDescriptionProps } from './card.types';

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

function Card({ elevated, className, children, ...props }: CardProps) {
  return (
    <div className={cx('sora-card', elevated && 'sora-card--elevated', className)} {...props}>
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return <div className={cx('sora-card__header', className)} {...props}>{children}</div>;
}

function CardTitle({ className, children, ...props }: CardTitleProps) {
  return <h3 className={cx('sora-card__title', className)} {...props}>{children}</h3>;
}

function CardDescription({ className, children, ...props }: CardDescriptionProps) {
  return <p className={cx('sora-card__description', className)} {...props}>{children}</p>;
}

function CardContent({ className, children, ...props }: CardContentProps) {
  return <div className={cx('sora-card__content', className)} {...props}>{children}</div>;
}

function CardFooter({ className, children, ...props }: CardFooterProps) {
  return <div className={cx('sora-card__footer', className)} {...props}>{children}</div>;
}

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps, CardTitleProps, CardDescriptionProps };