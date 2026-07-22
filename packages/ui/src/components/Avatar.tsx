import React from 'react';
import { cn, getInitials } from '@nova/utils';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  status?: 'online' | 'offline' | 'busy';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = 'User',
  size = 'md',
  className,
  status,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const statusColor = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-500',
    busy: 'bg-amber-500',
  };

  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn('rounded-full object-cover border border-slate-700', sizeMap[size], className)}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-semibold flex items-center justify-center border border-slate-700 shadow-inner',
            sizeMap[size],
            className
          )}
        >
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-slate-900',
            statusColor[status],
            size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'
          )}
        />
      )}
    </div>
  );
};
