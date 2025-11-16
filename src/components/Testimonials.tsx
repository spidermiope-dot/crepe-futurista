import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  image: string;
  text: string;
  revenue: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Marina Silva",
    location: "São Paulo, SP",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    text: "Comecei vendendo crepes na feira e hoje tenho minha própria loja! O curso me ensinou tudo, desde as receitas até como precificar. Em 6 meses já recuperei o investimento.",
    revenue: "R$ 8.000/mês"
  },
  {
    name: "Carlos Eduardo",
    location: "Rio de Janeiro, RJ",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    text: "Sempre quis empreender mas não sabia por onde começar. Os crepes foram perfeitos! Baixo investimento, alta margem. Hoje trabalho de casa e ganho mais do que no emprego anterior.",
    revenue: "R$ 12.000/mês"
  },
  {
    name: "Ana Paula",
    location: "Belo Horizonte, MG",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    text: "O módulo de ganhar dinheiro foi um divisor de águas! Aprendi estratégias de marketing que triplicaram minhas vendas. A comunidade do WhatsApp também ajuda muito com dicas diárias.",
    revenue: "R$ 15.000/mês"
  },
  {
    name: "Roberto Costa",
    location: "Curitiba, PR",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    text: "Fiz o curso durante a pandemia e mudou minha vida. Comecei com delivery e hoje tenho 3 pontos de venda. As receitas são aprovadas e testadas, tudo muito profissional!",
    revenue: "R$ 25.000/mês"
  },
  {
    name: "Juliana Mendes",
    location: "Porto Alegre, RS",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop",
    text: "Melhor decisão que tomei! Trabalho apenas 4 horas por dia e ganho muito mais. O suporte da comunidade é incrível, sempre alguém pronto para ajudar.",
    revenue: "R$ 10.000/mês"
  },
  {
    name: "Pedro Henrique",
    location: "Brasília, DF",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    text: "Investimento que mais valeu a pena! Em 3 meses já estava lucrando. As estratégias de precificação e vendas fazem toda diferença. Recomendo muito!",
    revenue: "R$ 9.500/mês"
  }
];

const Testimonials = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12 animate-slide-in-up">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Histórias de Sucesso
        </h2>
        <p className="text-xl text-muted-foreground">
          Veja o que nossos alunos estão conquistando
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card 
            key={index}
            className="glass-card p-6 space-y-4 hover:scale-105 transition-all duration-300 animate-slide-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-4">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/50"
              />
              <div>
                <h3 className="font-bold text-foreground">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>

            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              "{testimonial.text}"
            </p>

            <div className="pt-4 border-t border-border/50">
              <span className="text-primary font-bold text-lg">
                {testimonial.revenue}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                de faturamento mensal
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
