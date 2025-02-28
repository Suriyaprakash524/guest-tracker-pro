
import React, { useState } from 'react';
import { format, addDays, startOfWeek, endOfWeek, addWeeks, subWeeks, isToday, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, Clock, ArrowLeft, ArrowRight, ChevronDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { visitors, hosts } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

const CalendarPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [view, setView] = useState('week');

  const getEventsForDay = (day) => {
    return visitors.filter(visitor => 
      isSameDay(new Date(visitor.checkInTime), day)
    );
  };

  const getDaysInWeek = () => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 0 });
    const end = endOfWeek(currentWeek, { weekStartsOn: 0 });
    const days = [];
    let day = start;
    
    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }
    
    return days;
  };

  const daysOfWeek = getDaysInWeek();

  const generateHoursOfDay = () => {
    const hours = [];
    for (let i = 9; i <= 17; i++) {
      hours.push(i);
    }
    return hours;
  };

  const hours = generateHoursOfDay();

  const nextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const previousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const getHostNameById = (hostId) => {
    const host = hosts.find(h => h.id === hostId);
    return host ? host.name : 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isSidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="lg:pl-64 pt-16">
        <main className="page-container">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-semibold animate-fade-in">Calendar</h1>
              <p className="text-muted-foreground mt-1">
                Schedule and manage visitor appointments
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 animate-slide-up">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <CalendarIcon size={16} />
                    <span>{format(date, 'PPP')}</span>
                    <ChevronDown size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Select defaultValue={view} onValueChange={setView}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day View</SelectItem>
                  <SelectItem value="week">Week View</SelectItem>
                  <SelectItem value="month">Month View</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="bg-brand-600 hover:bg-brand-700">
                <Plus size={16} className="mr-2" />
                New Appointment
              </Button>
            </div>
          </header>
          
          <Card className="mb-8 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Button variant="outline" size="icon" onClick={previousWeek}>
                  <ArrowLeft size={16} />
                </Button>
                
                <h2 className="text-xl font-medium">
                  {format(startOfWeek(currentWeek), 'MMM d')} - {format(endOfWeek(currentWeek), 'MMM d, yyyy')}
                </h2>
                
                <Button variant="outline" size="icon" onClick={nextWeek}>
                  <ArrowRight size={16} />
                </Button>
              </div>
              
              <div className="calendar-grid">
                {/* Week header */}
                <div className="grid grid-cols-8 gap-4 mb-2 text-center">
                  <div className="col-span-1"></div>
                  {daysOfWeek.map((day, index) => (
                    <div 
                      key={index} 
                      className={`font-medium ${isToday(day) ? 'text-brand-600' : ''}`}
                    >
                      <div>{format(day, 'EEE')}</div>
                      <div className={`text-lg ${isToday(day) ? 'bg-brand-50 rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}>
                        {format(day, 'd')}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Calendar grid */}
                <div className="border rounded-md">
                  {hours.map((hour) => (
                    <div key={hour} className="grid grid-cols-8 gap-4 border-b last:border-b-0">
                      <div className="col-span-1 p-2 border-r text-sm text-muted-foreground text-center">
                        {hour}:00
                      </div>
                      
                      {daysOfWeek.map((day, dayIndex) => {
                        const events = getEventsForDay(day).filter(event => 
                          new Date(event.checkInTime).getHours() === hour
                        );
                        
                        return (
                          <div 
                            key={dayIndex} 
                            className={`col-span-1 p-2 min-h-[80px] border-r last:border-r-0 relative ${
                              isToday(day) ? 'bg-brand-50/20' : ''
                            }`}
                          >
                            {events.map((event, eventIndex) => (
                              <div 
                                key={eventIndex}
                                className="absolute inset-1 bg-brand-100 rounded-md p-2 text-xs overflow-hidden border border-brand-200"
                              >
                                <div className="font-medium truncate">{event.name}</div>
                                <div className="flex items-center gap-1 text-muted-foreground mt-1">
                                  <Clock size={12} />
                                  {format(new Date(event.checkInTime), 'h:mm a')}
                                </div>
                                <div className="truncate text-muted-foreground mt-1">
                                  Host: {getHostNameById(event.host)}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Upcoming Appointments</h3>
                <div className="space-y-4">
                  {visitors.slice(0, 5).map((visitor, index) => (
                    <div key={index} className="flex items-center justify-between border-b last:border-b-0 pb-3 last:pb-0">
                      <div>
                        <p className="font-medium">{visitor.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(visitor.checkInTime), 'MMM d, yyyy • h:mm a')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Host: {getHostNameById(visitor.host)}
                        </p>
                      </div>
                      <Badge className="bg-brand-100 text-brand-800 hover:bg-brand-200">
                        {visitor.purpose}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Today's Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-md p-4 text-center">
                    <p className="text-muted-foreground text-sm">Total Appointments</p>
                    <p className="text-3xl font-bold mt-1">8</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-md p-4 text-center">
                    <p className="text-muted-foreground text-sm">Checked In</p>
                    <p className="text-3xl font-bold mt-1">5</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-md p-4 text-center">
                    <p className="text-muted-foreground text-sm">Pending</p>
                    <p className="text-3xl font-bold mt-1">3</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-md p-4 text-center">
                    <p className="text-muted-foreground text-sm">Canceled</p>
                    <p className="text-3xl font-bold mt-1">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CalendarPage;
