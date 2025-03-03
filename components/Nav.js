'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'

const Nav = () => {
    const {data:session} = useSession()
    
    const [providers, setProvider] = useState(null);
    const[toggleDropdown, setToggleDropDown] = useState(false);
    
    useEffect(()=>{
        const setUpProvider = async ()=>{
            const response = await getProviders()
            setProvider(response)
        }
        
        setUpProvider()
    }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
            <Image src='/assets/image/logo.svg' width={30} height={30}className='object-contain'/>
            <p className='logo_text'>Prompto</p>
        </Link>

        <div className=' sm:flex hidden'>
            {session?.user ?(
                <div className='flex gap-3 md:gap-5'>
                    <Link href="/create-prompt" className='black_btn'>Create Post</Link>
                    <button type='button' onClick={signOut} className='outline_btn'>
                        SignOut
                    </button>
                    <Link href="/profile"><Image src={session?.user.image} width={32} height={32}></Image></Link>
                </div>
            )
                :(
                <>
                {providers && Object.values(providers).map((provider)=>(
                    <button type='button' key={provider.name} onClick={()=>signIn(provider.id)}className='black_btn'>
                        Sign In
                    </button>
                ))}
                </>
            )}
        </div>


        <div className='sm:hidden flex relative'>
            {session?.user ?(
                <div className='flex'>
                    <Image src="/" width={32} height={32} onClick={()=>setToggleDropDown((prev)=>(!prev))}></Image>
                    {toggleDropdown && (
                    <div className='dropdown'>
                        <Link href="/profile" className='dropdown_link' onClick={()=>setToggleDropDown(false)}>
                        My Profile
                        </Link>
                        <Link href="/create-prompt" className='dropdown_link' onClick={()=>{setToggleDropDown(false);}}>
                        Create Prompt
                        </Link>
                        <button onClick={()=>{setToggleDropDown(false); signOut()}} type="button" className='mt-5 w-full black_btn'>
                            SignOut
                        </button>
                    </div>
                    )}
                </div>
            )
            :
            (
                <>
                {providers && Object.values(providers).map((provider)=>(
                    <button type='button' key={provider.name} onClick={()=>signIn(provider.id)}className='black_btn'>
                        Sign In
                    </button>
                ))}
                </>
            )}

        </div>
    </nav>
  )
}

export default Nav