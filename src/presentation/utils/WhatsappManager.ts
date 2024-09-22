import axios from "axios";
import formatPhoneNumber from "./formatPhoneNumber";

const sendMessage = async ({to, text, phoneNumId, accessToken}: {to: string, text: string, phoneNumId: string, accessToken: string}) => {
  try {
    const formattedTo = formatPhoneNumber(to);
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v16.0/${phoneNumId}/messages`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        messaging_product: "whatsapp",
        to: formattedTo,
        text: { body: text },
      },
    });
  } catch (error: any) {
    console.error(
      "Error al enviar el mensaje:",
      error.response ? error.response.data : error.message
    );
  }
};

const WhastappManager = { sendMessage };

export default WhastappManager;
