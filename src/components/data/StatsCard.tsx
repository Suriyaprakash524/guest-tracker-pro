
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description?: string;
  trend?: number;
  trendDirection?: 'up' | 'down' | 'neutral';
  className?: string;
}

const StatsCard = ({
  title,
  value,
  icon,
  description,
  trend,
  trendDirection = 'neutral',
  className,
}: StatsCardProps) => {
  const getTrendColor = () => {
    if (trendDirection === 'up') return 'text-green-500';
    if (trendDirection === 'down') return 'text-red-500';
    return 'text-gray-500';
  };

  const getTrendIcon = () => {
    if (trendDirection === 'up') return '↑';
    if (trendDirection === 'down') return '↓';
    return '→';
  };

  return (
    <Card className={cn("overflow-hidden card-hover", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h4 className="text-2xl font-semibold mt-1">{value}</h4>
            
            {(description || trend !== undefined) && (
              <div className="flex items-center mt-2 text-sm">
                {trend !== undefined && (
                  <span className={`${getTrendColor()} font-medium mr-1`}>
                    {getTrendIcon()} {Math.abs(trend)}%
                  </span>
                )}
                {description && (
                  <span className="text-muted-foreground">{description}</span>
                )}
              </div>
            )}
          </div>
          
          <div className="p-2 rounded-md bg-brand-50 text-brand-600">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
