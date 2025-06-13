import { Button, Modal } from "react-bootstrap";
import './ModelComponent.css'
interface ModelProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    body: string;
    close: string;
    confirm: string;
    closeStyle?: string;
    confirmStyle?: string;
}
function ModelComponent({show, onClose, onConfirm, body, title, close, confirm, closeStyle = '', confirmStyle= ''} : ModelProps) {
  return (
    <Modal show={show} onHide={onClose} centered dialogClassName="alert-modal" backdropClassName="modal-backdrop-blur">
      <Modal.Header  className="border-0 p-0 m-auto pb-3">
        {title && <Modal.Title className="fs-3 fw-bold">{title}</Modal.Title>}
      </Modal.Header>
      <Modal.Body className="text-center fw-semibold p-0">{body}</Modal.Body>
      <Modal.Footer className="border-0 justify-content-center p-0">
      <Button className={`${confirmStyle} border-0 rounded-4px fw-medium fs-2 m-0`} onClick={onConfirm}>
          {confirm}
        </Button>
        <Button variant="secondary" onClick={onClose} className={`border-0 rounded-4px fw-medium fs-2 m-0 ${closeStyle}`}>
          {close}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModelComponent
