import { AlertTriangle, ChevronRight, Phone } from "lucide-react";
import { useState } from "react";

interface DangerSign {
  id: number;
  title: string;
  description: string;
  severity: "high" | "moderate";
}

const dangerSigns: DangerSign[] = [
  {
    id: 1,
    title: "Heavy Vaginal Bleeding",
    description: "Soaking through a pad in an hour or passing large clots",
    severity: "high"
  },
  {
    id: 2,
    title: "Severe Headache",
    description: "Persistent headache that doesn't improve with rest or medication",
    severity: "high"
  },
  {
    id: 3,
    title: "Vision Changes",
    description: "Blurred vision, seeing spots, or light sensitivity",
    severity: "high"
  },
  {
    id: 4,
    title: "Decreased Baby Movement",
    description: "Fewer than 10 movements in 2 hours after week 28",
    severity: "high"
  },
  {
    id: 5,
    title: "Sudden Swelling",
    description: "Rapid swelling of face, hands, or feet",
    severity: "moderate"
  },
  {
    id: 6,
    title: "Persistent Vomiting",
    description: "Unable to keep food or liquids down for 24 hours",
    severity: "moderate"
  }
];

const DangerSignsCard = () => {
  const [expanded, setExpanded] = useState(false);
  const displaySigns = expanded ? dangerSigns : dangerSigns.slice(0, 3);

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-destructive" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">Warning Signs</h3>
          <p className="text-xs text-muted-foreground">Know when to seek help</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {displaySigns.map((sign) => (
          <div 
            key={sign.id}
            className={`p-3 rounded-xl border transition-all ${
              sign.severity === "high" 
                ? "bg-destructive/5 border-destructive/20" 
                : "bg-warning/10 border-warning/20"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 ${
                sign.severity === "high" ? "bg-destructive" : "bg-warning"
              }`} />
              <div>
                <h4 className="font-semibold text-sm text-foreground">{sign.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{sign.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-sm text-primary font-medium flex items-center justify-center gap-1 py-2 hover:bg-primary/5 rounded-lg transition-colors"
      >
        {expanded ? "Show Less" : "View All Warning Signs"}
        <ChevronRight className={`w-4 h-4 transition-transform ${expanded ? "rotate-90" : ""}`} />
      </button>

      <div className="mt-4 pt-4 border-t border-border">
        <a 
          href="tel:911" 
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-destructive text-destructive-foreground rounded-xl font-semibold text-sm hover:bg-destructive/90 transition-colors"
        >
          <Phone className="w-4 h-4" />
          Emergency: Call 911
        </a>
      </div>
    </div>
  );
};

export default DangerSignsCard;
