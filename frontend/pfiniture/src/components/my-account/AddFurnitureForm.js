import { Form, Button, Row, Col, Container, FormGroup, Modal, ModalBody, Nav } from "react-bootstrap";
import { useState } from "react";
import client from "../../API/api";
import { post } from "axios";
//const Image = require("/Users/abdurahman/CPSC_455_Project/backend/models/image.js");

function AddFurnitureForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState({});
    const [show, setShow] = useState(false);
    return (
        <div>
        <Button variant="outline-dark" onClick={() => setShow(true)}>
            Add Furniture
        </Button>
        <Modal size="lg" scrollable={true} show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton/>
            <ModalBody>
                <Container className="center-component">
                    <text className="card_header">Add Furniture</text>
                </Container>
                <Container className="center-component">
                </Container>
                <br/>
                <br/>
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
                    <input type="file" id="myFile" name="filename" onChange={onFileChange}/>
                    <Button onClick={onAddImage}> Add Image </Button>
                </Form>
                <div>
                {imageFiles.map((imageFile) => {
                    return <img src={URL.createObjectURL(imageFile)} />
                })}
                </div>
                <Button onClick={onAddListing}> Add Listing </Button>
            </ModalBody>
        </Modal>
        </div>
    );


    function onAddListing() {
        client.image.addImages(imageFiles).then((imageResponse) => {
            client.furniture.addFurniture({name, price}).then((response) => {
                client.listing.addListing({
                    title: name,
                    description: description,
                    images: imageResponse.data.map(({id}) => id),
                    furniture: response.data.id,
                    user: "6101f84e3e9183bc40588c1d" //hardcoded for now
                }).then((response) => console.log(response))
            });
        })
    }

    function onAddImage(event) {
        setImageFiles([...imageFiles, selectedFile]);
    }

    function onFileChange(event) {
        const file = event.target.files[0];
        //const url = URL.createObjectURL(file);
        setSelectedFile(file);
    }
}

function uploadImages(imageFiles) {
    const url = 'http://localhost:8080/api/v1/images';
    const formData = new FormData();
    imageFiles.forEach(imageFile => {
        formData.append('photo',imageFile);
    })
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData, config)
}

export default AddFurnitureForm;