export function toggleModalDialog(dialog: HTMLDialogElement | null) {
  if (!dialog) return

  if (dialog.open) {
    dialog.classList.add('translate-y-full')
    return setTimeout(() => dialog.close(), 200)
  }

  dialog.showModal()
  setTimeout(() => dialog.classList.remove('translate-y-full'))
}
