import { SIDEBAR_MENU_ADMIN, SIDEBAR_MENU_SELLER } from '@/core/config/sidebar.config';
import { useLogout } from '@/hooks/auth/auth.mutation';
import { RootState } from '@/store/store';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoChevronDown, IoChevronForward, IoPersonCircle } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import Button from '../button/button';

const Sidebar = () => {
    const [menuIndex, setMenuIndex] = useState(-1)

    const pathname = usePathname()
    const router = useRouter()

    const { firstName, role } = useSelector((root: RootState) => root.users)

    const { mutateAsync: logout } = useLogout()

    const onMenuClick = (index: number) => {
        setMenuIndex(menuIndex == index ? -1 : index)
    }

    const handleLogout = async () => {
        await logout()
        router.push('/login')
    }

    return (
        <div className="bg-blue-500 min-h-screen w-60 px-3 py-5 rounded-tr-lg rounded-br-lg">
            <div className='flex flex-col items-center gap-5 flex-1'>
                <IoPersonCircle size={96} color='white' />
                <div className='w-full'>
                    <p className='text-center text-white w-full truncate'>{firstName}</p>
                    <p className='text-center text-white'>{role}</p>
                </div>

                <main className="w-full text-white">
                    {(role == 'SELLER' ? SIDEBAR_MENU_SELLER : role == 'ADMIN' ? SIDEBAR_MENU_ADMIN : []).map((value, index) => {
                        return (
                            <div key={index} className='mb-2'>
                                <button
                                    className={`flex hover:bg-blue-900 flex-row flex-1 w-full items-center gap-3 p-3 duration-300 rounded-lg ${index == menuIndex ? 'bg-blue-900' : null}`}
                                    onClick={value.subMenu ? () => onMenuClick(index) : () => router.push(value.href)}
                                >
                                    {value.icons}
                                    <span className="flex-1 text-left">{value.menuName}</span>
                                    {value.subMenu ? (index == menuIndex ? <IoChevronDown /> : <IoChevronForward />) : null}

                                </button>
                                <AnimatePresence>
                                    {index == menuIndex && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: "auto", overflow: 'hidden' }}
                                            exit={{ height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {value.subMenu?.map((subMenu: any, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className={`rounded-lg my-1 cursor-pointer list-none ${subMenu.href == pathname ? 'font-bold' : null}`}
                                                    >
                                                        <Link href={subMenu.href} className={`p-3 block`} onClick={() => { }}>
                                                            <div className="flex items-center">
                                                                {subMenu.icons}
                                                                <span className="ml-5">{subMenu.menuName}</span>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </main>

                <hr className='divide-white w-full' />
                <Button label='Logout' className={'bg-red-500 hover:shadow-red-400 active:bg-red-700'} onClick={handleLogout} />
            </div>
        </div>
    )
}

export default Sidebar