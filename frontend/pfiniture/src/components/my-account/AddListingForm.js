import { Form, Button, Row, Col, Modal, ModalBody } from "react-bootstrap";
import { Select, MenuItem, FormControl, TextField } from '@material-ui/core'
import { useState, useEffect } from "react";
import { store } from '../../redux/store';
import { makeStyles } from '@material-ui/core/styles';
import { MESSAGE_TYPES, MAX_IMAGE_COUNT, FURNITURE_TYPES } from '../../constants'
import client from "../../API/api";
import {NotificationManager} from "react-notifications";
import { TIME_OUT, MAX_PRICE_RANGE } from '../../constants'

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: '100%',
    },
}));

export default function AddListingForm(props) {
    const classes = useStyles();
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

    const messages = Object.freeze({
        ADD_LISTING_SUCCESS: {
            message: "Sucessfully added listing. You can now vew your listing on the listings page",
            type: MESSAGE_TYPES.SUCCESS
        },
        IMAGE_UPLOAD_SUCCESS: { message: "Sucessfully uploaded image", type: MESSAGE_TYPES.SUCCESS },
        MAX_IMAGE_COUNT_EXCEEDED: { message: "Error, can't upload more than three images for a listing", type: MESSAGE_TYPES.FAILURE },
        NO_FILE_SELECTED: { message: "Error, select an image file to upload image", type: MESSAGE_TYPES.FAILURE },
        WRONG_FILE_TYPE: { message: "Error, can only upload images", type: MESSAGE_TYPES.FAILURE },
    })

    const handleCloseModal = () => {
        setImageFiles([]);
        setSelectedFile("");
        setShow(false);
        setPrice("");
        setName("");
        setDescription("");
        setType("");
        setMessage("");
    }

    return (
        <div>
            <Button variant="outline-dark" onClick={() => setShow(true)}>
                Add Listing
            </Button>
            <Modal size="lg" scrollable={true} show={show} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Listing</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="10">
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="outlined-basic"
                                    variant="outlined"
                                    onChange={(e) => setName(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Price
                            </Form.Label>
                            <Col sm="10">
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="outlined-basic"
                                    variant="outlined"
                                    onChange={(e) => setPrice(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Description
                            </Form.Label>
                            <Col sm="10">
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="outlined-basic"
                                    variant="outlined"
                                    onChange={(e) => setDescription(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Furniture Type
                            </Form.Label>
                            <Col sm="10">
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <Select
                                        className={classes.selectForm}
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        {FURNITURE_TYPES.map((type) => {
                                            return <MenuItem
                                                key={type}
                                                value={type}
                                                default=''>
                                                {type}
                                            </MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Col>
                        </Form.Group>

                        <div className="add-image-container">
                            <input type="file" id="myFile" name="filename" onChange={onFileChange} />
                            <Button variant="outline-dark" onClick={onAddImage}>Add Image</Button>
                        </div>
                    </Form>
                    <div className="add-image-container">
                        {imageFiles.map((imageFile) => {
                            return <img className="image-container" src={URL.createObjectURL(imageFile)} alt="furniture" />
                        })}
                    </div>
                </ModalBody>
                {message ?
                    <div
                        className={
                            message.type === MESSAGE_TYPES.SUCCESS ? "alert alert-success" : "alert alert-danger"}
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
        let reg = /^-?\d+\.?\d*$/;
        if (name === "" || price === "" || type === "") {
            NotificationManager.error("Please fill in all the form!", "", TIME_OUT)
            return;
        }

        if (!reg.test(price)){
            NotificationManager.error("Please input price as number without white space!", "", TIME_OUT)
            return;
        }

        if (parseFloat(price) > MAX_PRICE_RANGE) {
            NotificationManager.error("This item is too expensive; we don't sell it here... Maximum is $1000!", "", TIME_OUT)
            return;
        }
        client.image.addImages(imageFiles).then((imageResponse) => {
            client.furniture.addFurniture({ name, price }).then((response) => {
                client.listing.addListing({
                    title: name,
                    description: description,
                    images: imageResponse.data.map(({ id }) => id),
                    furniture: response.data.id,
                    user: userId,
                    type: type
                }).then(() => {
                    client.listing.getListingByUserId(userId).then(listings => {
                        props.setListings(listings.data.reverse());
                    }).then(() => {
                        setImageFiles([]);
                        setShow(false);
                        setPrice("");
                        setName("");
                        setDescription("");
                        setType("");
                        setMessage("");
                    })

                })
            });
        })
    }

    function onAddImage() {
        if (!selectedFile) {
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