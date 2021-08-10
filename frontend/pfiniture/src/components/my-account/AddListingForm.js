import { Form, Button, Row, Col, Modal, ModalBody } from "react-bootstrap";
import { Select } from '@material-ui/core'
import { useState, useEffect} from "react";
import { store } from '../../redux/store';
import client from "../../API/api";

export default function AddListingForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState("");
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [userId, setUserId] = useState(store.getState().id);

    useEffect(() => {
        setUserId(store.getState().id)
    }, [store.getState().id])

    const message_types = {
        SUCCESS: "success",
        FAILURE: "failure"
    }

    const MAX_IMAGE_COUNT = 3;

    const messages = Object.freeze({
        ADD_LISTING_SUCCESS: { message: "Sucessfully added listing. You can now vew your listing on the listings page", 
        type: message_types.SUCCESS},
        IMAGE_UPLOAD_SUCCESS: {message: "Sucessfully uploaded image", type: message_types.SUCCESS},
        MAX_IMAGE_COUNT_EXCEEDED: {message: "Error, can't upload more than three images for a listing", type: message_types.FAILURE},
        NO_FILE_SELECTED: {message: "Error, select an image file to upload image", type: message_types.FAILURE},
        WRONG_FILE_TYPE: {message: "Error, can only upload images", type: message_types.FAILURE},
    })

    return (
        <div>
            <Button variant="outline-dark" onClick={() => setShow(true)}>
                Add Listing
            </Button>
            <Modal size="lg" scrollable={true} show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>Add Listing</Modal.Header>
                <ModalBody>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Price
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Description
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Type
                            </Form.Label>
                        
                        <Select
                            native
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            inputProps={{
                                name: 'type',
                                id: 'type',
                            }}
                            >
                            <option aria-label="None" value="" />
                            <option value={"Chair"}>Chair</option>
                            <option value={"Desk"}>Desk</option>
                            <option value={"Table"}>Table</option>
                        </Select>

                        </Form.Group>

                        <div className="add-image-container">
                        <input type="file" id="myFile" name="filename" onChange={onFileChange} />
                        <Button variant="outline-dark" onClick={onAddImage}>Add Image</Button>
                        </div>
                    </Form>
                    <div className="add-image-container">
                        {imageFiles.map((imageFile) => {
                            return <img className="image-container" src={URL.createObjectURL(imageFile)} alt="furniture"/>
                        })}
                    </div>
                </ModalBody>
                {message ?
                <div
                    className={
                        message.type === message_types.SUCCESS ? "alert alert-success" : "alert alert-danger"}
                    role="alert">
                    {`${message.message}`}
                </div>
                :
                <div></div>
                }
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={onAddListing}>Add Listing</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );


    function onAddListing() {
        client.image.addImages(imageFiles).then((imageResponse) => {
            console.log(imageResponse)
            client.furniture.addFurniture({ name, price }).then((response) => {
                client.listing.addListing({
                    title: name,
                    description: description,
                    images: imageResponse.data.map(({ id }) => id),
                    furniture: response.data.id,
                    user: userId,
                    type: type
                }).then((response) => {
                    console.log(response);
                    setImageFiles([]);
                    setShow(false);
                    setPrice("");
                    setName("");
                    setDescription("");
                    setType("");
                })
            });
        })
    }

    function onAddImage() {
        if (!selectedFile) {
            console.log("no file selected");
            setMessage(messages.NO_FILE_SELECTED); 
        } else if (!isFileImage(selectedFile)) {
            setMessage(messages.WRONG_FILE_TYPE);
        } else if (imageFiles.length === MAX_IMAGE_COUNT) {
            setMessage(messages.MAX_IMAGE_COUNT_EXCEEDED);
        } else {
            setImageFiles([...imageFiles, selectedFile]);
            setSelectedFile("");
            setMessage(messages.IMAGE_UPLOAD_SUCCESS)
        } 
    }

    function onFileChange(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
    }

    function isFileImage(file) {
        return file && file['type'].split('/')[0] === 'image';
    }
}