import {Call, useStreamVideoClient} from "@stream-io/video-react-sdk"
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
export const useGetCalls = () =>{
    const [calls, setCalls] = useState<Call[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const client = useStreamVideoClient();
    const { user } = useUser();

    useEffect(()=>{
        const loadcalls = async()=>{
            if(!client || !user?.id) return ;
            setIsLoading(true)

            try{
                const{ calls } = await client.queryCalls({
                    sort:[{field: 'starts_at', direction: -1}],
                    filter_conditions: {
                        starts_at: {$exists: true},
                        $or:[
                            {created_by_user_id : user.id},
                            {members: {$in : [user.id]}},
                        ]
                    }
                });
                setCalls(calls);
            }catch(error){
                console.log(error)
            }finally{   
                setIsLoading(false);
            }
        }
        loadcalls();
    },[client, user?.id])

    const now = new Date();

    const endedCalls = calls.filter(({state: { startsAt, endedAt}}: Call)=>{
        return (startsAt && new Date(startsAt)<now || !!endedAt)
    })

    const upcomingCalls = calls.filter(({state : {startsAt}}:Call)=>{
        return startsAt && new Date(startsAt)> now
    })

    return {
        upcomingCalls,
        endedCalls,
        CallRecordings: calls,
        isLoading,
    }
}