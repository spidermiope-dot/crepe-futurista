import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CourseModule from "@/components/CourseModule";
import Testimonials from "@/components/Testimonials";
import FloatingNav from "@/components/FloatingNav";
import MobileNav from "@/components/MobileNav";
import { ChefHat, Cookie, Users, DollarSign, LogOut, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { signOut, getCurrentUser } from "@/lib/supabase";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import crepeDoce from "@/assets/crepe-doce.jpg";
import crepeSalgado from "@/assets/crepe-salgado.jpg";
import crepeMaking from "@/assets/crepe-making.jpg";
import businessMoney from "@/assets/business-money.jpg";
import backgroundAbstract from "@/assets/background-abstract.jpg";

const Members = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        navigate("/");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        navigate("/");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Erro ao sair");
    } else {
      toast.success("Até logo!");
      navigate("/");
    }
  };

  const handleModuleClick = (moduleName: string) => {
    toast.info(`Módulo "${moduleName}" em breve disponível!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse-glow">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative pb-20 md:pb-0"
      style={{
        backgroundImage: `url(${backgroundAbstract})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-background/90" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <FloatingNav />
      <MobileNav />

      <div className="relative z-10">
        {/* Header */}
        <header className="glass-card border-b border-border/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <ChefHat className="w-10 h-10 text-primary glow-primary" />
                <div>
                  <h1 className="text-3xl font-bold gradient-text">Academia do Crepe</h1>
                  <p className="text-sm text-muted-foreground">
                    Bem-vindo, {user?.email?.split('@')[0]}!
                  </p>
                </div>
              </div>
              <Button variant="glass" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-24 pb-16 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-slide-in-up">
            <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-4">
              Seu Curso de Crepes Completo
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Aprenda receitas incríveis, entre na comunidade e transforme sua paixão em negócio lucrativo
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="glass-card px-6 py-3 rounded-full">
                <span className="text-primary font-bold text-lg">4 Módulos</span>
              </div>
              <div className="glass-card px-6 py-3 rounded-full">
                <span className="text-secondary font-bold text-lg">50+ Receitas</span>
              </div>
              <div className="glass-card px-6 py-3 rounded-full">
                <span className="text-accent font-bold text-lg">Comunidade VIP</span>
              </div>
              <div className="glass-card px-6 py-3 rounded-full">
                <span className="text-primary font-bold text-lg">Suporte 24/7</span>
              </div>
            </div>
          </div>
        </section>

        {/* Course Modules */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="animate-slide-in-left">
              <CourseModule
                title="Crepes Doces"
                description="Domine a arte dos crepes doces com mais de 25 receitas exclusivas! Aprenda desde o básico até criações gourmet: crepes recheados com morangos frescos, Nutella, doce de leite, chocolate belga, frutas caramelizadas, cremes especiais e muito mais. Inclui técnicas de apresentação profissional, dicas de precificação e como criar seu próprio cardápio irresistível."
                icon={Cookie}
                image={crepeDoce}
                onClick={() => handleModuleClick("Crepes Doces")}
                color="primary"
              />
            </div>

            <div className="animate-slide-in-right">
              <CourseModule
                title="Crepes Salgados"
                description="Receitas profissionais de crepes salgados que seus clientes vão adorar! Mais de 25 opções com recheios variados: frango, carne, camarão, vegetarianos, fit e muito mais. Aprenda técnicas de preparo em larga escala, conservação adequada dos ingredientes, combinações de sabores que vendem e como montar um cardápio balanceado entre clássicos e inovações."
                icon={ChefHat}
                image={crepeSalgado}
                onClick={() => handleModuleClick("Crepes Salgados")}
                color="secondary"
              />
            </div>

            <div className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <CourseModule
                title="Comunidade VIP"
                description="Entre para o grupo exclusivo no WhatsApp com mais de 500 empreendedores do crepe! Receba suporte diário, tire dúvidas em tempo real, compartilhe experiências, participe de challenges mensais, tenha acesso a lives exclusivas com especialistas, networking para parcerias e um ambiente motivador para crescer junto. Nunca empreenda sozinho!"
                icon={Users}
                image={crepeMaking}
                onClick={() => handleModuleClick("Grupo WhatsApp")}
                color="accent"
              />
            </div>

            <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <CourseModule
                title="Ganhar Dinheiro"
                description="Estratégias comprovadas de monetização e crescimento do seu negócio! Aprenda precificação correta, gestão financeira, marketing digital para crepes, como vender em eventos e feiras, delivery lucrativo, como montar uma operação de lanche noturno, parcerias estratégicas, técnicas de vendas que aumentam o ticket médio e um plano completo de 0 a R$10.000/mês."
                icon={DollarSign}
                image={businessMoney}
                onClick={() => handleModuleClick("Ganhar Dinheiro")}
                color="primary"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Footer */}
        <footer className="glass-card border-t border-border/50 mt-16">
          <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
            <p>© 2024 Academia do Crepe. Todos os direitos reservados.</p>
            <p className="mt-2 text-sm">Transforme sua paixão em lucro 🥞</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Members;
