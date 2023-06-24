import { Loader, Nav } from "rsuite"
import Roomitems from "./Roomitems"
import { useRooms } from "../../context/rooms.context"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom"

const ChatRoomList = ({ aboveElHeight }) => {
    

    const rooms = useRooms();
    const location = useLocation();

    return (
        <div className="h-100">

            <Nav
                appearance="subtle"
                vertical
                reversed
                className="overflow-y-scroll custom-scroll"
                style={{
                    height: `calc(100% - ${aboveElHeight}px)`,
                }}
                activeKey={location.pathname}
            >
                {!rooms &&
                    (<Loader center vertical content="Loading" speed="slow" size="md" />)}
                {rooms &&
                    rooms.length > 0 &&
                    rooms.map(room => (
                        <Nav.Item
                            componentClass={Link}
                            to={`/chat/${room.id}`}
                            key={room.id}
                            eventKey={`/chat/${room.id}`}
                        >
                        <Roomitems room={room} />
                    </Nav.Item>
                    ))}
                
            </Nav>


        </div>
    )
}

export default ChatRoomList