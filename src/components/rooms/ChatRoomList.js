import { Nav } from "rsuite"
import Roomitems from "./Roomitems"

const ChatRoomList = ({ aboveElHeight}) => {
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
            >
                <Nav.Item>
                    <Roomitems />
                </Nav.Item>
            </Nav>


        </div>
    )
}

export default ChatRoomList