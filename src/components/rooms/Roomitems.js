import TimeAgo from "timeago-react"


const Roomitems = () => {
    return (
        <div>

            <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-disappear">Room name</h4>
                <TimeAgo
                    datetime={new Date()}
                    className="font-normal text-black-45"
                />

            </div>

            <div className="d-flex align-items-center text-black-70 ">
                <span> no messages yet..</span>
            </div>
            
        </div>
    )
}

export default Roomitems