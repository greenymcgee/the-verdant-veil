export function toggleModalDialog(dialog: HTMLDialogElement | null) {
  if (!dialog) return

  if (dialog.open) {
    dialog.classList.remove('-translate-y-[50%]')
    return setTimeout(() => dialog.close(), 200)
  }

  dialog.showModal()
  setTimeout(() => dialog.classList.add('-translate-y-[50%]'))
}
