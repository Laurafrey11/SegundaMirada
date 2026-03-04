import { MercadoPagoConfig, Preference } from 'mercadopago';

// Esta función se ejecuta en el servidor de Vercel. NO en el frontend.
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Obtenemos el token desde las variables de Vercel (seguro)
    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });

    try {
        const { title, unit_price, quantity = 1 } = req.body;

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
            }
        });

        return res.status(200).json({ id: result.id, init_point: result.init_point });
    } catch (error) {
        console.error('Error creating MercadoPago preference', error);
        return res.status(500).json({ error: 'Error al crear la preferencia de pago' });
    }
}
