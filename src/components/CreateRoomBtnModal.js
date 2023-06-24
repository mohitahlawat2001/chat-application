import { Button, Icon, Modal , Form,Alert, FormGroup , ControlLabel , FormControl, Schema } from "rsuite"
import { useModelState } from "../misc/custom-hook"
import { useCallback, useState, useRef } from "react"
import firebase from "firebase/app"
import { database } from "../misc/firebase"

const model = Schema.Model({
    name: Schema.Types.StringType().isRequired('Chat name is required'),
    description: Schema.Types.StringType().isRequired('Description is required')
})

const INITIAL_FORM = {
    name: '',
    description: ''
}

const CreateRoomBtnModal = () => {

    const { isOpen, open, close } = useModelState();
    
    const [formValue, setFormValue ] = useState(INITIAL_FORM);
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef();

    const onFormChange = useCallback(value => {
        setFormValue(value);
    }, [])

    const onSubmit = async () => {
        if(!formRef.current.check()){
            return;
        }

        setIsLoading(true);

        const newRoomData = {
            ...formValue,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        }

        try {
            await database.ref('rooms').push(newRoomData);
            Alert.info(`${formValue.name} has been created`, 4000);
            setIsLoading(false);
            setFormValue(INITIAL_FORM);
            close();
        }
        catch (err) {
            setIsLoading(false);
            Alert.error(err.message, 4000);
        }


    }


    return (
        <div className="mt-2">
            
            <Button block color="green" onClick={open}>
                <Icon icon="creative" /> Create new chat room
            </Button>
            
            <Modal show={isOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>
                        New Chat Room
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form fluid onChange={onFormChange} formValue={formValue} model={model} ref={formRef}>
                        <FormGroup>
                            <ControlLabel>Room Name</ControlLabel>
                            <FormControl name="name" placeholder="Enter chat room name..." />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl componentClass="textarea" rows={5} name="description" placeholder="Enter room description.." />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button block appearance="primary" onClick={onSubmit} disabled={isLoading}>
                        Create new chat room
                    </Button>

                </Modal.Footer>
            </Modal>
            {/* hello */}

        </div>
    )
}

export default CreateRoomBtnModal;