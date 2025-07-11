"use client"
import { useGetCalls } from '@/hooks/useGetCalls';
import { useState , useEffect } from 'react';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { toast } from 'sonner';


const CallList = ({ type }:{type: 'ended'|'upcoming'|'recordings'}) => {
    const {upcomingCalls, endedCalls, CallRecordings, isLoading} = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([])

    const getCalls = () =>{
        switch(type){
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    }

    const getNoCallsMessage = () =>{
        switch(type){
            case 'ended':
                return 'No Previous Calls';
            case 'recordings':
                return 'No Recordings';
            case 'upcoming':
                return 'No Upcoming Calls';
            default:
                return '';
        }
    }

    useEffect(()=>{
        const fetchRecordings = async() =>{
            try{
                const callData = await Promise.all(CallRecordings.map((meeting)=> meeting.queryRecordings()))
                const recordings = callData.filter(call => call.recordings.length > 0).flatMap(call => call.recordings)
                    setRecordings(recordings);
            }
            catch{
                toast("Try Again Later")
            }
        }
        if(type === 'recordings') fetchRecordings();
    },[type , CallRecordings]);

    if(isLoading) return <Loader/>

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage(); 
    if(isLoading) return <Loader/>
  return (
    <div className = "grid grid-cols-1 gap-5 xl:grid-cols-2">
        {calls && calls.length > 0 ? calls.map((meeting:Call | CallRecording )=>(
            <MeetingCard
                key = {(meeting as Call).id}
                icon = {
                    type === 'ended'
                        ? '/icons/previous.svg'
                        :type ==='upcoming'
                         ? '/icons/upcoming.svg'
                        : '/icons/recordings.svg'
                }
                title={(meeting as Call).state?.custom?.description?.substring(0,26) ||(meeting as CallRecording).filename?.substring(0, 20) ||'Personal Meeting'}
                date = {
                    type === 'recordings'
                        ? ((meeting as CallRecording).start_time?.toLocaleString() || 'No Date')
                        : ((meeting as Call).state?.startsAt?.toLocaleString() || 'No Date')
                }
                isPreviousMeeting = {type === 'ended'}
                buttonIcon1 = {type === 'recordings'?'/icons/play.svg':undefined}
                handleClick={type === 'recordings'? () => router.push(`${(meeting as CallRecording).url}`): () => router.push(`/meeting/${(meeting as Call).id}`)}
                link={type === 'recordings'? (meeting as CallRecording).url: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
                buttonText = {type === 'recordings'?'Play':'Start'}
            />
        )):(
            <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
        )}
    </div>
  )
}

export default CallList;