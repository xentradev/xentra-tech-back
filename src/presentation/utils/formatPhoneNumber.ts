export default function formatPhoneNumber(phoneNumber: string) {
  const phoneNumerTmp = phoneNumber
    // Verifica si el número es de Argentina y móvil
    if (phoneNumerTmp.startsWith("549")) {
      // Agrega el 9 después del código de país (54)
      return phoneNumerTmp.replace("549", "54");
    }
    return phoneNumerTmp;
  }