interface Options {
  animationDuration?: number
}

interface DefaultOptions {
  animationDuration: NonNullable<Options['animationDuration']>
}

const DEFAULT_OPTIONS: DefaultOptions = {
  animationDuration: 200,
}

function handleDialogClose(
  dialog: HTMLDialogElement,
  toggleExpanded: VoidFunction,
  options: Options,
) {
  const { animationDuration } = { ...DEFAULT_OPTIONS, ...options }
  toggleExpanded()
  return new Promise((resolve) => {
    setTimeout(() => resolve(dialog.close()), animationDuration)
  })
}

async function handleDialogOpen(
  dialog: HTMLDialogElement,
  toggleExpanded: VoidFunction,
) {
  dialog.showModal()
  return await new Promise((resolve) => {
    setTimeout(() => resolve(toggleExpanded()))
  })
}

export async function toggleDialog(
  dialog: HTMLDialogElement | null,
  toggleExpanded: VoidFunction,
  options: Options = DEFAULT_OPTIONS,
) {
  if (!dialog) return

  if (dialog.open)
    return await handleDialogClose(dialog, toggleExpanded, options)

  return await handleDialogOpen(dialog, toggleExpanded)
}
