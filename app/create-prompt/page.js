'use client'
import Form from '@/components/Form'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const CreatePrompt = () => {
    const router = useRouter()
    let {data: session} = useSession()

    const createPrompt = async (e)=>{
        e.preventDefault()
        setSubmiting(true)

        try {
            const response = await fetch('/api/prompt/new',{
                method:'POST',
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

    const [submitting, setSubmiting]=useState(false);
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    })
    return (
    <Form 
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
    )
}

export default CreatePrompt