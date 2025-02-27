
import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Filter, 
  Plus, 
  Calendar, 
  Download,
  CheckCircle2,
  LogOut,
  AlertCircle,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import SearchBar from '@/components/ui/SearchBar';
import VisitorCard from '@/components/visitor/VisitorCard';
import VisitorForm from '@/components/visitor/VisitorForm';
import { visitors, getHostById } from '@/lib/data';
import { Visitor } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Visitors = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>(visitors);
  const [isNewVisitorOpen, setIsNewVisitorOpen] = useState(false);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

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

  const handleAddVisitor = (data: any) => {
    toast({
      title: "Visitor added",
      description: "The visitor has been successfully registered.",
    });
    setIsNewVisitorOpen(false);
  };

  // Filter visitors based on search query and status filters
  useEffect(() => {
    let filtered = [...visitors];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        visitor => 
          visitor.name.toLowerCase().includes(query) ||
          visitor.email.toLowerCase().includes(query) ||
          visitor.company?.toLowerCase().includes(query) ||
          visitor.purpose.toLowerCase().includes(query)
      );
    }
    
    if (filterStatus.length > 0) {
      filtered = filtered.filter(visitor => filterStatus.includes(visitor.status));
    }
    
    setFilteredVisitors(filtered);
  }, [searchQuery, filterStatus, visitors]);

  const getVisitorsByStatus = (status: string) => {
    return filteredVisitors.filter(visitor => visitor.status === status);
  };

  const checkedInVisitors = getVisitorsByStatus('checked-in');
  const checkedOutVisitors = getVisitorsByStatus('checked-out');
  const expectedVisitors = getVisitorsByStatus('no-show');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="lg:pl-64 pt-16">
        <main className="page-container">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-semibold animate-fade-in">Visitors</h1>
              <p className="text-muted-foreground mt-1">
                Manage all visitor records and check-ins
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 animate-slide-up">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => {}}
              >
                <Calendar size={16} />
                <span>Export</span>
                <ChevronDown size={16} />
              </Button>
              
              <Button 
                onClick={() => setIsNewVisitorOpen(true)}
                className="bg-brand-600 hover:bg-brand-700"
              >
                <Plus size={16} className="mr-2" />
                New Visitor
              </Button>
            </div>
          </header>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 animate-fade-in">
            <div className="flex-1">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search visitors..."
                className="max-w-md"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Filter size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter visitors</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuCheckboxItem
                    checked={filterStatus.includes('checked-in')}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterStatus([...filterStatus, 'checked-in']);
                      } else {
                        setFilterStatus(filterStatus.filter(s => s !== 'checked-in'));
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <CheckCircle2 size={14} className="text-green-500 mr-2" />
                      Checked In
                    </div>
                  </DropdownMenuCheckboxItem>
                  
                  <DropdownMenuCheckboxItem
                    checked={filterStatus.includes('checked-out')}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterStatus([...filterStatus, 'checked-out']);
                      } else {
                        setFilterStatus(filterStatus.filter(s => s !== 'checked-out'));
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <LogOut size={14} className="text-gray-500 mr-2" />
                      Checked Out
                    </div>
                  </DropdownMenuCheckboxItem>
                  
                  <DropdownMenuCheckboxItem
                    checked={filterStatus.includes('no-show')}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterStatus([...filterStatus, 'no-show']);
                      } else {
                        setFilterStatus(filterStatus.filter(s => s !== 'no-show'));
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <AlertCircle size={14} className="text-yellow-500 mr-2" />
                      Expected
                    </div>
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Download size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Export data</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="animate-fade-in">
            <TabsList className="mb-6">
              <TabsTrigger value="all">
                All Visitors
                <Badge className="ml-2 bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200">
                  {filteredVisitors.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="checked-in">
                Checked In
                <Badge className="ml-2 bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                  {checkedInVisitors.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="checked-out">
                Checked Out
                <Badge className="ml-2 bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200">
                  {checkedOutVisitors.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="expected">
                Expected
                <Badge className="ml-2 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200">
                  {expectedVisitors.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVisitors.length > 0 ? (
                filteredVisitors.map((visitor) => (
                  <VisitorCard
                    key={visitor.id}
                    visitor={visitor}
                    host={getHostById(visitor.host)}
                    onCheckout={handleCheckout}
                    onNotify={handleNotify}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">No visitors found</h3>
                  <p className="text-muted-foreground mt-1 max-w-md">
                    No visitors match your current search and filter criteria.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="checked-in" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {checkedInVisitors.length > 0 ? (
                checkedInVisitors.map((visitor) => (
                  <VisitorCard
                    key={visitor.id}
                    visitor={visitor}
                    host={getHostById(visitor.host)}
                    onCheckout={handleCheckout}
                    onNotify={handleNotify}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">No checked-in visitors</h3>
                  <p className="text-muted-foreground mt-1 max-w-md">
                    There are currently no visitors checked in.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="checked-out" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {checkedOutVisitors.length > 0 ? (
                checkedOutVisitors.map((visitor) => (
                  <VisitorCard
                    key={visitor.id}
                    visitor={visitor}
                    host={getHostById(visitor.host)}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <LogOut className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">No checked-out visitors</h3>
                  <p className="text-muted-foreground mt-1 max-w-md">
                    There are no checked-out visitors in the system.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="expected" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expectedVisitors.length > 0 ? (
                expectedVisitors.map((visitor) => (
                  <VisitorCard
                    key={visitor.id}
                    visitor={visitor}
                    host={getHostById(visitor.host)}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">No expected visitors</h3>
                  <p className="text-muted-foreground mt-1 max-w-md">
                    There are no visitors expected to arrive.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
      
      <Dialog open={isNewVisitorOpen} onOpenChange={setIsNewVisitorOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogTitle>Add New Visitor</DialogTitle>
          <Separator className="my-4" />
          <VisitorForm onSubmit={handleAddVisitor} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Visitors;
