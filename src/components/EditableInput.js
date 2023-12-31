import { useCallback , useState } from 'react';
import { Input, InputGroup,Icon, Alert } from 'rsuite'

const EditableInput = ({
    initialValue,
    onSave,
    label = null,
    placeholder = "write value ",
    emptyMsg = 'Input is empty',
    wrapperClassName = '',
    ...inputProps
}) => {

    const [input, setInput] = useState(initialValue);
    const [isEditable, setIsEditable] = useState(false);

    const onInputChange = useCallback((value) => {
        setInput(value);
    }, []);

    const onEditCLick = useCallback(() => {
        setIsEditable(p => !p);
        setInput(initialValue);
    }, [initialValue]);

    const onSaveClick = async () => {
        const trimmed = input.trim();

        if (trimmed === '') {
            Alert.info(emptyMsg, 4000);
        }

        if (trimmed !== initialValue) {
            await onSave(trimmed);
        }

        setIsEditable(false);
    };
    return (
        <div className={wrapperClassName} >
            {label}
            <InputGroup>
            <Input
                {...inputProps}
                disabled={!isEditable}
                placeholder={placeholder}
                value={input}
                onChange={onInputChange}
            />
            <InputGroup.Button  onClick={onEditCLick}>
                <Icon icon = {isEditable ? 'close' : 'edit2'} />
            </InputGroup.Button>

                {isEditable && (  
                    <InputGroup.Button onClick={onSaveClick}>
                        <Icon icon="check" />
                    </InputGroup.Button>
                )} 


            </InputGroup>

        </div>

    )
}

export default EditableInput