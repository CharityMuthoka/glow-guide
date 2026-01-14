import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { usePregnancyData } from "@/hooks/usePregnancyData";
import Header from "@/components/Header";
import WelcomeBanner from "@/components/WelcomeBanner";
import PregnancyTracker from "@/components/PregnancyTracker";
import DangerSignsCard from "@/components/DangerSignsCard";
import NutritionReminders from "@/components/NutritionReminders";
import QuickTips from "@/components/QuickTips";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { pregnancyData, loading: pregnancyLoading } = usePregnancyData();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (!authLoading && user && !pregnancyLoading && !pregnancyData) {
      navigate('/onboarding');
    }
  }, [authLoading, user, pregnancyLoading, pregnancyData, navigate]);

  const isLoading = authLoading || profileLoading || pregnancyLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <Skeleton className="h-16 w-full mb-6" />
          <Skeleton className="h-32 w-full mb-6" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-64 md:col-span-2" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (!user || !pregnancyData) {
    return null;
  }

  const userName = profile?.fullName || 'Mama';

  return (
    <div className="min-h-screen bg-background">
      <Header userName={userName} />
      
      <main className="container mx-auto px-4 py-6 pb-20">
        <WelcomeBanner userName={userName} />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Main pregnancy tracker - spans full width on mobile, 2 cols on larger */}
          <div className="md:col-span-2 lg:col-span-2">
            <PregnancyTracker 
              currentWeek={pregnancyData.currentWeek} 
              daysUntilDue={pregnancyData.daysUntilDue}
              dueDate={pregnancyData.dueDate}
              babyName={pregnancyData.babyName}
            />
          </div>

          {/* Danger signs card */}
          <div className="md:col-span-1">
            <DangerSignsCard />
          </div>

          {/* Nutrition reminders */}
          <div className="md:col-span-1 lg:col-span-2">
            <NutritionReminders />
          </div>

          {/* Quick tips */}
          <div className="md:col-span-1">
            <QuickTips />
          </div>
        </div>
      </main>

      {/* Bottom navigation hint */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;
