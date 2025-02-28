
import React, { useState } from 'react';
import { 
  Save, 
  User, 
  Building, 
  Bell, 
  ShieldCheck, 
  Trash2, 
  HelpCircle,
  Mail,
  Phone,
  Globe,
  Check,
  Lock,
  Key
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    companyName: 'Acme Corporation',
    email: 'admin@acmecorp.com',
    phone: '(555) 123-4567',
    website: 'www.acmecorp.com',
    address: '123 Business Ave, Suite 100',
    city: 'Metropolis',
    state: 'CA',
    zip: '90210',
    notifyOnCheckIn: true,
    notifyOnCheckOut: true,
    dailySummary: true,
    securityAlerts: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name, checked) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isSidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="lg:pl-64 pt-16">
        <main className="page-container">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-semibold animate-fade-in">Settings</h1>
              <p className="text-muted-foreground mt-1">
                Manage your account and application preferences
              </p>
            </div>
            
            <Button 
              onClick={handleSaveChanges}
              className="bg-brand-600 hover:bg-brand-700 animate-slide-up"
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </header>
          
          <Tabs defaultValue="profile" className="animate-fade-in">
            <TabsList className="mb-8 grid grid-cols-4 md:grid-cols-5 lg:w-[800px]">
              <TabsTrigger value="profile">
                <User size={16} className="mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="company">
                <Building size={16} className="mr-2" />
                Company
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell size={16} className="mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security">
                <ShieldCheck size={16} className="mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="help" className="hidden md:flex">
                <HelpCircle size={16} className="mr-2" />
                Help
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-[200px] flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                        <User size={48} className="text-gray-500" />
                      </div>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          defaultValue="john.doe@acmecorp.com"
                          name="email"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          defaultValue="(555) 987-6543"
                          name="phone"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select defaultValue="admin">
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="receptionist">Receptionist</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName" 
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Email</Label>
                      <div className="flex">
                        <Mail size={16} className="mr-2 text-muted-foreground self-center" />
                        <Input 
                          id="companyEmail" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="companyPhone">Phone</Label>
                      <div className="flex">
                        <Phone size={16} className="mr-2 text-muted-foreground self-center" />
                        <Input 
                          id="companyPhone" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="companyWebsite">Website</Label>
                      <div className="flex">
                        <Globe size={16} className="mr-2 text-muted-foreground self-center" />
                        <Input 
                          id="companyWebsite" 
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <h3 className="text-lg font-medium">Location</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input 
                        id="state" 
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input 
                        id="zip" 
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <h3 className="text-lg font-medium">Business Hours</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weekdayStart">Weekday Start</Label>
                      <Select defaultValue="9">
                        <SelectTrigger>
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(12)].map((_, i) => (
                            <SelectItem key={i} value={`${i + 7}`}>
                              {i + 7}:00 AM
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weekdayEnd">Weekday End</Label>
                      <Select defaultValue="17">
                        <SelectTrigger>
                          <SelectValue placeholder="End time" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(12)].map((_, i) => (
                            <SelectItem key={i} value={`${i + 12}`}>
                              {i === 0 ? 12 : i > 0 && i < 12 ? i + 12 : i}:00 {i < 12 ? 'PM' : 'AM'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weekendStart">Weekend Start</Label>
                      <Select defaultValue="closed">
                        <SelectTrigger>
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="closed">Closed</SelectItem>
                          {[...Array(12)].map((_, i) => (
                            <SelectItem key={i} value={`${i + 7}`}>
                              {i + 7}:00 AM
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weekendEnd">Weekend End</Label>
                      <Select defaultValue="closed">
                        <SelectTrigger>
                          <SelectValue placeholder="End time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="closed">Closed</SelectItem>
                          {[...Array(12)].map((_, i) => (
                            <SelectItem key={i} value={`${i + 12}`}>
                              {i === 0 ? 12 : i > 0 && i < 12 ? i + 12 : i}:00 {i < 12 ? 'PM' : 'AM'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-medium">Check-in Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when visitors check in
                        </p>
                      </div>
                      <Switch 
                        checked={formData.notifyOnCheckIn}
                        onCheckedChange={(checked) => handleSwitchChange('notifyOnCheckIn', checked)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-medium">Check-out Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when visitors check out
                        </p>
                      </div>
                      <Switch 
                        checked={formData.notifyOnCheckOut}
                        onCheckedChange={(checked) => handleSwitchChange('notifyOnCheckOut', checked)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-medium">Daily Summary</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive a daily summary of all visitor activity
                        </p>
                      </div>
                      <Switch 
                        checked={formData.dailySummary}
                        onCheckedChange={(checked) => handleSwitchChange('dailySummary', checked)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-medium">Security Alerts</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about security events
                        </p>
                      </div>
                      <Switch 
                        checked={formData.securityAlerts}
                        onCheckedChange={(checked) => handleSwitchChange('securityAlerts', checked)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-base font-medium mb-3">Notification Methods</h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>In-app notifications</span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <Label htmlFor="emailNotifications">Email Notifications</Label>
                            <Input 
                              id="emailNotifications" 
                              defaultValue="john.doe@acmecorp.com"
                              className="mt-1"
                            />
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <Label htmlFor="smsNotifications">SMS Notifications</Label>
                            <Input 
                              id="smsNotifications" 
                              defaultValue="(555) 987-6543"
                              className="mt-1"
                            />
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="flex">
                          <Lock size={16} className="mr-2 text-muted-foreground self-center" />
                          <Input id="currentPassword" type="password" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="flex">
                          <Key size={16} className="mr-2 text-muted-foreground self-center" />
                          <Input id="newPassword" type="password" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="flex">
                          <Key size={16} className="mr-2 text-muted-foreground self-center" />
                          <Input id="confirmPassword" type="password" />
                        </div>
                      </div>
                      
                      <Button>Update Password</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-medium">Enable Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">
                          Require a verification code when logging in
                        </p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sessions</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your active sessions
                    </p>
                    
                    <div className="space-y-4">
                      <div className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">Current Session</h4>
                            <p className="text-sm text-muted-foreground">
                              Windows 10 • Chrome • New York, USA
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Started: March 19, 2023 at 10:30 AM
                        </p>
                      </div>
                      
                      <Button>Log Out All Other Devices</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground">
                      Irreversible and destructive actions
                    </p>
                    
                    <Button variant="destructive" className="flex items-center gap-2">
                      <Trash2 size={16} />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="help">
              <Card>
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Documentation</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Access comprehensive guides and documentation to help you use GuestPro effectively.
                    </p>
                    <Button variant="outline">View Documentation</Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Contact Support</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Need help? Our support team is available 24/7 to assist you.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-muted-foreground" />
                        <span>support@guestpro.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-muted-foreground" />
                        <span>1-800-555-HELP</span>
                      </div>
                      <Button>Contact Support</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Feedback</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      We value your feedback to improve our service.
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="feedback">Share Your Feedback</Label>
                      <textarea 
                        id="feedback" 
                        className="w-full min-h-[100px] p-3 rounded-md border border-input"
                        placeholder="What do you like or what could we improve?"
                      />
                      <Button>Submit Feedback</Button>
                    </div>
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

export default Settings;
