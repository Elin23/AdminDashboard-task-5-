import type React from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import './SearchBar.css'
type SearchBarProps = {
    onSearch: (value: string) => void;
};

function SearchBar({onSearch}: SearchBarProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        onSearch(event.target.value);
    }
    return (
        <Form className='search-form mx-auto p-0'>
            <InputGroup className='w-100'>
                <FormControl type="search"
                    placeholder="Search product by name"
                    onChange={handleChange}
                    className='border-end-0' />
                <Button variant='transparent' className='bg-transparent border border-start-0'>
                    <img src="/AdminDashboard-task-5-/assets/icons/search.png" alt="search" />
                </Button>
            </InputGroup>
        </Form>
    )
}

export default SearchBar
