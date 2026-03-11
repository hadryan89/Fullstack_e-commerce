import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-secondary rounded-xl shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
}
