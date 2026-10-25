import { useEffect, useRef } from 'react'
import { FaTimes } from 'react-icons/fa'
import { LeadForm } from './LeadForm'

type WarrantyRequestDialogProps = {
  open: boolean
  onClose: () => void
}

export const WarrantyRequestDialog = ({ open, onClose }: WarrantyRequestDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return <dialog
    ref={dialogRef}
    className="vehicle-quote-dialog"
    aria-labelledby="warranty-request-dialog-title"
    onClose={onClose}
    onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
  >
    <div className="vehicle-quote-dialog__header">
      <div className="min-w-0"><h2 id="warranty-request-dialog-title">Ask About Warranty Coverage</h2></div>
      <button type="button" className="vehicle-quote-dialog__close" aria-label="Close message form" onClick={onClose}><FaTimes aria-hidden="true" /></button>
    </div>
    <div className="vehicle-quote-dialog__body">
      <p className="vehicle-quote-dialog__intro">Tell us which vehicle you’re interested in and our team will help with its warranty coverage.</p>
      <LeadForm
        title="Send Warranty Request"
        variant="vehicle-inline"
        className="vehicle-inquiry-form"
        phonePlaceholder="(978) 555-1234"
        messagePlaceholder="How can we help you?"
      />
    </div>
  </dialog>
}
