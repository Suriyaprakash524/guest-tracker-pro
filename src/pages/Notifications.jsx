
import React, { useState } from 'react';
import { Bell, CheckCircle, Clock, X, Mail, Calendar, User, Filter, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useToast } from '@/hooks/use-toast';

// Mock notification data
const mockNotifications = [
  {
    id: '1',
    title: 'Alex Thompson arrived',
    message: 'Alex Thompson has checked in for a meeting with Emily Rodriguez.',
    time: '10 minutes ago',
    type: 'check-in',
    read: false,
  },
  {
    id: '2',
    title: 'Robert Garcia checked out',
    message: 'Robert Garcia has completed their visit with David Kim.',
    time: '32 minutes ago',
    type: 'check-out',
    read: false,
  },
  {
    id: '3',
    title: 'New visitor pre-registered',
    message: 'Daniel Miller has been pre-registered for a visit tomorrow at 2:00 PM.',
    time: '1 hour ago',
    type: 'registration',
    read: true,
  },
  {
    id: '4',
    title: 'Visit canceled',
    message: 'The scheduled visit with Emma Wilson has been canceled.',
    time: '3 hours ago',
    type: 'cancellation',
    read: true,
  },
  {
    id: '5',
    title: 'System maintenance',
    message: 'The system will undergo maintenance tonight from 2:00 AM to 4:00 AM.',
    time: '5 hours ago',
    type: 'system',
    read: true,
  },
  {
    id: '6',
    title: 'New host added',
    message: 'Sarah Johnson has been added as a new host in the system.',
    time: '1 day ago',
    type: 'system',
    read: true,
  },
  {
    id: '7',
    title: 'Visitor overstayed',
    message: 'Jessica Wong has been checked in for more than 3 hours.',
    time: '1 day ago',
    type: 'alert',
    read: true,
  },
];

const NotificationItem = ({ notification, onRead, onDelete }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'check-in':
        return <Bell className="h-5 w-5 text-green-500" />;
      case 'check-out':
        return <CheckCircle className="h-5 w-5 text-gray-500" />;
      case 'registration':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'cancellation':
        return <X className="h-5 w-5 text-red-500" />;
      case 'alert':
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return <Mail className="h-5 w-5 text-brand-500" />;
    }
  };

  return (
    <div className={`border-b last:border-b-0 p-4 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-medium">{notification.title}</h3>
            <span className="text-xs text-muted-foreground">{notification.time}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
          
          <div className="flex justify-between items-center">
            <div>
              {!notification.read && (
                <Badge variant="outline" className="text-xs bg-blue-50">
                  New
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2">
              {!notification.read && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-xs"
                  onClick={() => onRead(notification.id)}
                >
                  Mark as read
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDelete(notification.id)}>
                    Delete
                  </DropdownMenuItem>
                  {notification.read ? (
                    <DropdownMenuItem onClick={() => onRead(notification.id, false)}>
                      Mark as unread
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => onRead(notification.id)}>
                      Mark as read
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const { toast } = useToast();

  const handleMarkAsRead = (id, isRead = true) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: isRead } : notif
    ));
    
    toast({
      title: isRead ? "Marked as read" : "Marked as unread",
      description: "Notification status updated successfully.",
    });
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    
    toast({
      title: "All marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const checkInNotifications = notifications.filter(n => n.type === 'check-in' || n.type === 'check-out');
  const alertNotifications = notifications.filter(n => n.type === 'alert' || n.type === 'cancellation');
  const systemNotifications = notifications.filter(n => n.type === 'system' || n.type === 'registration');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isSidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="lg:pl-64 pt-16">
        <main className="page-container">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-semibold animate-fade-in">Notifications</h1>
              <p className="text-muted-foreground mt-1">
                View and manage your notifications
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 animate-slide-up">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
              >
                <CheckCircle size={16} />
                <span>Mark all as read</span>
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                <span>Filter</span>
              </Button>
            </div>
          </header>
          
          <Card className="animate-fade-in">
            <Tabs defaultValue="all">
              <div className="border-b px-4">
                <TabsList className="mt-4">
                  <TabsTrigger value="all" className="relative">
                    All
                    {unreadCount > 0 && (
                      <Badge className="ml-2 bg-brand-100 text-brand-800 hover:bg-brand-200">
                        {unreadCount} new
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="check-ins">
                    Check-ins
                    <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">
                      {checkInNotifications.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="alerts">
                    Alerts
                    <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-200">
                      {alertNotifications.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="system">
                    System
                    <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {systemNotifications.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <CardContent className="p-0">
                <TabsContent value="all" className="mt-0">
                  {notifications.length > 0 ? (
                    <div className="divide-y">
                      {notifications.map(notification => (
                        <NotificationItem 
                          key={notification.id} 
                          notification={notification}
                          onRead={handleMarkAsRead}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                      <h3 className="text-lg font-medium">No notifications</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        You don't have any notifications at the moment.
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="check-ins" className="mt-0">
                  {checkInNotifications.length > 0 ? (
                    <div className="divide-y">
                      {checkInNotifications.map(notification => (
                        <NotificationItem 
                          key={notification.id} 
                          notification={notification}
                          onRead={handleMarkAsRead}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                      <h3 className="text-lg font-medium">No check-in notifications</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        You don't have any check-in notifications at the moment.
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="alerts" className="mt-0">
                  {alertNotifications.length > 0 ? (
                    <div className="divide-y">
                      {alertNotifications.map(notification => (
                        <NotificationItem 
                          key={notification.id} 
                          notification={notification}
                          onRead={handleMarkAsRead}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                      <h3 className="text-lg font-medium">No alert notifications</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        You don't have any alert notifications at the moment.
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="system" className="mt-0">
                  {systemNotifications.length > 0 ? (
                    <div className="divide-y">
                      {systemNotifications.map(notification => (
                        <NotificationItem 
                          key={notification.id} 
                          notification={notification}
                          onRead={handleMarkAsRead}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                      <h3 className="text-lg font-medium">No system notifications</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        You don't have any system notifications at the moment.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
