import { useState } from "react";
import { Baby, Calendar, Heart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PregnancyTrackerProps {
  currentWeek: number;
  dueDate: string;
}

const PregnancyTracker = ({ currentWeek, dueDate }: PregnancyTrackerProps) => {
  const trimester = currentWeek <= 12 ? 1 : currentWeek <= 27 ? 2 : 3;
  const progress = (currentWeek / 40) * 100;
  
  const babySize = [
    "poppy seed", "sesame seed", "lentil", "blueberry", "raspberry", 
    "cherry", "lime", "plum", "peach", "lemon", "apple", "avocado",
    "turnip", "bell pepper", "mango", "banana", "carrot", "papaya",
    "pomegranate", "cantaloupe", "eggplant", "coconut", "corn", "cauliflower",
    "rutabaga", "lettuce", "cabbage", "butternut squash", "acorn squash", "cucumber",
    "pineapple", "jicama", "honeydew melon", "durian", "cantaloupe", "romaine lettuce",
    "swiss chard", "leek", "winter melon", "watermelon", "pumpkin"
  ];

  const weekDescriptions: Record<number, string> = {
    1: "Your journey begins! Conception may occur this week.",
    4: "The embryo is implanting in your uterine wall.",
    8: "Baby's heart is beating! Tiny limbs are forming.",
    12: "End of first trimester. Baby can make a fist!",
    16: "Baby can hear your voice now.",
    20: "Halfway there! You might feel kicks soon.",
    24: "Baby's lungs are developing rapidly.",
    28: "Third trimester begins. Baby's eyes can open!",
    32: "Baby is practicing breathing movements.",
    36: "Baby is getting into position for birth.",
    40: "Full term! Your baby could arrive any day!"
  };

  const closestWeek = Object.keys(weekDescriptions)
    .map(Number)
    .reduce((prev, curr) => 
      Math.abs(curr - currentWeek) < Math.abs(prev - currentWeek) ? curr : prev
    );

  return (
    <div className="gradient-card rounded-2xl p-6 shadow-card animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-soft">
            <Baby className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Week {currentWeek}</h2>
            <p className="text-sm text-muted-foreground">Trimester {trimester}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Due Date</p>
          <p className="font-semibold text-foreground">{dueDate}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-primary">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-3 bg-muted" />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>Week 1</span>
          <span>Week 40</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-muted/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Baby's Size</span>
          </div>
          <p className="text-lg font-bold text-primary capitalize">
            {babySize[Math.min(currentWeek - 1, babySize.length - 1)]}
          </p>
        </div>
        <div className="bg-muted/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-secondary-foreground" />
            <span className="text-sm font-medium text-foreground">Days Left</span>
          </div>
          <p className="text-lg font-bold text-secondary-foreground">
            {Math.max(0, (40 - currentWeek) * 7)} days
          </p>
        </div>
      </div>

      <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
        <p className="text-sm text-foreground leading-relaxed">
          {weekDescriptions[closestWeek]}
        </p>
      </div>
    </div>
  );
};

export default PregnancyTracker;
