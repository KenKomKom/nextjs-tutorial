import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({name, handleDelete, handleEdit, posts}) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
      <span className='blue_gradient'>
        {name} Profile
      </span>
      </h1>
      
      <div className='mt-16 prompt_layout'>
        {posts.map((post)=>(
        <PromptCard 
          key={post._id}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />))}
      </div>
    </section>
  )
}

export default Profile