import { Modal } from "react-bootstrap";
import './ModelComponent.css'
import ButtonComponent from "../ButtonComponent/ButtonComponent";
interface ModelProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    body: React.ReactNode;
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
      <Modal.Footer className="btns-container border-0 justify-content-center p-0">
        <ButtonComponent  label={confirm} variant="danger" className={`${confirmStyle} border-0 rounded-4px fw-medium fs-2 m-0`} onClickEvent={onConfirm}/>
        <ButtonComponent  label={close} className={`border-0 rounded-4px fw-medium fs-2 m-0 ${closeStyle}`} onClickEvent={onClose}/>
      </Modal.Footer>
    </Modal>
  )
}

export default ModelComponent
