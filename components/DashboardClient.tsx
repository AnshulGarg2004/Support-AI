'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import {Loader2} from 'lucide-react'
import axios from 'axios'

const DashboardClient = ({ ownerId }: { ownerId: string }) => {
    const router = useRouter();

    const [buisnessTitle, setBusinessTitle] = useState<string>('');
    const [supportEmail,  setSupportEmail] = useState<string>('');
    const [knowledge, setKnowledge] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [saved, Setsaved] = useState<boolean>(false);

    const handleSettings = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/settings', {ownerId, buisnessTitle, supportEmail, knowledge});
            console.log("Result got from api/settings: ", result);
            Setsaved(true);
            setTimeout(() => Setsaved(false), 3000);
            
        } catch (error) {
            console.log("error in posting req to api/sett: ", error);
            
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const handleSettignsDetails = async () => {
            try {
                const result = await axios.post('/api/settings/get', {ownerId});
                console.log("result of api/set/get: ", result);

                setBusinessTitle(result.data.settings.buisnessTitle);
                setKnowledge(result.data.settings.knowledge);
                setSupportEmail(result.data.settings.supportEmail);
            } catch (error) {
                console.log('error in seding det tp api/s/g: ', error);
            }
            
        }

        handleSettignsDetails();
    }, [ownerId])

    return (
        <div className='min-h-screen bg-zinc-50 text-zinc-900'>
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'>
                <div className='flex justify-between max-w-7xl mx-auto px-6 h-16 items-center cursor-pointer'>
                    <div onClick={() => {
                        router.push('/')
                    }} className='text-lg font-semibold tracking-tight'>Support
                        <span className='text-zinc-300'>AI</span>
                    </div>

                    <button className='px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition cursor-pointer' 
                    onClick={() => {router.push('/embeded')}}>
                        Embed Chatbot
                    </button>

                </div>
            </motion.div>

            <div className='px-4 py-14 flex justify-center'>
                <motion.div
                    className='w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 mt-20'
                >
                    <div className='mb-10'>
                        <h1 className='text-2xl font-semibold'>ChatBot Settings</h1>
                        <p className='text-zinc-500 mt-1'>Manage your AI chatbot knowledge and business details</p>
                    </div>

                    <div className="mb-10">
                        <h1 className='text-lg font-medium mb-4'>Business Details</h1>
                        <div className='space-y-4'>
                            <input type="text" value={buisnessTitle} onChange={(e) => setBusinessTitle(e.target.value)} className='w-full text-sm border rounded-xl border-zinc-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/80' placeholder='Business Name' />
                            <input type="text" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} className='w-full text-sm border rounded-xl border-zinc-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/80' placeholder='Suppot Email' />
                        </div>
                    </div>
                    <div className="mb-10">
                        <h1 className='text-lg font-medium mb-4'>Knowledge</h1>
                        <p className='text-sm text-zinc-500 mb-4'>Add FAQs, policies, delivery info, refunds, etc.</p>
                        <div className='space-y-4'>
                            <textarea value={knowledge} onChange={(e) => setKnowledge(e.target.value)} className='w-full text-sm border rounded-xl border-zinc-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/80' rows={8} placeholder={`• Refund Policy: 7 days return available
• Delivery Time: 3-5 working days
• Payment: Cash on Delivery available
• Support Hours: Mon-Fri 9AM-6PM IST
• Warranty: 1 year manufacturer warranty`} />
                        </div>
                    </div>

                    <div className='flex items-center gap-5'>
                        <motion.button className='px-7 py-3 rounded-xl bg-black text-white font-medium text-sm cursor-pointer hover:bg-zinc-800 transition disabled:opacity-60 '
                        whileHover={{scale: 1.03}}
                        whileTap={{scale: 0.97}}
                        disabled={loading}
                        onClick={handleSettings}
                        >
                            {loading ? (
                               <> <Loader2 className='h-5 w-5 animate-spin' /> Saving...</>
                            ) : "Save"}
                        </motion.button>

                        {saved && (
                            <motion.span className='text-sm text-emerald-600 font-medium'
                            initial={{opacity: 0, y: 6}}
                            animate={{opacity: 1, y: 0}}>
                                ✓ Settings Saved
                            </motion.span>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default DashboardClient
