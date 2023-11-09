"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { 
    CommandDialog, 
    CommandEmpty, 
    CommandGroup, 
    CommandInput, 
    CommandItem, 
    CommandList} from "../ui/command";


interface ServerSearchProps{
    data: {
        label: string,
        type: "channel" | "member",
        data:{
            icon: React.ReactNode;
            name: string;
            id: string;
        }[] | undefined
    }[]
}
export const ServerSearch = ({
    data
}: ServerSearchProps) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey))
            {
                e.preventDefault();
                setOpen((open) => !open);
            }
        }
    
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down)
    }, []);
    

    return(
        <>
            <button onClick={() => setOpen(true)} className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-blue-400/40 transition">
                <Search className="w-4 h-4 text-zinc-500 dark:text-blue-400/70"/>
                <p className="font-semibold text-sm text-zinc-500 dark:text-blue-400/90 group-hover:text-zinc-600 dark:group-hover:text-blue-300/90 transition">
                    Search
                </p>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                    <span className="text-xs font-bold">⌘</span>K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all channels and members"/>
                <CommandList>
                    <CommandEmpty> No Results Found</CommandEmpty>
                    {data.map(({label, type, data}) => {
                        if(!data?.length) return null;

                        return(
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({ id, icon, name}) => {
                                    return(
                                        <CommandItem key={id}>
                                            {icon}
                                            <span>{name}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}