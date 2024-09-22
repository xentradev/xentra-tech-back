export function getDifferenceInSeconds(createdAt: Date, updatedAt: Date): number {
    const differenceInMillis = updatedAt.getTime() - createdAt.getTime();
    const differenceInSeconds = differenceInMillis / 1000;
    return differenceInSeconds;
  }