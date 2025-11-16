import { Home, Cookie, ChefHat, Users, DollarSign, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Início", url: "/members", icon: Home },
  { title: "Doces", url: "/members/doces", icon: Cookie },
  { title: "Salgados", url: "/members/salgados", icon: ChefHat },
  { title: "Grupo", url: "/members/comunidade", icon: Users },
  { title: "Negócios", url: "/members/negocios", icon: DollarSign },
  { title: "Perfil", url: "/members/perfil", icon: User },
];

const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-card border-t border-border/50">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <li key={item.url} className="flex-1">
            <NavLink
              to={item.url}
              end
              className={cn(
                "flex flex-col items-center justify-center gap-1 h-full transition-all",
                "hover:bg-primary/10"
              )}
              activeClassName="text-primary font-bold"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNav;
