import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, MapPin, Phone, Briefcase, LogOut } from "lucide-react";
import { toast } from "sonner";
import { signOut, getCurrentUser } from "@/lib/supabase";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import FloatingNav from "@/components/FloatingNav";
import MobileNav from "@/components/MobileNav";
import backgroundAbstract from "@/assets/background-abstract.jpg";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  const userInitials = user?.email?.substring(0, 2).toUpperCase() || "US";

  return (
    <div 
      className="min-h-screen pb-20 md:pb-0"
      style={{
        backgroundImage: `url(${backgroundAbstract})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-background/90" />
      <FloatingNav />
      <MobileNav />

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto animate-slide-in-up">
          <Card className="glass-card p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-border/50">
              <Avatar className="w-32 h-32 ring-4 ring-primary/50">
                <AvatarImage src="" />
                <AvatarFallback className="text-3xl bg-gradient-primary text-foreground">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold gradient-text mb-2">Meu Perfil</h1>
                <p className="text-muted-foreground mb-4">
                  Gerencie suas informações pessoais
                </p>
                <Button variant="outline" size="sm">
                  Alterar Foto
                </Button>
              </div>

              <Button variant="destructive" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Informações Pessoais</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nome Completo
                  </Label>
                  <Input 
                    id="name" 
                    placeholder="Seu nome completo"
                    className="glass-card"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="glass-card opacity-70"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Telefone
                  </Label>
                  <Input 
                    id="phone" 
                    placeholder="(00) 00000-0000"
                    className="glass-card"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Cidade
                  </Label>
                  <Input 
                    id="city" 
                    placeholder="Sua cidade"
                    className="glass-card"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="business" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Status do Negócio
                  </Label>
                  <Input 
                    id="business" 
                    placeholder="Ex: Iniciando, Vendendo em feiras, Loja própria"
                    className="glass-card"
                  />
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <Button variant="neon" size="lg" className="flex-1">
                  Salvar Alterações
                </Button>
                <Button variant="outline" size="lg">
                  Cancelar
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-border/50">
              <h2 className="text-2xl font-bold mb-6">Progresso no Curso</h2>
              <div className="grid grid-cols-3 gap-4">
                <Card className="glass-card p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">75%</div>
                  <div className="text-sm text-muted-foreground">Concluído</div>
                </Card>
                <Card className="glass-card p-4 text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">28</div>
                  <div className="text-sm text-muted-foreground">Aulas Assistidas</div>
                </Card>
                <Card className="glass-card p-4 text-center">
                  <div className="text-3xl font-bold text-accent mb-1">12</div>
                  <div className="text-sm text-muted-foreground">Receitas Testadas</div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
