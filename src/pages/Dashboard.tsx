
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Clock, 
  Calendar, 
  BarChart3, 
  ArrowRight,
  Bell,
  CheckCircle2,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import StatsCard from '@/components/data/StatsCard';
import VisitorCard from '@/components/visitor/VisitorCard';
import { dashboardStats, visitors, getHostById } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const handleCheckout = (id: string) => {
    toast({
      title: "Visitor checked out",
      description: "The visitor has been successfully checked out.",
    });
  };

  const handleNotify = (id: string) => {
    toast({
      title: "Host notified",
      description: "A notification has been sent to the host.",
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Get all checked-in visitors
  const checkedInVisitors = visitors.filter(visitor => visitor.status === 'checked-in');
  
  // Get all checked-out visitors
  const checkedOutVisitors = visitors.filter(visitor => visitor.status === 'checked-out');
  
  // Get all expected visitors
  const expectedVisitors = visitors.filter(visitor => visitor.status === 'no-show');

  // Format date with detailed information
  const formatDateTime = (date: Date) => {
    return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
  };

  // Format date for grouping
  const formatDateForGrouping = (date: Date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };

  // Group visitors by check-in/check-out date
  const groupVisitorsByDate = (visitorList: typeof visitors) => {
    const groupedVisitors: Record<string, typeof visitors> = {};
    
    visitorList.forEach(visitor => {
      const date = visitor.status === 'checked-out' && visitor.checkOutTime 
        ? formatDateForGrouping(visitor.checkOutTime) 
        : formatDateForGrouping(visitor.checkInTime);
      
      if (!groupedVisitors[date]) {
        groupedVisitors[date] = [];
      }
      
      groupedVisitors[date].push(visitor);
    });
    
    return groupedVisitors;
  };

  const groupedCheckedIn = groupVisitorsByDate(checkedInVisitors);
  const groupedCheckedOut = groupVisitorsByDate(checkedOutVisitors);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="lg:pl-64 pt-16">
        <main className="page-container">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold animate-fade-in">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's what's happening today.
            </p>
          </header>
          
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
            <StatsCard
              title="Current Visitors"
              value={dashboardStats.currentVisitors}
              icon={<Users size={20} />}
              description="On premise now"
              className="animate-fade-in" 
              style={{ animationDelay: '100ms' }}
            />
            <StatsCard
              title="Today's Visitors"
              value={dashboardStats.todayTotal}
              icon={<Clock size={20} />}
              trend={12}
              trendDirection="up"
              description="vs. yesterday"
              className="animate-fade-in" 
              style={{ animationDelay: '200ms' }}
            />
            <StatsCard
              title="This Week"
              value={dashboardStats.weeklyTotal}
              icon={<Calendar size={20} />}
              trend={5}
              trendDirection="up"
              description="vs. last week"
              className="animate-fade-in" 
              style={{ animationDelay: '300ms' }}
            />
            <StatsCard
              title="This Month"
              value={dashboardStats.monthlyTotal}
              icon={<BarChart3 size={20} />}
              trend={8}
              trendDirection="up"
              description="vs. last month"
              className="animate-fade-in" 
              style={{ animationDelay: '400ms' }}
            />
          </section>
          
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Tabs defaultValue="checked-in">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="checked-in" className="relative">
                    <CheckCircle2 size={16} className="mr-2" />
                    Checked In
                    <Badge className="ml-2 bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                      {checkedInVisitors.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="checked-out">
                    <LogOut size={16} className="mr-2" />
                    Checked Out
                    <Badge className="ml-2 bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200">
                      {checkedOutVisitors.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
                
                <Link to="/visitors">
                  <Button variant="ghost" className="text-sm" size="sm">
                    View All <ArrowRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>
              
              <TabsContent value="checked-in">
                {Object.keys(groupedCheckedIn).length > 0 ? (
                  Object.entries(groupedCheckedIn)
                    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
                    .map(([date, dateVisitors]) => (
                      <div key={date} className="mb-6">
                        <h3 className="font-medium text-md mb-3 text-gray-700 flex items-center">
                          <Calendar size={16} className="mr-2" />
                          {format(new Date(date), "EEEE, MMMM d, yyyy")}
                          <Badge className="ml-2">
                            {dateVisitors.length} visitor{dateVisitors.length !== 1 ? 's' : ''}
                          </Badge>
                        </h3>
                        <div className="space-y-4">
                          {dateVisitors.map((visitor) => (
                            <Card key={visitor.id} className="overflow-hidden card-hover">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="font-medium text-lg">{visitor.name}</h3>
                                    <p className="text-muted-foreground text-sm">{visitor.email}</p>
                                  </div>
                                  <Badge className="bg-green-100 text-green-700 border-green-200 font-medium">
                                    <CheckCircle2 size={14} className="mr-1" />
                                    Checked In
                                  </Badge>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2 mt-3">
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock size={15} className="mr-1.5" />
                                    <span>{formatDateTime(visitor.checkInTime)}</span>
                                  </div>
                                  
                                  {visitor.company && (
                                    <div className="flex items-center text-sm text-muted-foreground">
                                      <span>{visitor.company}</span>
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <span>{visitor.purpose}</span>
                                  </div>
                                  
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <span>Host: {getHostById(visitor.host)?.name || 'Unknown'}</span>
                                  </div>
                                </div>
                                
                                <div className="flex mt-4 pt-4 border-t">
                                  <Button 
                                    variant="ghost" 
                                    className="flex-1 h-8 rounded-sm text-brand-600 hover:bg-brand-50 hover:text-brand-700"
                                    onClick={() => handleNotify(visitor.id)}
                                  >
                                    Notify Host
                                  </Button>
                                  
                                  <div className="w-px bg-gray-200"></div>
                                  
                                  <Button 
                                    variant="ghost" 
                                    className="flex-1 h-8 rounded-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                                    onClick={() => handleCheckout(visitor.id)}
                                  >
                                    Check Out
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))
                ) : (
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                      <Users className="h-12 w-12 text-muted-foreground mb-3" />
                      <p className="font-medium">No visitors checked in</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        There are currently no visitors checked in.
                      </p>
                      <Button 
                        className="mt-4"
                        onClick={() => window.location.href = '/check-in'}
                      >
                        <UserPlus size={16} className="mr-2" />
                        New Check-in
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="checked-out">
                {Object.keys(groupedCheckedOut).length > 0 ? (
                  Object.entries(groupedCheckedOut)
                    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
                    .map(([date, dateVisitors]) => (
                      <div key={date} className="mb-6">
                        <h3 className="font-medium text-md mb-3 text-gray-700 flex items-center">
                          <Calendar size={16} className="mr-2" />
                          {format(new Date(date), "EEEE, MMMM d, yyyy")}
                          <Badge className="ml-2">
                            {dateVisitors.length} visitor{dateVisitors.length !== 1 ? 's' : ''}
                          </Badge>
                        </h3>
                        <div className="space-y-4">
                          {dateVisitors.map((visitor) => (
                            <Card key={visitor.id} className="overflow-hidden card-hover">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="font-medium text-lg">{visitor.name}</h3>
                                    <p className="text-muted-foreground text-sm">{visitor.email}</p>
                                  </div>
                                  <Badge className="bg-gray-100 text-gray-700 border-gray-200 font-medium">
                                    <LogOut size={14} className="mr-1" />
                                    Checked Out
                                  </Badge>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock size={15} className="mr-1.5 text-green-600" />
                                    <span>In: {formatDateTime(visitor.checkInTime)}</span>
                                  </div>
                                  
                                  {visitor.checkOutTime && (
                                    <div className="flex items-center text-sm text-muted-foreground">
                                      <Clock size={15} className="mr-1.5 text-red-600" />
                                      <span>Out: {formatDateTime(visitor.checkOutTime)}</span>
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <span>{visitor.purpose}</span>
                                    {visitor.company && <span> • {visitor.company}</span>}
                                  </div>
                                  
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <span>Host: {getHostById(visitor.host)?.name || 'Unknown'}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))
                ) : (
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                      <LogOut className="h-12 w-12 text-muted-foreground mb-3" />
                      <p className="font-medium">No visitors checked out</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        There are no visitors who have checked out.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <section className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Expected Arrivals</h2>
              <Link to="/visitors">
                <Button variant="ghost" className="text-sm" size="sm">
                  View All <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {expectedVisitors.length > 0 ? (
                expectedVisitors.slice(0, 3).map((visitor) => (
                  <VisitorCard
                    key={visitor.id}
                    visitor={visitor}
                    host={getHostById(visitor.host)}
                  />
                ))
              ) : (
                <Card className="col-span-full">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-3" />
                    <p className="font-medium">No expected visitors</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      There are no visitors expected to arrive.
                    </p>
                    <Button 
                      className="mt-4"
                      onClick={() => window.location.href = '/check-in'}
                    >
                      <UserPlus size={16} className="mr-2" />
                      Pre-register Visitor
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
          
          <section className="mt-8 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Recent Activity</h2>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="p-4 flex items-start gap-3">
                    <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                      <UserPlus size={18} />
                    </div>
                    <div>
                      <p className="font-medium">Alex Thompson checked in</p>
                      <p className="text-sm text-muted-foreground">10 minutes ago • Visiting Emily Rodriguez</p>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-start gap-3">
                    <div className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                      <LogOut size={18} />
                    </div>
                    <div>
                      <p className="font-medium">Robert Garcia checked out</p>
                      <p className="text-sm text-muted-foreground">32 minutes ago • Visited David Kim</p>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-start gap-3">
                    <div className="h-9 w-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 flex-shrink-0">
                      <Bell size={18} />
                    </div>
                    <div>
                      <p className="font-medium">Host notified of visitor arrival</p>
                      <p className="text-sm text-muted-foreground">45 minutes ago • Sarah Johnson notified</p>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-start gap-3">
                    <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                      <UserPlus size={18} />
                    </div>
                    <div>
                      <p className="font-medium">Jessica Wong checked in</p>
                      <p className="text-sm text-muted-foreground">1 hour ago • Visiting Michael Chen</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
