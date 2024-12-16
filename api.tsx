"use server";
import { MercadoPagoConfig, Preference } from "mercadopago";

interface Props {
  id: number;
  fecha: string;  // Cambié esto a string, ya que la fecha debería ser un string ISO
  title: string;
  priceBoleto: string;
  numerosEscogidos: number;
}

// Configuración del cliente de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN as string,
});

export async function mercadoPago(object: Props) {
  try {
    const data = {
      id: String(object.id),
      title : String(object.title),
      quantity : object.numerosEscogidos,
      unit_price: Number(object.priceBoleto),
      currency_id: "COP",
    }
    const preference = await new Preference(client).create({
      body: {
        items: [
          data
        ],
        back_urls: {
          success: "https://7ntbjpbw-3000.use2.devtunnels.ms/",
          failure: "https://7ntbjpbw-3000.use2.devtunnels.ms/",
          pending: "https://tu-sitio.com/pending",
        },
        auto_return: "approved",
      },
    });

    // Verifica que la preferencia haya sido creada correctamente
    if (!preference.init_point) {
      throw new Error('No se pudo obtener la URL de pago');
    }

    // Redirige a la URL de pago
    return preference.init_point;
  } catch (error) {
    const errormessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error al crear la preferencia de Mercado Pago:", errormessage);
    throw new Error("Hubo un error al procesar el pago.");
  }
}
