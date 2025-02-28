
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardCheck, 
  Settings, 
  LogOut,
  BarChart3,
  Calendar,
  BellRing
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const mainNavItems = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/dashboard',
  },
  {
    title: 'Visitors',
    icon: <Users size={20} />,
    path: '/visitors',
  },
  {
    title: 'Check-In',
    icon: <ClipboardCheck size={20} />,
    path: '/check-in',
  },
  {
    title: 'Analytics',
    icon: <BarChart3 size={20} />,
    path: '/analytics',
  },
  {
    title: 'Calendar',
    icon: <Calendar size={20} />,
    path: '/calendar',
  },
  {
    title: 'Notifications',
    icon: <BellRing size={20} />,
    path: '/notifications',
  },
];

const bottomNavItems = [
  {
    title: 'Settings',
    icon: <Settings size={20} />,
    path: '/settings',
  },
];

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const NavItemComponent = ({ item }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <NavLink to={item.path} className="w-full">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start gap-3 font-normal h-11',
            isActive 
              ? 'bg-brand-50 text-brand-700 hover:bg-brand-50 hover:text-brand-700' 
              : 'hover:bg-brand-50/50 hover:text-brand-600'
          )}
        >
          {item.icon}
          <span>{item.title}</span>
        </Button>
      </NavLink>
    );
  };

  return (
    <aside 
      className={cn(
        'fixed top-16 bottom-0 left-0 z-20 w-64 bg-white border-r transition-all duration-300 ease-in-out transform',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      <div className="flex flex-col h-full py-4">
        <div className="flex-1 px-3 py-2 space-y-1">
          {mainNavItems.map((item) => (
            <NavItemComponent key={item.path} item={item} />
          ))}
        </div>
        
        <div className="px-3 py-2">
          <Separator className="my-2" />
          {bottomNavItems.map((item) => (
            <NavItemComponent key={item.path} item={item} />
          ))}
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 font-normal text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
