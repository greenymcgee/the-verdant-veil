export async function sleep(time: number = 0) {
  await new Promise((resolve) => setTimeout(() => resolve(''), time))
}
