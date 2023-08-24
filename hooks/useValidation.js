import { useState, useEffect } from 'react'
export default function useValidation (initialState, validate, fn) {

    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [submitForm, setSubmitForm] = useState(false)
    const [touchedFields, setTouchedFields] = useState({})

    useEffect(() => {

        if (submitForm) {

            const noErrors = Object.keys(errors).length === 0

            if (noErrors) {

                fn()

            }

            setSubmitForm(false)

        }

    }, [errors])

    const handleChange = e => {

        setValues({
            ...values,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = e => {

        e.preventDefault()

        const errorsValidation = validate(values)

        setErrors(errorsValidation)
        setSubmitForm(true)

    }

    const handleBlur = e => {

        const field = e.target.name
        const fieldErrors = validate({ ...values, [field]: e.target.value })
        setTouchedFields({ ...touchedFields, [field]: true })
        setErrors({ ...errors, [field]: fieldErrors[field] })

    }

    return {
        values,
        errors,
        touchedFields,
        handleChange,
        handleSubmit,
        handleBlur
    }

}
