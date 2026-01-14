import { Apple, Check, Droplets, Fish, Leaf, Pill, Sun } from "lucide-react";
import { useState } from "react";

interface NutritionItem {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

const NutritionReminders = () => {
  const [items, setItems] = useState<NutritionItem[]>([
    {
      id: 1,
      name: "Prenatal Vitamins",
      description: "Take your daily prenatal vitamin with folic acid",
      icon: <Pill className="w-4 h-4" />,
      completed: false
    },
    {
      id: 2,
      name: "Stay Hydrated",
      description: "Drink at least 8-10 glasses of water",
      icon: <Droplets className="w-4 h-4" />,
      completed: false
    },
    {
      id: 3,
      name: "Iron-Rich Foods",
      description: "Include leafy greens, lean meat, or beans",
      icon: <Leaf className="w-4 h-4" />,
      completed: false
    },
    {
      id: 4,
      name: "Omega-3 Fatty Acids",
      description: "Eat fish or take DHA supplements",
      icon: <Fish className="w-4 h-4" />,
      completed: false
    },
    {
      id: 5,
      name: "Fruits & Vegetables",
      description: "Aim for 5 servings of colorful produce",
      icon: <Apple className="w-4 h-4" />,
      completed: false
    },
    {
      id: 6,
      name: "Vitamin D",
      description: "Get 15 minutes of sunlight or take supplements",
      icon: <Sun className="w-4 h-4" />,
      completed: false
    }
  ]);

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = items.filter(item => item.completed).length;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-secondary flex items-center justify-center">
            <Apple className="w-5 h-5 text-secondary-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Daily Nutrition</h3>
            <p className="text-xs text-muted-foreground">Track your healthy habits</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-secondary-foreground">{completedCount}</span>
          <span className="text-muted-foreground text-sm">/{items.length}</span>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`w-full p-3 rounded-xl border transition-all text-left flex items-center gap-3 ${
              item.completed 
                ? "bg-success/10 border-success/30" 
                : "bg-muted/30 border-border hover:border-secondary/50"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              item.completed 
                ? "bg-success text-success-foreground" 
                : "bg-secondary/20 text-secondary-foreground"
            }`}>
              {item.completed ? <Check className="w-4 h-4" /> : item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium text-sm ${item.completed ? "text-success line-through" : "text-foreground"}`}>
                {item.name}
              </h4>
              <p className="text-xs text-muted-foreground truncate">{item.description}</p>
            </div>
          </button>
        ))}
      </div>

      {completedCount === items.length && (
        <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-xl text-center">
          <p className="text-success font-semibold">🎉 Great job! All goals completed!</p>
        </div>
      )}
    </div>
  );
};

export default NutritionReminders;
