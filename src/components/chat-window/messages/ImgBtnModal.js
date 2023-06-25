import { useModelState } from "../../../misc/custom-hook";
import { Modal } from "rsuite";

const ImgBtnModal = ({ src, fileName }) => {
    
    const {isOpen, close ,open} = useModelState();

  return (
      <>
          <input
              type="image"
              src={src}
              alt="file"
              onClick={open}
              className="mw-100 mh-100 w-auto"   
          />   
          <Modal show={isOpen} onHide={close}>
              <Modal.Header>
                  <Modal.Title>
                      {fileName}
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className="d-flex align-items-center justify-content-center h-100">
                      <img src={src} height="100%" width="100%" alt={fileName} />
                  </div>
              </Modal.Body>
              <Modal.Footer>
                  <a href={src} target="_blank" rel="noopener noreferrer">
                      View original
                    </a>
              </Modal.Footer>
          </Modal>
          

    </>
  )
}

export default ImgBtnModal