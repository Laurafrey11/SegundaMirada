import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getChatbotResponse(message: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: `Eres el asistente virtual de "Segunda Mirada", una plataforma de admisión médica para segundas opiniones en traumatología de mano y miembro superior.
        Tu objetivo es ayudar a los pacientes con dudas sobre el proceso de admisión, los planes de pago y la documentación necesaria.
        
        Información clave:
        - Planes: Social (ARS 0-100k, sujeto a verificación), Premium (ARS 150k / USD 150), Urgente (ARS 250k / USD 250).
        - Proceso: 4 pasos (Datos personales, Detalles médicos, Subir estudios, Pago).
        - Especialidad: Traumatología de mano y miembro superior.
        - Tiempos: Social (5 días), Premium (48-72h), Urgente (<24h).
        
        Responde de forma profesional, empática y concisa. Si no sabes algo, sugiere contactar al equipo técnico.`,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo más tarde.";
  }
}
