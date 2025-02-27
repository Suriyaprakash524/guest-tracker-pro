
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import VisitorForm from '@/components/visitor/VisitorForm';

const CheckIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Check-in successful!",
        description: "Your host has been notified of your arrival.",
      });
      
      // Redirect back to home after a delay
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to home
          </Button>
          
          <div className="flex items-center mb-8">
            <span className="font-semibold text-xl text-brand-700">GuestPro</span>
          </div>
        </div>
        
        {!isSuccess ? (
          <div className="animate-fade-in">
            <VisitorForm onSubmit={handleSubmit} isLoading={isSubmitting} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center animate-scale-in">
            <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Check-in Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your host has been notified of your arrival. Please wait in the reception area.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting you back to the home page...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckIn;
