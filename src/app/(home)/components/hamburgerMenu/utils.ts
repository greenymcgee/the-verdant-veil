export function toggleDialogOpen(dialog: HTMLDialogElement | null) {
  if (!dialog) return

  if (dialog.open) {
    dialog.classList.add('translate-x-full')
    return setTimeout(() => dialog.close(), 100)
  }

  dialog.showModal()
  setTimeout(() => dialog.classList.remove('translate-x-full'))
}
