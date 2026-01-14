import { Apple, Check, Droplets, Fish, Leaf, Pill, Sun } from "lucide-react";
import { useNutritionLogs } from "@/hooks/useNutritionLogs";

const nutritionItems = [
  {
    id: "prenatal-vitamins",
    name: "Prenatal Vitamins",
    description: "Take your daily prenatal vitamin with folic acid",
    icon: <Pill className="w-4 h-4" />
  },
  {
    id: "hydration",
    name: "Stay Hydrated",
    description: "Drink at least 8-10 glasses of water",
    icon: <Droplets className="w-4 h-4" />
  },
  {
    id: "iron-rich-foods",
    name: "Iron-Rich Foods",
    description: "Include leafy greens, lean meat, or beans",
    icon: <Leaf className="w-4 h-4" />
  },
  {
    id: "omega-3",
    name: "Omega-3 Fatty Acids",
    description: "Eat fish or take DHA supplements",
    icon: <Fish className="w-4 h-4" />
  },
  {
    id: "fruits-vegetables",
    name: "Fruits & Vegetables",
    description: "Aim for 5 servings of colorful produce",
    icon: <Apple className="w-4 h-4" />
  },
  {
    id: "vitamin-d",
    name: "Vitamin D",
    description: "Get 15 minutes of sunlight or take supplements",
    icon: <Sun className="w-4 h-4" />
  }
];

const NutritionReminders = () => {
  const { completedItems, toggleItem, loading } = useNutritionLogs();

  const completedCount = completedItems.size;

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
          <span className="text-muted-foreground text-sm">/{nutritionItems.length}</span>
        </div>
      </div>

      <div className="space-y-2">
        {nutritionItems.map((item) => {
          const isCompleted = completedItems.has(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              disabled={loading}
              className={`w-full p-3 rounded-xl border transition-all text-left flex items-center gap-3 ${
                isCompleted 
                  ? "bg-success/10 border-success/30" 
                  : "bg-muted/30 border-border hover:border-secondary/50"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                isCompleted 
                  ? "bg-success text-success-foreground" 
                  : "bg-secondary/20 text-secondary-foreground"
              }`}>
                {isCompleted ? <Check className="w-4 h-4" /> : item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium text-sm ${isCompleted ? "text-success line-through" : "text-foreground"}`}>
                  {item.name}
                </h4>
                <p className="text-xs text-muted-foreground truncate">{item.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {completedCount === nutritionItems.length && (
        <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-xl text-center">
          <p className="text-success font-semibold">🎉 Great job! All goals completed!</p>
        </div>
      )}
    </div>
  );
};

export default NutritionReminders;
