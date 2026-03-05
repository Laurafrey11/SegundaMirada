import express from "express";
import { createServer as createViteServer } from "vite";
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/checkout", async (req, res) => {
    const client = new MercadoPagoConfig({ 
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '' 
    });

    try {
      const { title, unit_price, quantity = 1, admission_id } = req.body;

      const preference = new Preference(client);

      const result = await preference.create({
        body: {
          items: [
            {
              id: 'plan_segunda_mirada',
              title: title || 'Segunda Mirada - Consulta Medica',
              quantity: Number(quantity),
              unit_price: Number(unit_price),
              currency_id: 'ARS',
            }
          ],
          back_urls: {
            success: `${req.headers.origin}/admission?status=success`,
            failure: `${req.headers.origin}/admission?status=failure`,
            pending: `${req.headers.origin}/admission?status=pending`
          },
          auto_return: 'approved',
          external_reference: admission_id,
        }
      });

      res.status(200).json({ id: result.id, init_point: result.init_point });
    } catch (error) {
      console.error('Error creating MercadoPago preference', error);
      res.status(500).json({ error: 'Error al crear la preferencia de pago' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
