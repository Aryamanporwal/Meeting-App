import React  from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from './button';
import { cn } from '@/lib/utils';

interface MeetingModelsPops {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children?: React.ReactNode;
    handleClick?: () => void;
    buttonText?: string; 
    buttonIcon?: string 
    image?: string;  
}
const MeetingModal = ({isOpen , onClose  , title , className , children , handleClick , buttonText , image, buttonIcon}:MeetingModelsPops) => {
  return (
        <Dialog open = {isOpen} onOpenChange = {onClose} >
        <DialogContent className = "flex w-full max-w-[520px] flex-col gap-6 border-none bg-gray-800 px-6 py-9 text-white">
            <DialogTitle>Meeting</DialogTitle>
            <div className='flex flex-col gap-6'>
                {image && (
                   <div className = "flex justify-center">
                    <Image src = {image} alt = "image" width = {72} height = {72}/>
                    </div>)}
                    <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
                    {children}
                    <Button className = "bg-blue-500 focus -visible:ring-0 focus-visible:ring-offset-0" onClick = {handleClick}>
                        {buttonIcon && (
                            <Image src = {buttonIcon} alt = "icon" width = {13} height = {13}/>
                        )}&nbsp;
                        {buttonText || 'Schedule Meeting'}
                    </Button>
            </div>
        </DialogContent>
        </Dialog>
  )
}

export default MeetingModal