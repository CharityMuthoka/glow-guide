import { Lightbulb, ArrowRight } from "lucide-react";

const tips = [
  {
    id: 1,
    title: "Sleep on your left side",
    description: "This position improves blood flow to your baby and reduces swelling."
  },
  {
    id: 2,
    title: "Practice Kegel exercises",
    description: "Strengthen pelvic floor muscles to prepare for delivery."
  },
  {
    id: 3,
    title: "Avoid raw or undercooked foods",
    description: "Stay safe from bacteria that could harm your baby."
  },
  {
    id: 4,
    title: "Take short walks daily",
    description: "Light exercise helps with circulation and reduces stress."
  }
];

const QuickTips = () => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">Health Tips</h3>
          <p className="text-xs text-muted-foreground">Daily wellness advice</p>
        </div>
      </div>

      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div 
            key={tip.id} 
            className="group p-4 bg-muted/30 hover:bg-accent/10 rounded-xl transition-all cursor-pointer border border-transparent hover:border-accent/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-semibold text-sm text-foreground group-hover:text-accent-foreground transition-colors">
                  {tip.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{tip.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent-foreground group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickTips;
