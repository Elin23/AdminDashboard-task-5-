import type { ReactNode } from 'react';
import './ButtonComponent.css'
type CustomButtonProps = {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' ;
  className?: string;
  label?: string;
  onClickEvent?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset'; 
} 

function ButtonComponent({ children, variant = 'primary', className='', onClickEvent, label='', type = 'button' }: CustomButtonProps) {
  const variantClass = {
    primary: 'btn bg-primary-color',
    secondary: 'btn btn-secondary',
    danger: 'btn btn-danger',
  }[variant];

  return (
    <button className={`button-component rounded-4px text-light ${variantClass} ${className ?? ''}`} onClick={onClickEvent} type={type}>
        {label}
      {children}
    </button>
  );
}

export default ButtonComponent;
