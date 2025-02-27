
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import StatsCard from '@/components/data/StatsCard';
import VisitorCard from '@/components/visitor/VisitorCard';
import { dashboardStats, checkedInVisitors, expectedVisitors, getHostById } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

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

  // Only show the most recent 3 checked in visitors
  const recentVisitors = checkedInVisitors.slice(0, 3);
  
  // Only show the most recent 3 expected visitors
  const upcomingVisitors = expectedVisitors.slice(0, 3);

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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Recent Visitors</h2>
                <Link to="/visitors">
                  <Button variant="ghost" className="text-sm" size="sm">
                    View All <ArrowRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentVisitors.length > 0 ? (
                  recentVisitors.map((visitor, index) => (
                    <VisitorCard
                      key={visitor.id}
                      visitor={visitor}
                      host={getHostById(visitor.host)}
                      onCheckout={handleCheckout}
                      onNotify={handleNotify}
                    />
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
              </div>
            </section>
            
            <section className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Expected Arrivals</h2>
                <Link to="/visitors">
                  <Button variant="ghost" className="text-sm" size="sm">
                    View All <ArrowRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {upcomingVisitors.length > 0 ? (
                  upcomingVisitors.map((visitor) => (
                    <VisitorCard
                      key={visitor.id}
                      visitor={visitor}
                      host={getHostById(visitor.host)}
                    />
                  ))
                ) : (
                  <Card>
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
            
            <section className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '500ms' }}>
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
                        <Clock size={18} />
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
