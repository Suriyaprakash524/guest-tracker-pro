
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { 
  ChevronRight, 
  ClipboardCheck, 
  Lock, 
  BarChart3,
  BellRing, 
  Users
} from 'lucide-react';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, handle authentication here
    navigate('/dashboard');
  };

  const features = [
    {
      icon: <ClipboardCheck size={24} />,
      title: 'Streamlined Check-in',
      description: 'Quick and efficient visitor registration process',
    },
    {
      icon: <BellRing size={24} />,
      title: 'Instant Notifications',
      description: 'Automatic alerts when your visitors arrive',
    },
    {
      icon: <Users size={24} />,
      title: 'Visitor Management',
      description: 'Track and manage all visitors in one place',
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Insightful Analytics',
      description: 'Gain valuable insights about visitor patterns',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xl text-brand-700">GuestPro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-brand-600 transition-colors">
              Features
            </a>
            <a href="#" className="text-sm font-medium hover:text-brand-600 transition-colors">
              Pricing
            </a>
            <a href="#" className="text-sm font-medium hover:text-brand-600 transition-colors">
              About
            </a>
            <a href="#" className="text-sm font-medium hover:text-brand-600 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                Modern Visitor <span className="text-brand-600">Management</span> Solution
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Streamline your front desk experience with our intuitive visitor check-in system. Designed for businesses of all sizes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-brand-600 hover:bg-brand-700"
                  onClick={() => navigate('/dashboard')}
                >
                  Get Started
                  <ChevronRight size={16} className="ml-1" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/check-in')}
                >
                  Visitor Check-in
                </Button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border shadow-sm animate-scale-in">
              <h2 className="text-2xl font-medium mb-6">Log In</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="input-focus"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <a href="#" className="text-xs text-brand-600 hover:text-brand-700">
                      Forgot Password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="input-focus"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-brand-600 hover:bg-brand-700"
                >
                  <Lock size={16} className="mr-2" />
                  Log In
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold">Features</h2>
              <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                Everything you need to manage your visitor experience effectively
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-slide-up">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="bg-brand-50 rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-semibold mb-3">Ready to transform your visitor experience?</h2>
                <p className="text-lg text-muted-foreground max-w-md">
                  Join thousands of businesses using GuestPro to manage their visitors securely and efficiently.
                </p>
              </div>
              <Button 
                size="lg" 
                className="bg-brand-600 hover:bg-brand-700 min-w-[200px]"
                onClick={() => navigate('/dashboard')}
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-brand-600 text-sm">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-brand-600 text-sm">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-brand-600 text-sm">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-brand-600 text-sm">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-brand-600 text-sm">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-brand-600 text-sm">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-brand-600 text-sm">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-brand-600 text-sm">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-brand-600 text-sm">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-brand-600 text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-brand-600 text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-brand-600 text-sm">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} GuestPro. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-brand-600">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-600">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
