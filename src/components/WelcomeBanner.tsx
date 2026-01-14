import { Sparkles } from "lucide-react";

interface WelcomeBannerProps {
  userName?: string;
  greeting?: string;
}

const WelcomeBanner = ({ userName = "Mama", greeting }: WelcomeBannerProps) => {
  const getGreeting = () => {
    if (greeting) return greeting;
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="relative overflow-hidden gradient-warm rounded-2xl p-6 mb-6 shadow-soft animate-slide-up">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-secondary/20 blur-2xl" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-primary animate-pulse-gentle" />
          <span className="text-sm font-medium text-primary">Your Daily Update</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-1">
          {getGreeting()}, <span className="text-gradient">{userName}!</span>
        </h2>
        <p className="text-muted-foreground text-sm">
          Here's everything you need to know about your pregnancy journey today.
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
