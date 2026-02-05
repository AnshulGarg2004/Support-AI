'use client'
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const HomeClient = ({ email }: { email: string }) => {
    const handleLogin = () => {
        setLoading(true);
        window.location.href = '/api/auth/login'
    }



    const features = [
        {
            title : "Plug & Play",
            desc : "Add the chatbot tp your sitte with a single script tag."
        },
        {
            title : "Admin Controlled",
            desc : "You control exactly what the AI knows and answers."
        },
        {
            title : "Always Online",
            desc : "Your customers get instant support 24/7."
        },
    ]

    const popUpRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (popUpRef.current && !popUpRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        }
    }, [])

    const handleLogout = async () => {
        try {
            const response = await axios.get('/api/auth/logout');
            window.location.href = '/'
            console.log("Response in logging out: ", response);
            
        } catch (error) {
            console.log("Error in logging out: ", error);
            return;
        }
    }

    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className='min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden' >
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'>
                <div className='flex justify-between max-w-7xl mx-auto px-6 h-16 items-center'>
                    <div className='text-lg font-semibold tracking-tight'>Support
                        <span className='text-zinc-300'>AI</span>
                    </div>
                    {email ? (
                        <div className=' relative' ref={popUpRef}>
                            <button onClick={() => setIsOpen(!isOpen)} className='text-white bg-black p-2 rounded-full w-10 h-10 flex items-center justify-center font-semibold hover:scale-105 transition'>
                                {email[0].toUpperCase()}
                            </button>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        className='absolute w-44 right-0 mt-3 bg-white shadow-xl border border-zinc-200 overflow-hidden rounded-xl'>
                                        <button className='w-full text-left px-4 py-3 text-sm hover:bg-zinc-100'
                                        onClick={() => {
                                            router.push('/dashboard')
                                        }}
                                        >Dashboard</button>
                                        <button onClick={handleLogout} className='block px-4 py-3 text-sm text-red-600 hover:bg-zinc-100'>Log Out</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.button disabled={loading} onClick={handleLogin} className='px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2'>
                            {loading ? (
                                <>
                                <Loader2 className='w-4 h-4 animate-spin' />Loading...
                                </>
                            ) : "Login"}
                        </motion.button>
                    )}
                </div>
            </motion.div>

            <section className='pt-36 pb-28 px-6'>
                <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className='text-4xl md:text-5xl font-semibold leading-tight'>AI Customer Suppot <br />
                            Built for Mordern Websites</h1>

                        <p className='mt-6 text-lg text-zinc-600 max-w-xl'>Add a powerful AI chatbot to your website in minutes. Let your customer get instant asnwers using your own buisness knowledge </p>
                        <div className='flex mt-10 gap-4'>
                            {email ? (
                                <button className='px-7 py-3 flex gap-4 bg-black text-white rounded-xl font-medium hover:bg-zinc-800 transition disabled:opacity-60'
                                onClick={() => {
                                    router.push('/dashboard')
                                }}
                                >Go to Dashboard</button>
                            
                            ) : (
                                <button onClick={() => {}} className='px-7 py-3 flex gap-4 bg-black text-white rounded-xl font-medium hover:bg-zinc-800 transition disabled:opacity-60'>Get Started</button>
                            
                            )}
                            <a href='#features' className='px-7 py-3 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition'>Learn More</a>
                        </div>
                    </motion.div>

                    <motion.div className='relative'
                    initial={{opacity : 0, scale : 0.95}}
                    animate ={{opacity : 1, scale  : 1}}
                    transition={{duration : 0.7, delay : 0.2}}
                    >
                        <div className='rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6'>
                            <div className='text-sm text-zinc-500 mb-3'>Live chat prview</div>
                            <div className='space-y-3 '>
                                <div className='bg-black w-fit text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit'>
                                    Do you Offer cash on delivery
                                 </div>
                                <div  className='bg-zinc-100 rounded-lg px-4 w-fit  py-2 text-sm' >Yes, Cash on delivery available.</div>
                            <motion.div
                            animate={{y : [0, -12, 0]}}
                            transition={{repeat : Infinity, duration: 3}}
                            className=' absolute -bottom-6 -right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-xl'
                            >
                            🗨️
                            </motion.div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </section>

            <section id='features' className='bg-zinc-50 py-28 px-6 border-t border-zinc-200'>
                            <div className='max-w-6xl mx-auto'>
                            <motion.h2
                            initial={{y : 20, opacity : 0}}
                            whileInView={{opacity : 1, y : 0}}
                            viewport={{once : false}}
                            transition={{duration : 0.5}}
                            className='text-3xl font-semibold text-center'>
                                My Buisness Choose SupportAI
                            </motion.h2>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-16'>
                            {features.map((feat, index) => (
                                <motion.div key={index}
                                initial={{opacity : 0, y : 30}} 
                                animate={{opacity : 1, y : 0}}
                                transition={{delay : index * 0.1}}
                                viewport={{once : false}}
                                className='bg-white rounded-2xl p-8 shadow-lg border border-zinc-200'>
                                    <h1 className='text-lg font-medium'>{feat.title}</h1>
                                    <p className='mt-3 text-zinc-600 text-sm'>{feat.desc}</p>
                                </motion.div>
                            ))}
                            </div>
                            </div>
            </section>

            <footer className='py-10 text-center text-sm text-zinc-500'>
                &copy; {new Date().getFullYear()} SupportAI. All rights reserved. 
            </footer>
        </div>
    )
}

export default HomeClient
