import { Button, Divider, Drawer , Alert} from "rsuite";
import { useProfile } from "../../context/profile.context";
import EditableInput from "../EditableInput";
import { database } from "../../misc/firebase";
import ProvideBlock from "../ProviderBlock";

const Dashboard = ({ onSignOut}) => {

    const { profile } = useProfile();

    const onSave = async (newData) => {
        // console.log(newData);
        const userNicknameRef = database.ref(`/profiles/${profile.uid}`).child('name');
        try {
            await userNicknameRef.set(newData);
            // console.log('new data saved');
            Alert.success('Nickname has been updated', 4000);
        } catch (err) {
            // console.log(err.message);
            Alert.error(err.message, 4000);
        }
    }

    return (
        <>
            <Drawer.Header>
                <Drawer.Title>
                    Dashboard
                </Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
                <ProvideBlock />
                <h1> {profile.name}</h1>
                <Divider />
                <EditableInput
                    name="nickname"
                    initialValue={profile.name}
                    onSave={onSave}
                    label={<h6 className="mb-2">Name</h6>}

                />
            </Drawer.Body>

            <Drawer.Footer>
                <Button block color="red" onClick={ onSignOut}>
                    Sign out
                </Button>
            </Drawer.Footer>

        </>
    );
}
    
export default Dashboard;