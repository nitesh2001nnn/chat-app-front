import "./chat-bottom-bar.scss";


type chatBottomBar={
  onChange:(txt:string)=>void;
  onSend:()=>void;
  value:string;
}

const ChatBottomBar = ({onChange,onSend,value}:chatBottomBar) => {
  const handleChange=()=>{
   onSend();
  }

  
  
  return (
    <div className="chat-bottom-bar-container">
      <img src="/assets/icons/add.svg" className="input-icon"></img>
      <input value={value} className="input-container" placeholder="enter a message" onChange={e=>onChange(e.target.value)}/>
      <img src="/assets/icons/send.svg" className="input-icon"  onClick={handleChange}/>
    </div>
  );
};

export default ChatBottomBar;
