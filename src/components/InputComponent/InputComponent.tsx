import Form from 'react-bootstrap/Form';
import './InputComponent.css'

type InputProps = {
    label?: string;
    className: string;
    placeholder: string;
    value: string;
    type: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    error?: string;
    controlId: string;
    fontSize: string;
}
function InputComponent({ label, className, placeholder, type, value, onChange, required = false, error, controlId, fontSize }: InputProps) {
    return (
        <Form.Group className={`${className}`} controlId={controlId}>
            <Form.Label className={`input-field-label fw-medium color-gray-01 ${fontSize}`}>{label}</Form.Label>
            <Form.Control className='input-field fs-12 rounded-4px' type={type} placeholder={placeholder} value={value} required={required} onChange={onChange} isInvalid={!!error} />
            {/* note: the (!!) are used to convert a value to a boolean (true or false)*/}
            {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
        </Form.Group>
    )
}

export default InputComponent
