import {useState} from 'react'
import { Icon,Alert, InputGroup , Modal , Button , Uploader} from 'rsuite'
import { useModelState } from '../../../misc/custom-hook'
import { useParams } from 'react-router'
import { storage } from '../../../misc/firebase'


const MAX_FILE_SIZE = 1000 * 1024 * 5;

export const AttachmentBtnModal = ({afterUpload}) => {

    const {chatId} = useParams();
    const { isOpen, close, open } = useModelState();
    const [isLoading, setIsLoading] = useState(false);

    const [filesList, setFilesList] = useState([]);
    
    const onChange = (fileArr) => {
        const filtered = fileArr.filter(el => el.blobFile.size <= MAX_FILE_SIZE).slice(0,5);
        setFilesList(filtered);
    }

    const onUpload = async () => {
        try {
            const uploadPromises = filesList.map(f => {
                return storage.ref(`/chat/${chatId}`)
                    .child(Date.now() + f.name)
                    .put(f.blobFile, {
                        cacheControl: `public, max-age=${3600 * 24 * 3}`
                    })
            });

            const uploadSnapshots = await Promise.all(uploadPromises);

            const shapePromises = uploadSnapshots.map(async snap => {
                return {
                    contentType: snap.metadata.contentType,
                    name: snap.metadata.name,
                    url: await snap.ref.getDownloadURL()
                }
            });

            const files = await Promise.all(shapePromises);

            await afterUpload(files);

            setIsLoading(false);
            close();

        } catch (err) {
            setIsLoading(false);
            Alert.error(err.message, 4000);
        }

            
    }



  return (
      <>
          
          <InputGroup.Button
            onClick={open}
          >
            <Icon icon="attachment" />
          </InputGroup.Button>

          <Modal show={isOpen} onHide={close}>
              <Modal.Header>
                  <Modal.Title>
                      Upload files
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Uploader
                      autoUpload={false}
                      action=""
                        fileList={filesList}
                      onChange={onChange}
                      multiple
                      listType="picture-text"
                      className="w-100"
                        disabled={isLoading}
                  />
                  hello
              </Modal.Body>
              <Modal.Footer>
                  <Button
                      block
                      disabled={isLoading}
                        onClick={onUpload}
                  >
                        Send to chat
                  </Button>
                  <div className="text-right mt-2">
                      <small>* only files less than 5mb are allowed</small>
                  </div>
                  
              </Modal.Footer>
          </Modal>
          


    </>
  )
}
