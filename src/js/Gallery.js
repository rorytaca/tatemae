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
      <div isOpen={this.props.isOpen} className='modal-overlay' name={this.props.name}>
        <div className='modal-body'>          
          <img src={this.props.src} />
        </div>
        <a className='modal-close' href='#' onClick={this.props.onClick}><span className='fa fa-times'></span></a>
        <div className='modal-controls'>
          <a className='modal-arrow left' href="#" onClick={this.props.onClickLeft}><span className='fa fa-arrow-circle-left'></span></a>
          <a className='modal-arrow right' href="#" onClick={this.props.onClickRight}><span className='fa fa-arrow-circle-right'></span></a>
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
      imgUrls: props.imgUrls,
      currentIndex: null
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.slideLeft = this.slideLeft.bind(this)
    this.slideRight = this.slideRight.bind(this)
  }

// Function for opening modal dialog
  openModal(e, index) {
     this.setState({
       showModal: true,
       currentIndex: index
     })
   };

  // Function for closing modal dialog
  closeModal() {
    this.setState({
      showModal: false,
    })
  }

  // Function for watching key presses
  slideLeft() {
    if ((this.state.currentIndex) > 0) {
      this.setState({
         currentIndex: this.state.currentIndex - 1
      })
    }
  }

  slideRight() {
    if ((this.state.currentIndex) < this.state.imgUrls.length - 1) {
      this.setState({
         currentIndex: this.state.currentIndex + 1
      })
    }
  }
 
  render() {
    return(
      <div className='gallery-container'>
        <div className='row'>
          {
            (this.state.imgUrls).map((url, index) => {
               return <div className='col sm-half md-quarter xl-eigth'>
                  <div className='gallery-item' onClick={(e) => this.openModal(e, index)}>
                    <Image className='gallery-thumbnail' src={url} alt={'Image number ' + (index + 1)} />
                  </div>
                </div>
             })
           }
        </div>
        <GalleryModal 
          isOpen={this.state.showModal} 
          onClick={this.closeModal}
          onClickLeft={this.slideLeft}
          onClickRight={this.slideRight}
          src={this.state.imgUrls[this.state.currentIndex]} 
        /> 
      </div>
    )
  }
}
export default Gallery;