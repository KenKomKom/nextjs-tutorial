'use client'
import { useEffect } from 'react'
import Link from 'next/link'

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  let priorPrompt = ''
  let priorTag = ''


  return (
    <section className='w-full max-w-full flex-start flex-col '>
      <h1 className='head_text text-left'><span className='blue_gradient'>{type} Post</span></h1>
      <p className='desc text-left max-w-md'>{type} and share amazing prompts with the world!</p>

      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
      <label>
        <span className='font-satoshi font-semibold'>Your Prompt</span>
      </label>
      <textarea 
        value={post.prompt} 
        onChange={(e)=>{setPost({...post,prompt:e.target.value})}} 
        placeholder='Write your prompt'
        required 
        className='form_textarea' />

      <label>
        <span className='font-satoshi font-semibold'>Your Tag</span>
      </label>
      <input 
        value={post.tag} 
        onChange={(e)=>{setPost({...post,tag:e.target.value})}} 
        placeholder='#tag' 
        required 
        className='form_input' />
      <div className='flex-end x-3 mb-5 gap-4'>
      <Link href='/' className='text-gray-500 text-sm'>
      Cancel
      </Link>
      <button type='submit' disabled={submitting} className='px-5 py-1.5 bg-primary-orange rounded-full text-white'>
        {type} Prompt
      </button>
      </div>
        
      </form>
    </section>

    )
}

export default Form