import React from 'react'
import { useSelector } from 'react-redux'
import ChatBox from './ChatBox';

const RightPanelByAryan = () => {
    const geminiStore = useSelector(store => store.gemini.history);
    // console.log(geminiStore)
  return (
    <div className='max-width-[330px]'>
        this is the right pannel by aryan
      {geminiStore.map((data, index)=> <ChatBox key={index} role={data?.role} message={data?.parts[0]?.text}/>) }
    </div>
  )
}

export default RightPanelByAryan
