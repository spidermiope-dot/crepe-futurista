import { Home, Cookie, ChefHat, Users, DollarSign, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Início", url: "/members", icon: Home },
  { title: "Crepes Doces", url: "/members/doces", icon: Cookie },
  { title: "Crepes Salgados", url: "/members/salgados", icon: ChefHat },
  { title: "Comunidade", url: "/members/comunidade", icon: Users },
  { title: "Negócios", url: "/members/negocios", icon: DollarSign },
  { title: "Meu Perfil", url: "/members/perfil", icon: User },
];

const FloatingNav = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block animate-slide-in-up">
      <div className="glass-card px-4 py-2 rounded-full shadow-2xl glow-primary">
        <ul className="flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.url}>
              <NavLink
                to={item.url}
                end
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                  "hover:bg-primary/20 hover:scale-105"
                )}
                activeClassName="bg-gradient-primary text-foreground font-bold shadow-lg"
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default FloatingNav;
