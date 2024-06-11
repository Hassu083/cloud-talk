 'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface SessionData {
    provider: string;
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_url: string;
    client_url: string;
    universe_domain: string;
}

const SessionForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SessionData>()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const onSubmit = async (data: SessionData) => {
        let body: FormData | object

        if (selectedFile) {
            const reader = new FileReader()
            reader.onload = (event) => {
                if (event.target?.result) {
                    const jsonData = JSON.parse(event?.target.result as string)
                    body = { ...jsonData }
                    console.log(body);
                    console.log(1);
                    submitData(body)
                }
            }
            reader.readAsText(selectedFile)
        } else {
            body = data;
            console.log(body);
            console.log(2);
            submitData(body)
        }
    }
    const submitData = async (data: object) => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_SESSION_URL || 'http://127.0.0.1:8000/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error(`Error submitting session data: ${response.statusText}`)
            }
            else{
                console.log(response.body);
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = event.target.files?.[0]
        setSelectedFile(file)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center gap-2'> 
            {/* <div className="mb-4">
                <label htmlFor="provider" className="form-label block mb-2 text-gray-700">
                    Provider
                </label>
                <input
                    type="text"
                    id="provider"
                    {...register('provider', { required: true })}
                    className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:border-blue-600 focus:outline-none ${errors.provider ? 'border-red-500' : ''
                        }`}
                />
                {errors.provider && <p className="text-red-500 text-xs mt-1">Provider is required.</p>}
            </div> */}

            <div className="">
                <label
                    htmlFor="jsonFile"
                    className="form-label text-gray-700 text-[10px] cursor-pointer border-[1px] border-black rounded-md p-1 w-[90px] flex justify-center"
                >
                    {/* Upload JSON File (or fill the form) */}
                    Upload a JSON.
                </label>
                <input
                    type="file"
                    id="jsonFile"
                    name="jsonFile"
                    accept=".json"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
            <button
                type="submit"
                className=" hover:bg-black hover:text-white border-[1px] border-black rounded-md p-1 h-[25px] flex justify-center items-center"
            >✓</button>
            {selectedFile && <p className="text-gray-500 text-[10px]">Selected file: {selectedFile.name}</p>}
        </form>

    )
}

export default SessionForm