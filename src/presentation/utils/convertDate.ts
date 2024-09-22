import { parse, format } from "date-fns";
import logger from "./logger";

export function convertDate(dateString: string): string {
  try {
    // Parsear la fecha en formato DD/MM/YYYY
    const parsedDate = parse(dateString, "MM/dd/yyyy", new Date());

    // Verificar si la fecha es válida
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Fecha no válida");
    }

    // Formatear la fecha en formato YYYY-MM-DD
    const formattedDate = format(parsedDate, "yyyy-MM-dd");

    return formattedDate;
  } catch (error) {
    logger.error("Error al convertir la fecha:", error);
    return "";
  }
}
