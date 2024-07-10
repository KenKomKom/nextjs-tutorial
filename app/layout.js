/* eslint-disable react/prop-types */
import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'

import React from 'react'

export const metadata={
    title:"Prompto",
    description:"Share AI prompts"
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <Nav/>
                <div className='main'>
                    <div className='gradient'></div>
                </div>
                <main className='app'>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout