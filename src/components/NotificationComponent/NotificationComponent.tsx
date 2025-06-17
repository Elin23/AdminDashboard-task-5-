import Modal from 'react-bootstrap/Modal';

type NotificationProps = {
  label: string;
  description?: string;
  show: boolean;
  onClose: () => void;
};

function NotificationComponent({ label, description, show, onClose }: NotificationProps) {
  return (
    <Modal show={show} onHide={onClose} centered backdrop="static" keyboard={false} aria-labelledby="notification-modal" 
           contentClassName="border-0 rounded-4 shadow-sm p-3"
           dialogClassName="my-0">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title id="notification-modal" className="fs-4 fw-semibold text-success">
          {label}
        </Modal.Title>
      </Modal.Header>
      {description && (
        <Modal.Body className="py-2 fs-6 text-secondary ">
          {description}
        </Modal.Body>
      )}
    </Modal>
  );
}

export default NotificationComponent;
