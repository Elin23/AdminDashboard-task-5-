import Form from 'react-bootstrap/Form';
import './AuthInput.css'

type AuthInputProps = {
    label?: string;
    className: string;
    placeholder: string;
    value: string;
    type: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    error?: string;
    controlId: string;
}
function AuthInput({ label, className, placeholder, type, value, onChange, required = false, error, controlId }: AuthInputProps) {
    return (
        <Form.Group className={`${className}`} controlId={controlId}>
            <Form.Label className='input-field-label fw-medium fs-14 color-gray-01'>{label}</Form.Label>
            <Form.Control className='input-field fs-12 rounded-4px' type={type} placeholder={placeholder} value={value} required={required} onChange={onChange} isInvalid={!!error} />
            {/* note: the (!!) are used to convert a value to a boolean (true or false)*/}
            {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
        </Form.Group>
    )
}

export default AuthInput
