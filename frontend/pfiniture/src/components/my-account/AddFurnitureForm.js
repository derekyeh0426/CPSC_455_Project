import { Form, Button, Row, Col, Container, FormGroup, Image, Modal, ModalBody, Nav } from "react-bootstrap";
import { useState } from "react";


function AddFurnitureForm() {
    const [imgURLs, setImgURLs] = useState([]);
    const [selectedFile, setSelectedFile] = useState({});
    const [count, setCount] = useState(0);
    return (
        <div>
        <Button variant="outline-dark" >
            Add Furniture
        </Button>
        <Modal size="lg" scrollable={true} show={true} on>
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
                                 />
                        </Col>

                    </Form.Group>
                    <input type="file" id="myFile" name="filename" onChange={onFileChange}/>
                    <Button onClick={onAddImage}> Add Image </Button>
                </Form>
                <div>
                {imgURLs.map((imgURL) => {
                    return <img src={imgURL} />
                })}
                </div>
            </ModalBody>
        </Modal>
        </div>
    );

    function onAddImage(event) {
        console.log("Adding");
        console.log(selectedFile);
        setImgURLs([...imgURLs, selectedFile]);
        console.log(imgURLs);
    }

    function onFileChange(event) {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSelectedFile(url);
    }
}

// function onImageUpload() {

//     var allowedExtensions = /(\.docx)$/i;
//     var fileInput = this.state.selectedFile;
//     var filePath;

//     if (fileInput) {
//         filePath = fileInput.name;
//     }

//     if (!fileInput || isEmptyField) {
//         this.setState({ message: this.messages.EMPTY_FIELD });
//     } else if (!isTemplateNameCorrectFormat) {
//         this.setState({ message: this.messages.TEMPLATE_NAME_INCORRECT_FORMAT });
//     } else if (!allowedExtensions.exec(filePath)) {
//         this.setState({ message: this.messages.WRONG_FILE_TYPE });
//     } else {
//         this.setState({ uploading: true });
//         uploadFile(fileInput, 'docxtemplates', templateName).then(() => {
//             this.setState({ message: this.messages.SUCCESS, processing: false, uploading: false });
//             this.props.onUploadSuccess();
//         }).catch(error => {
//             console.log("File Upload Error:",error);
//             this.setState({ message: this.messages.UPLOAD_FAIL + ": " + error.message, uploading: false });
//         });
//     }

// }

export default AddFurnitureForm;