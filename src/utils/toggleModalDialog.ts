function handleDialogClose(dialog: HTMLDialogElement) {
  dialog.classList.remove('-translate-y-[50%]')
  return setTimeout(() => dialog.close(), 200)
}

function handleDialogOpen(dialog: HTMLDialogElement) {
  dialog.showModal()
  return setTimeout(() => dialog.classList.add('-translate-y-[50%]'))
}

export function toggleModalDialog(dialog: HTMLDialogElement | null) {
  if (!dialog) return

  if (dialog.open) return handleDialogClose(dialog)

  handleDialogOpen(dialog)
}
