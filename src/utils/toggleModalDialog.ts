function handleDialogClose(dialog: HTMLDialogElement, shouldAnimate: boolean) {
  if (shouldAnimate) {
    dialog.classList.remove('-translate-y-[50%]')
    return setTimeout(() => dialog.close(), 200)
  }

  return dialog.close()
}

function handleDialogOpen(dialog: HTMLDialogElement, shouldAnimate: boolean) {
  dialog.showModal()
  if (!shouldAnimate) return

  setTimeout(() => dialog.classList.add('-translate-y-[50%]'))
}

export function toggleModalDialog(
  dialog: HTMLDialogElement | null,
  shouldAnimate: boolean,
) {
  if (!dialog) return

  if (dialog.open) return handleDialogClose(dialog, shouldAnimate)

  handleDialogOpen(dialog, shouldAnimate)
}
