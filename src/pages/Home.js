import { Col, Grid, Row } from "rsuite";
import Sidebar from "../components/Sidebar";

const Home = () => {
    return (
        <Grid fluid className="h-100">
            <Row >
                <Col xs={24} md={8} className="h-100">
                    <Sidebar />
                </Col>
            </Row>
        </Grid>
    );
}
    
export default Home;