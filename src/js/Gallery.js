import React from 'react';

/**
 * Gallery: 
 */

class Image extends React.Component {
  render() {
    return(
      <img className={this.props.className} src={this.props.src} alt={this.props.alt} />
    )
  }
}

// Component for gallery modal
class GalleryModal extends React.Component {
  render() {
    if (this.props.isOpen === false) {
      return null;
    }
    
    return(
      <div isOpen={this.props.isOpen} className='modal-overlay' onClick={this.props.onClick} name={this.props.name}>
        <div className='modal-body'>
          <a className='modal-close' href='#' onClick={this.props.onClick}><span className='fa fa-times'></span></a>
          
          <img src={this.props.src} />
        </div>
      </div>
    )
  }
}

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      url: ''
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onClickLeft = this.onClickLeft.bind(this)
    this.onClickRight = this.onClickLeft.bind(this)
  }

  onClickLeft() {

  }
 
  onClickRight() {

  }

render() {
    return(
      <div className='gallery-container'>
        <div className='row'>
          {
            (this.props.imgUrls).map((url, index) => {
               return <div className='col-sm-6 col-md-3 col-xl-2'>
                  <div className='gallery-card'>
                    <Image className='gallery-thumbnail' src={url} alt={'Image number ' + (index + 1)} />
                    
                    <span className='card-icon-open fa fa-expand' value={url} onClick={(e) => this.openModal(url, e)}></span>
                  </div>
                </div>
             })
           }
        </div>
        
        <GalleryModal isOpen={this.state.showModal} onClick={this.closeModal} src={this.state.url} /> 
      </div>
    )
  }
  
  // Function for opening modal dialog
  openModal(url, e) {
     this.setState({
       showModal: true,
       url: url
     })
   };

  // Function for closing modal dialog
  closeModal() {
    this.setState({
      showModal: false,
      url: ''
    })
  }
}
export default Gallery;