export enum ExpectedErrors {
    LIMIT_SUBSCRIPTION = "limit_subscription",
    INSUFICIENT_TOKENS = "insuficient_tokens",
    EMAIL_EXIST = "email_exist"
}

export function isExpectedError(error: string): boolean {
    // Recorre los valores del enum y verifica si el error coincide con alguno
    for (const value of Object.values(ExpectedErrors)) {
        if (error === value) {
            return true; // Si coincide, retorna true
        }
    }
    return false; // Si no coincide con ninguno, retorna false
}