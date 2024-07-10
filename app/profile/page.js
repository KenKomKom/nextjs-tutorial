'use client'

import Profile from '@/components/Profile'
import PromptCard from '@/components/PromptCard'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const page = () => {
    const {data:session} = useSession()
    const router = useRouter()

    const [posts, setPosts] = useState([])

    useEffect(()=>{
        const fetchPost = ()=>{
            fetchAllPost()
        }

        if(session?.user.id) {
            fetchPost()
        }
    },[])
    
    const fetchAllPost = async()=>{
        const response = await fetch(`/api/user/${session?.user.id}/posts`,{
            method:'GET'
        })
        const data = await response.json()
        
        setPosts(data)
    }
    
    const handle_delete = async (post)=>{
        const hasConfirm = confirm("Are you sure about deleting this prompt?")
        if (hasConfirm){
            try {
                await fetch(`api/prompt/${post._id.toString()}`, {
                    method:"DELETE"
                })
                const filteredPosts = posts.filter((p)=>p._id!=post._id)
                setPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }
        
        router.push(`/profile`)
    }

    const handle_edit = (post)=>{
        console.log("edit click")
        router.push(`/edit-prompt?id=${post._id}`)
    }

    return (
        <Profile
        name={session?.user.id}
        handleDelete={handle_delete}
        handleEdit={handle_edit}
        posts={posts}
        />
    )
}

export default page