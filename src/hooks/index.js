import axios from 'axios'
import { useState, useEffect } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        input: {
            type,
            value,
            onChange,
        },
        reset
    }
}

export const useResource = (baseUrl) => {
    let token = null
    const [resources, setResources] = useState([])

    useEffect(() => {
        const dataHook = async () => {
            axios.get(baseUrl).then(response => {
                setResources(response.data)
            })
        }

        dataHook()
    }, [baseUrl])

    const setToken = newToken => {
        token = `bearer ${ newToken }`
    }

    const create = async (newObject) => {
        const config = {
            headers: { Authorization: token },
        }

        const response = await axios.post(baseUrl, newObject, config)
        setResources(resources.concat(response.data))
    }

    const update = async (id, newObject) => {
        const response = await axios.put(`${baseUrl}/${id}`, newObject)
        setResources(resources.map(r => r.id === id ? response.data : r))
    }

    const remove = (id) => {
        const config = {
            headers: { Authorization: token }
        }

        axios.delete(`${baseUrl}/${id}`, config)
        setResources(resources.filter(r => r.id !== id))
    }
    return [
        resources,
        {
            setToken,
            create,
            update,
            remove
        }
    ]
}