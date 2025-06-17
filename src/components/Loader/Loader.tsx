import Spinner from 'react-bootstrap/Spinner';

type LoaderProps = {
  size?: 'sm' | 'lg';
  message?: string;
};

function Loader({ size = 'lg', message }: LoaderProps) {
  return (
    <div className="position-absolute top-0 start-0 w-100 h-100 bg-white d-flex flex-column justify-content-center align-items-center z-2">
      <Spinner animation="grow" className='bg-primary-color' size={size === 'sm' ? 'sm' : undefined} />
      {message && <div className="mt-2 text-muted">{message}</div>}
    </div>
  );
}

export default Loader;
