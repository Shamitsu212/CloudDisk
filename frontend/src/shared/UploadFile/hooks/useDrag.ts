import { useEffect, useRef, useState } from "react";

export function useDrag(onDrop: (files: File[]) => void) {
    
    const [isDragging, setIsDragging] = useState(false);

    const dragCounter = useRef(0);

    useEffect(() => {

        const handleDragEnter = (event: DragEvent) => {
            
            event.preventDefault()

            if( !event.dataTransfer?.types.includes("Files")){
                return;
            }

            dragCounter.current += 1;

            setIsDragging(true);

        }

        const handleDragOver = (event: DragEvent) => {
            
            event.preventDefault()

        }

        const handleDragLeave = (event: DragEvent) => {

            event.preventDefault()

            dragCounter.current -= 1;

            if (dragCounter.current <= 0) {
                dragCounter.current = 0;
                setIsDragging(false);
            }

        }

        const handleDrop = (event: DragEvent) => {
            
            event.preventDefault()

            dragCounter.current = 0;

            setIsDragging(false)

            const files = Array.from(event.dataTransfer?.files ?? [])

            onDrop(files);
        }

        window.addEventListener("dragenter", handleDragEnter)
        window.addEventListener("dragover", handleDragOver)
        window.addEventListener("dragleave", handleDragLeave)
        window.addEventListener("drop", handleDrop)


        return () => {

            window.removeEventListener("dragenter", handleDragEnter)
            window.removeEventListener("dragover", handleDragOver)
            window.removeEventListener("dragleave", handleDragLeave)
            window.removeEventListener("drop", handleDrop)

        }
    }, [])

    return {
        isDragging
    }

}