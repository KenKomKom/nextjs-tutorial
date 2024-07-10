import React from 'react'
import Feed from '@/components/Feed'
const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'> Discover and Share</h1>
        <br className='max-md:hidden'></br>
        <span className='orange_gradient text-center'>AI-POWERED PROMPTS</span>
        <p>Lorem Ipsum Doloris Sit Amet</p>

        <Feed/>
    </section>
  )
}

export default Home