
import React, { useState } from 'react';
import { 
  PieChart, 
  Pie, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon, 
  Calendar, 
  ArrowDown, 
  Download 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { visitors } from '@/lib/data';

// Prepare chart data
const getVisitorsByDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const visitorsByDay = days.map(day => ({ name: day, visitors: 0 }));
  
  visitors.forEach(visitor => {
    const day = new Date(visitor.checkInTime).getDay();
    visitorsByDay[day].visitors += 1;
  });
  
  return visitorsByDay;
};

const getVisitorsByPurpose = () => {
  const purposes = {};
  
  visitors.forEach(visitor => {
    if (!purposes[visitor.purpose]) {
      purposes[visitor.purpose] = 0;
    }
    purposes[visitor.purpose] += 1;
  });
  
  return Object.keys(purposes).map(purpose => ({
    name: purpose,
    value: purposes[purpose]
  }));
};

const getVisitorsByMonth = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = months.map(month => ({ name: month, visitors: Math.floor(Math.random() * 50) + 10 }));
  return data;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

const Analytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const visitorsByDay = getVisitorsByDay();
  const visitorsByPurpose = getVisitorsByPurpose();
  const visitorsByMonth = getVisitorsByMonth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isSidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="lg:pl-64 pt-16">
        <main className="page-container">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-semibold animate-fade-in">Analytics</h1>
              <p className="text-muted-foreground mt-1">
                View visitor metrics and trends
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 animate-slide-up">
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Last 30 days</span>
                <ArrowDown size={16} />
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                <span>Export Data</span>
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{visitors.length}</div>
                <p className="text-muted-foreground text-sm">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Daily Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <p className="text-muted-foreground text-sm">-3% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Peak Visit Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2:00 PM</div>
                <p className="text-muted-foreground text-sm">Busiest hour of the day</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="animate-fade-in">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">
                <BarChart3 size={16} className="mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="trends">
                <LineChartIcon size={16} className="mr-2" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="breakdown">
                <PieChartIcon size={16} className="mr-2" />
                Breakdown
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Visitors by Day of Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={visitorsByDay}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="visitors" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trends">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Visitor Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={visitorsByMonth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="visitors" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="breakdown">
              <Card>
                <CardHeader>
                  <CardTitle>Visitors by Purpose</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={visitorsByPurpose}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {visitorsByPurpose.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
