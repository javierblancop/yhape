import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize GoogleGenAI SDK on server side
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Sommelier AI Endpoint
app.post('/api/ai/sommelier', async (req, res) => {
  const { query = '', occasion = 'picoteo', preferences = [] } = req.body;

  const systemInstruction = `
Eres el Sommelier & Asesor Gastronómico de 'YHAPE Tapas & Picoteo' en Calle La Nogalera 105, Torremolinos, Málaga.
Tu misión es guiar al cliente con simpatía brasileña, pasión por el sabor y conocimiento culinario experto.
Hablas siempre en español con calidez.
Los platos disponibles en la carta de YHAPE son:
- Salados / Croquetas: 'coxinha-brasilena' (Coxinha de pollo cremoso), 'risoles-brasilenos' (Risoles de carne, jamón y queso), 'kibe-brasileno' (Kibe con hierbabuena), 'croqueta-queso' (Croqueta de queso fundido), 'mandioca-frita' (Yuca frita crujiente con salsa).
- Pasteles de Feria: 'pastel-carne' (Pastel de carne sazonada), 'pastel-queso' (Pastel de queso fundido), 'pastel-pollo-queso' (Pastel de pollo con queso), 'pastel-pizza' (Pastel de pizza con orégano).
- Hamburguesas: 'cheeseburger-combo' (Menú Cheeseburger con patatas y refresco), 'cheeseburger-solo' (Solo hamburguesa artesanal).
- Tapas: 'calabresa-acebolada' (Calabresa salteada con cebolla y farofa de yuca).
- Açaí: 'acai-bowl-copacabana' (Açaí con plátano, fresas y granola), 'acai-bowl-pasion' (Açaí con maracuyá y frutas tropicales).
- Dulces & Churros: 'churros-vaso-dulce-leche' (Mini churros con dulce de leche), 'churros-grandes-rellenos' (Churros grandes con fruta y rellenos), 'cheesecake-maracuya' (Cheesecake artesanal de maracuyá), 'tarta-zanahoria-brigadeiro' (Tarta de zanahoria con cobertura de brigadeiro de chocolate), 'coxinha-brigadeiro-fresa' (Fresa envuelta en brigadeiro).
- Bebidas: 'caipirinha-clasica' (Caipirinha brasileña con cachaça y lima fresca), 'guarana-antarctica' (Refresco brasileño Guaraná Antarctica), 'cerveza-skol' (Cerveza brasileña helada).

Responde SIEMPRE con un objeto JSON válido con estas claves:
{
  "greeting": "Saludo inicial cálido y alegre con toque brasileño",
  "recommendationText": "Explicación apetitosa y culinaria de por qué estos platos son ideales para su gusto o ocasión (2-3 párrafos ágiles).",
  "pairingNote": "Sugerencia de bebida o maridaje perfecto (ej: Caipirinha clásica o Guaraná Antarctica frío).",
  "recommendedDishIds": ["id1", "id2", "id3"],
  "suggestedDrink": "Nombre de la bebida recomendada",
  "funFact": "Un dato curioso sobre la gastronomía brasileña o la tradición de las tapas en Brasil."
}
`;

  try {
    const ai = getAiClient();
    if (ai) {
      const prompt = `Consulta del cliente: "${query}". Ocasión: "${occasion}". Preferencias: ${JSON.stringify(preferences)}. Recomienda los mejores platos de la carta de YHAPE.`;
      
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Gemini API timeout')), 5000)
      );

      const apiPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const response = await Promise.race([apiPromise, timeoutPromise]);
      const text = response.text || '';
      try {
        const parsed = JSON.parse(text);
        return res.json({ success: true, data: parsed });
      } catch {
        // Fallback if parsing fails
      }
    }
  } catch (error: any) {
    console.error('Error invoking Gemini API in /api/ai/sommelier:', error);
  }

  // Graceful curated fallback in case API key is not yet set or model request fails
  const fallback = generateSmartFallback(query, occasion);
  return res.json({ success: true, data: fallback, isFallback: true });
});

function generateSmartFallback(query: string, occasion: string) {
  const q = query.toLowerCase();

  if (q.includes('dulce') || q.includes('postre') || q.includes('churro') || q.includes('tarta') || q.includes('chocolate')) {
    return {
      greeting: "¡Hola! Para los más golosos, en YHAPE tenemos auténticas joyas artesanales brasileñas.",
      recommendationText: "Te recomendamos empezar con nuestros **Mini Churros en vaso bañados en dulce de leche artesanal**: crujientes por fuera y con un interior suave e irresistible. Si buscas algo fresco y tropical, nuestro **Cheesecake artesanal de Maracuyá** equilibra a la perfección la acidez de la fruta de la pasión con una base cremosa inolvidable.",
      pairingNote: "Un zumo natural de maracuyá o un café expreso bien cremoso para contrastar el dulzor.",
      recommendedDishIds: ['churros-vaso-dulce-leche', 'cheesecake-maracuya', 'coxinha-brigadeiro-fresa'],
      suggestedDrink: "Zumo Natural Tropical de Maracuyá",
      funFact: "En Brasil el brigadeiro nació en los años 40 y es el dulce festivo nacional indiscutible de cualquier celebración."
    };
  }

  if (q.includes('bebida') || q.includes('maridaje') || q.includes('caipirinha') || q.includes('coctel') || q.includes('alcohol')) {
    return {
      greeting: "¡Saúde! La combinación de nuestras tapas con una bebida bien fría es la experiencia YHAPE completa.",
      recommendationText: "Nuestra auténtica **Caipirinha brasileña** hecha al momento con lima fresca y cachaça marida de forma excepcional con la **Calabresa Acebolada con Farofa** y con una ración de **Coxinhas de pollo cremoso**. La acidez cítrica de la lima limpia el paladar realzando el sabor ahumado y crujiente de las tapas.",
      pairingNote: "Caipirinha Clásica con lima y hielo frappé artesanal.",
      recommendedDishIds: ['coxinha-brasilena', 'calabresa-acebolada', 'kibe-brasileno'],
      suggestedDrink: "Caipirinha Clásica Brasileña",
      funFact: "La cachaça es el destilado de caña de azúcar más antiguo de América, destilado desde el siglo XVI en Brasil."
    };
  }

  if (q.includes('acai') || q.includes('açaí') || q.includes('saludable') || q.includes('fruta') || q.includes('ligero') || q.includes('vegano')) {
    return {
      greeting: "¡Energía pura del Amazonas! El açaí de YHAPE se sirve con textura cremosa y frutas recién cortadas.",
      recommendationText: "Te recomendamos el **Açaí Bowl Copacabana**: base 100% pulpa pura amazónica con rodajas de plátano, fresas silvestres de temporada, granola crujiente y toque de semillas de chía. Es súper antioxidante, saciante y refrescante para disfrutar en nuestra terraza.",
      pairingNote: "Agua de coco natural o zumo de mango con naranja.",
      recommendedDishIds: ['acai-bowl-copacabana', 'acai-bowl-pasion'],
      suggestedDrink: "Agua de Coco Fría",
      funFact: "El açaí es considerado un superalimento milenario recolectado a mano en las palmeras silvestres del Amazonas."
    };
  }

  if (q.includes('hambre') || q.includes('burger') || q.includes('hamburguesa') || q.includes('fuerte') || q.includes('contundente')) {
    return {
      greeting: "¡Para saciar un buen apetito! Nada supera una comida completa y jugosa.",
      recommendationText: "Pide el **Menú Cheeseburger Artesanal YHAPE**: carne de vacuno de primera hecha a la plancha con queso cheddar fundido, lechuga crujiente, tomate y nuestra mayonesa casera secreta, acompañada de generosa ración de patatas fritas doradas y bebida helada.",
      pairingNote: "Guaraná Antarctica bien frío con una rodaja de naranja o limón.",
      recommendedDishIds: ['cheeseburger-combo', 'mandioca-frita'],
      suggestedDrink: "Guaraná Antarctica Helado",
      funFact: "El pan de hamburguesa en Brasil suele tostarse ligeramente en la plancha con mantequilla para crear una capa selladora crocante."
    };
  }

  // Default: Picoteo variado estrella
  return {
    greeting: "¡Bem-vindo a YHAPE! Para una experiencia gastronómica perfecta en Calle La Nogalera:",
    recommendationText: "Te proponemos un trío insuperable: empieza con la emblemática **Coxinha Brasileña** de pollo cremoso recién frita; acompáñala con un crujiente **Pastel de Feria de Carne o Queso** fundido con ensalada vinagrete fresca, y completa la mesa con **Mandioca frita dorada**.",
    pairingNote: "Una Caipirinha tradicional con lima machacada o un Guaraná Antarctica con hielo.",
    recommendedDishIds: ['coxinha-brasilena', 'pastel-carne', 'mandioca-frita'],
    suggestedDrink: "Caipirinha Clásica o Cerveza Skol",
    funFact: "En los quioscos de São Paulo es un ritual dominguero pedir un 'pastel de feira' caliente acompañado de caldo de cana o guaraná."
  };
}

// Dev & Production serving
const startServer = async () => {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
