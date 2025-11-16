import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface CourseModuleProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  onClick: () => void;
  color: "primary" | "secondary" | "accent";
}

const CourseModule = ({ title, description, icon: Icon, image, onClick, color }: CourseModuleProps) => {
  const colorClasses = {
    primary: "from-primary/20 to-primary/5 glow-primary",
    secondary: "from-secondary/20 to-secondary/5 glow-secondary",
    accent: "from-accent/20 to-accent/5 glow-accent",
  };

  return (
    <Card 
      className={`glass-card overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-br ${colorClasses[color]}`}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <Icon className="absolute top-4 right-4 w-8 h-8 text-foreground glow-primary" />
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold gradient-text">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        <Button variant="glass" className="w-full">
          Acessar Módulo
        </Button>
      </div>
    </Card>
  );
};

export default CourseModule;
