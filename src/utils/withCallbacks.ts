type Callbacks<Result> = {
  onError?: (result: Result) => Promise<void>
  onSuccess?: (result: Result) => Promise<void>
}

export function withCallbacks<
  Args extends unknown[],
  State extends ActionState,
>(
  serverAction: (...args: Args) => Promise<State>,
  callbacks: Callbacks<State>,
): (...args: Args) => Promise<State> {
  return async (...args: Args) => {
    const promise = serverAction(...args)
    const result = await promise

    if (result?.status === 'success') await callbacks.onSuccess?.(result)

    if (result?.status === 'failure') await callbacks.onError?.(result)

    return promise
  }
}
