import TimeAgo from "timeago-react"
import ProfileAvatar from "../ProfileAvatar";


const Roomitems = ({ room }) => {

    const { createdAt, name , lastMessage} = room;

    return (
        <div>

            <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-disappear">{ name}</h4>
                <TimeAgo
                    datetime={
                        lastMessage ? new Date(lastMessage.createdAt) :
                        new Date(createdAt)
                    }
                    className="font-normal text-black-45"
                />

            </div>

            <div className="d-flex align-items-center text-black-70 ">
                {
                    lastMessage ? (
                        <>
                        <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center mr-1">
                                <ProfileAvatar
                                    src={lastMessage.author.avatar}
                                    name={lastMessage.author.name}
                                    size="xs"
                                />
                            </div>
                            <div>
                                <div className="italic">{lastMessage.author.name}</div>
                                <span>{lastMessage.text}</span>
                            </div>
                        </div>
                        </>
                    ) :
                        
                        
                                
                    
                    <span> no messages yet..</span>
                }  
            </div>
            
        </div>
    )
}

export default Roomitems