/* eslint react/prop-types: 0 */
'use client'
import React from 'react'
import PromptCard from './PromptCard'
import { useState,useEffect } from 'react'


const PromptCardList = ({data, handleClick})=>{
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
      <PromptCard 
        key={post._id}
        post={post}
        handleTagClick={()=>{handleClick(post.tag)}}
      />))}
    </div>
  )
}

const Feed = () => {
  const handleSearchText = async (e)=>{
    let newText = e.target.value
    setSearchText(newText)
    fetchAllPost(newText)
  }

  const handleTagClick=(tag)=>{
    setSearchText(tag)
    fetchAllPost(tag)
  }

  const fetchAllPost = async(value)=>{
    const response = await fetch('/api/prompt',{
      method:'POST',
      body:JSON.stringify({
          targetSearch:value
      }),
    })
    const data = await response.json()
    console.log(data)
    setPosts(data)
  }

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const fetchPost = ()=>{
      fetchAllPost('')
    }

    fetchPost()
  },[])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
        type='text'
        placeholder='Search for a tag or a username'
        onChange={handleSearchText}
        value={searchText}
        required
        className='search_input peer'/>
      </form>
      <PromptCardList data={posts} handleClick={handleTagClick}/>
    </section>
  )
}

export default Feed