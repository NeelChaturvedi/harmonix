"use client";

import { cn } from "@/lib/utils";
import { 
    Channel, 
    ChannelType, 
    MemberRole, 
    Server 
} from "@prisma/client";

import { Edit, Lock, Mic, Text, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";


interface ServerChannelProps{
    channel: Channel;
    server: Server;
    role?: MemberRole;
}

const iconMap = {
    [ChannelType.TEXT]: Text,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,
}

export const ServerChannel = ({
    channel,
    server,
    role
}:ServerChannelProps) => {
    const { onOpen } = useModal();
    const params = useParams();
    const router = useRouter();
    

    const Icon = iconMap[channel.type];
    return(
        <button onClick={() => {}} className={cn("group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-blue-300/40 transition mb-1", params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-blue-700")}>
            <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-blue-400/90"/>
            <p className={cn("line-clamp-1 font-semibold text-sm text-zinc-500 group:hover:text-zinc-600 dark:text-blue-400/90 dark:group-hover:text-blue-300/90 transition", params?.channelId === channel.id && "text-primary dark:text-blue-200 dark:group-hover:text-white")}>{channel.name}</p>
            {channel.name !== "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionTooltip label="Edit">
                        <Edit className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-blue-400/90 dark:hover:text-blue-300/90 transition"/>
                    </ActionTooltip>
                    <ActionTooltip label="Delete">
                        <Trash onClick={() => onOpen("deleteChannel", { server, channel })} className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-blue-400/90 dark:hover:text-blue-300/90 transition"/>
                    </ActionTooltip>
                </div>
            )}
            {channel.name === "general" && (<Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-blue-400/90"/>)}
        </button>
    )
}