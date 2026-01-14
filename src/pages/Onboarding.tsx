import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePregnancyData } from '@/hooks/usePregnancyData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Heart, CalendarIcon, Baby } from 'lucide-react';
import { format, addMonths } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Onboarding = () => {
  const navigate = useNavigate();
  const { savePregnancyData } = usePregnancyData();
  const [loading, setLoading] = useState(false);
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [babyName, setBabyName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dueDate) {
      toast.error('Please select your due date');
      return;
    }

    setLoading(true);
    const { error } = await savePregnancyData(dueDate, babyName);
    
    if (error) {
      toast.error('Failed to save', { description: error.message });
    } else {
      toast.success('Welcome to MamaCare!');
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-gradient-primary rounded-full p-4 w-fit">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-heading text-primary">Welcome, Mama!</CardTitle>
            <CardDescription className="font-body">
              Let's set up your pregnancy journey
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="font-body flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                When is your due date?
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Select your due date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    fromMonth={new Date()}
                    toMonth={addMonths(new Date(), 10)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="baby-name" className="font-body flex items-center gap-2">
                <Baby className="h-4 w-4 text-primary" />
                Baby's nickname (optional)
              </Label>
              <Input
                id="baby-name"
                type="text"
                placeholder="Little one, Peanut, etc."
                value={babyName}
                onChange={(e) => setBabyName(e.target.value)}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90"
              disabled={loading || !dueDate}
            >
              {loading ? 'Saving...' : 'Start My Journey'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
