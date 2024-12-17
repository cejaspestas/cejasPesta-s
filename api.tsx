"use server";
import { MercadoPagoConfig, Preference } from "mercadopago";
/*/*https://7ntbjpbw-3000.use2.devtunnels.ms/sorteos?collection_id=96117181159&collection_status=approved&payment_id=96117181159&status=approved&external_reference=null&payment_type=debit_card&merchant_order_id=26174147297&preference_id=1896866819-e0a9abdf-6312-4d55-b1fc-9cc29f769e67&site_id=MCO&processing_mode=aggregator&merchant_account_id=null*/  
interface Props {
  id: string;
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
          success: "https://cejaspestaniascolombia.vercel.app/sorteos",
          failure: "https://cejaspestaniascolombia.vercel.app/",
          pending: "https://cejaspestaniascolombia.vercel.app/",
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
