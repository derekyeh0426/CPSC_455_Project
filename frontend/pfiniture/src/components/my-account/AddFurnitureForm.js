import { Form, Button, Row, Col, Modal, ModalBody } from "react-bootstrap";
import { useState } from "react";
import client from "../../API/api";

export default function AddFurnitureForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState({});
    const [show, setShow] = useState(false);
    return (
        <div>
            <Button variant="outline-dark" onClick={() => setShow(true)}>
                Add Listing
            </Button>
            <Modal size="lg" scrollable={true} show={show} onHide={() => setShow(false)}>
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

                        {/* TODO Add Type Select Form */}

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
                    user: "6104918f9a92da1084fb7438", //hardcoded for now 
                    type: "chair"
                }).then((response) => {
                    console.log(response);
                    setShow(false);
                })
            });
        })
    }

    function onAddImage() {
        setImageFiles([...imageFiles, selectedFile]);
    }

    function onFileChange(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
    }
}