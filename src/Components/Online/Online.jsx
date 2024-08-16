import React from 'react'
import useOnlineSttatus from '../../Hooks/useOnlineSttatus'

export default function Online({children}) {
    const isOnline = useOnlineSttatus();
    if (isOnline == true) {
        return children 
    }
}
