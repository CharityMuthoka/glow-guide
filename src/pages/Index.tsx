import { useState } from "react";
import Header from "@/components/Header";
import WelcomeBanner from "@/components/WelcomeBanner";
import PregnancyTracker from "@/components/PregnancyTracker";
import DangerSignsCard from "@/components/DangerSignsCard";
import NutritionReminders from "@/components/NutritionReminders";
import QuickTips from "@/components/QuickTips";

const Index = () => {
  // Example data - in a real app, this would come from user input/database
  const [pregnancyData] = useState({
    currentWeek: 24,
    dueDate: "April 15, 2026",
    userName: "Sarah"
  });

  return (
    <div className="min-h-screen bg-background">
      <Header userName={pregnancyData.userName} />
      
      <main className="container mx-auto px-4 py-6 pb-20">
        <WelcomeBanner userName={pregnancyData.userName} />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Main pregnancy tracker - spans full width on mobile, 2 cols on larger */}
          <div className="md:col-span-2 lg:col-span-2">
            <PregnancyTracker 
              currentWeek={pregnancyData.currentWeek} 
              dueDate={pregnancyData.dueDate} 
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
