import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { signIn, signUp, getCurrentUser } from "@/lib/supabase";
import { supabase } from "@/integrations/supabase/client";
import crepeHero from "@/assets/crepe-hero.jpg";
import backgroundAbstract from "@/assets/background-abstract.jpg";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        navigate("/members");
      }
    };
    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/members");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Email ou senha incorretos");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Login realizado com sucesso!");
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes("User already registered")) {
            toast.error("Este email já está cadastrado");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Cadastro realizado! Você já pode fazer login.");
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      toast.error("Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundAbstract})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/80" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Hero Image */}
        <div className="hidden md:block animate-slide-in-left">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl" />
            <img 
              src={crepeHero} 
              alt="Delicious Crepes" 
              className="relative rounded-3xl shadow-2xl glow-primary"
            />
          </div>
          <div className="mt-8 text-center">
            <h1 className="text-5xl font-bold gradient-text mb-4">Academia do Crepe</h1>
            <p className="text-xl text-muted-foreground">
              Aprenda a fazer crepes incríveis e transforme sua vida!
            </p>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <Card className="glass-card p-8 animate-slide-in-right">
          <div className="md:hidden mb-6 text-center">
            <h1 className="text-4xl font-bold gradient-text mb-2">Academia do Crepe</h1>
            <p className="text-muted-foreground">Seu curso de crepes gourmet</p>
          </div>

          <Tabs defaultValue="login" className="w-full" onValueChange={(value) => setIsLogin(value === "login")}>
            <TabsList className="grid w-full grid-cols-2 mb-8 glass-card">
              <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Cadastrar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleAuth} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-card border-border"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-card border-border"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="neon"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleAuth} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-card border-border"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Senha</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-card border-border"
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-muted-foreground">Mínimo de 6 caracteres</p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="neon"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Cadastrando..." : "Criar Conta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Acesse o curso completo de crepes</p>
            <p className="mt-2">🥞 Receitas • 👥 Comunidade • 💰 Negócios</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
