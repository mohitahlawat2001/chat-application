import { useCurrentRoom } from "../../../context/current-room.context"
import { memo } from "react";
import { useMediaQuery } from "../../../misc/custom-hook";
import { ButtonToolbar, Icon } from "rsuite";
import { Link } from "react-router-dom";
import RoomInfoBtnModal from "./RoomInfoBtnModal";

const Top = () => {

    const name = useCurrentRoom(v => v.name);
    const isMobile = useMediaQuery('(max-width: 992px)');

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">

                <h4>
                    <Icon
                        componentClass={Link}
                        to="/" icon="arrow-circle-left"
                        size="2x"
                        className={
                            isMobile
                                ? "d-inline-block d-md-none text-blue link-unstyled p-0 mr-2"
                                : "d-none"}
                    />
                    <span className="text-disappear">{name}</span>
                </h4>
                
                <ButtonToolbar className="ws-nowrap">
                    todo
                </ButtonToolbar>


            </div>

            <div className="d-flex justify-content-between align-items-center">
                <span>todo</span>
                <RoomInfoBtnModal />
                </div>


        </div>
    )
}

export default memo(Top);