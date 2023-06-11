import { useCallback, useState } from 'react'

export function useModelState( defaultValue = false ) {
    const [ isOpen, setIsOpen ] = useState( defaultValue )
    
    const open = useCallback(() => setIsOpen(true),[])
    const close = useCallback(() => setIsOpen(false),[])
    // const toggle = () => setState(prev => !prev)
    
    return { isOpen, open, close };
}