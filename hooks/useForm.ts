import {useState} from 'react'

export const useForm = <T extends Object> ( initialForms: T) => {
    const [form, setForms] = useState(initialForms);

    const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = event.target;

        setForms({
            ...form,
            [name]: value
        })
    }

    const resetForms = () => {
        setForms(initialForms)
    }

    return {
        ...form, 
        handleChange, 
        resetForms
    }
}