import React from 'react';
import { post } from 'axios';
import { Button } from '@material-ui/core';

class ImageUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault()
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
    
  fileUpload(file){
    const url = 'http://localhost:8080/api/v1/images';
    const formData = new FormData();
    formData.append('photo',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData, config)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input type="file" onChange={this.onChange} />
        <Button type="submit">Upload</Button>
      </form>
   )
  }
}



export default ImageUpload