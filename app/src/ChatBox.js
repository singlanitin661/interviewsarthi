import React from 'react';

const ChatBox = ({ role, message }) => {
    // console.log(message)
    // console.log(role)
  return (
    <div className={role === "user" ? 'p-4 bg-green-200 ml-[30vw] mr-[10vw] rounded-lg' : 'p-4 rounded-lg bg-grey-200 mr-[30vw] ml-[10vw]'}>
      {message}
    </div>
  );
}

export default ChatBox;
