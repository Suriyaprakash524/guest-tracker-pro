
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Building, 
  MessageSquare, 
  User2, 
  LogOut,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDistanceToNow } from 'date-fns';

const VisitorCard = ({ visitor, host, onCheckout, onNotify }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'checked-in':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'checked-out':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'no-show':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTimeSince = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'checked-in':
        return (
          <div className="flex items-center gap-1">
            <CheckCircle2 size={14} />
            <span>Checked In</span>
          </div>
        );
      case 'checked-out':
        return (
          <div className="flex items-center gap-1">
            <LogOut size={14} />
            <span>Checked Out</span>
          </div>
        );
      case 'no-show':
        return (
          <div className="flex items-center gap-1">
            <AlertCircle size={14} />
            <span>Expected</span>
          </div>
        );
      default:
        return status;
    }
  };

  return (
    <Card className="overflow-hidden card-hover">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="p-4 pb-2">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-lg">{visitor.name}</h3>
                <p className="text-muted-foreground text-sm">{visitor.email}</p>
              </div>
              
              <Badge 
                className={`${getStatusColor(visitor.status)} font-medium`}
              >
                {getStatusText(visitor.status)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock size={15} className="mr-1.5" />
                <span>
                  {visitor.status === 'no-show' 
                    ? `Expected ${visitor.expectedArrivalTime ? getTimeSince(visitor.expectedArrivalTime) : 'Today'}`
                    : `Checked in ${getTimeSince(visitor.checkInTime)}`
                  }
                </span>
              </div>
              
              {visitor.company && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building size={15} className="mr-1.5" />
                  <span>{visitor.company}</span>
                </div>
              )}
              
              <div className="flex items-center text-sm text-muted-foreground">
                <MessageSquare size={15} className="mr-1.5" />
                <span>{visitor.purpose}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <User2 size={15} className="mr-1.5" />
                <span>{host?.name || 'Unknown Host'}</span>
              </div>
            </div>
          </div>
          
          {visitor.status === 'checked-in' && (
            <div className="flex border-t">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex-1 h-10 rounded-none text-brand-600 hover:bg-brand-50 hover:text-brand-700"
                      onClick={() => onNotify && onNotify(visitor.id)}
                    >
                      Notify Host
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send notification to host</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <div className="w-px bg-gray-200"></div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex-1 h-10 rounded-none text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => onCheckout && onCheckout(visitor.id)}
                    >
                      Check Out
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Check out this visitor</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorCard;
