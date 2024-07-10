'use client'
import Form from '@/components/Form'
import { useState,useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { get } from 'mongoose'

const EditPrompt = () => {
    const router = useRouter()
    let {data: session} = useSession()
    const [submitting, setSubmiting]=useState(false);
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    })

    const params = useSearchParams()
    const postId = params.get("id")

    useEffect(()=>{
        const getPromptToEdit = async ()=>{
            console.log("zczc postId", postId)
            const response = await fetch(`/api/prompt/${postId}`,{
                method:'GET'
            })
            const data = await response.json()
            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
        }

        if (postId) getPromptToEdit()
    }, [postId])

    const editPrompt = async (e)=>{
        e.preventDefault()
        setSubmiting(true)

        try {
            const response = await fetch(`/api/prompt/${postId}`,{
                method:'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    userId:session?.user.id,
                    tag:post.tag
                }),
            })

            if (response.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            setSubmiting(false);
        }
    }

    return (
    <Form 
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={editPrompt}
    />
    )
}

export default EditPrompt