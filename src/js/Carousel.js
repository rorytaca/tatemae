import React from 'react';

/**
 * Carousel: 
 */
class CarouselSlide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			innerContent: this.props.innerContent,
			active: this.props.active
		}
	}

	render() {
		var classNames = "carousel-slide";
		classNames += this.props.active == true ? " active" : "";
		return (
			<div className={classNames}>
				<div dangerouslySetInnerHTML={{__html: this.state.innerContent}}></div>
			</div>
		)
	}
}

class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slides: this.props.slides,
			currentIndex: 0,
			autoPlay: this.props.autoplay,
			isPlaying: false,
			speed: this.props.autoplaySpeed,
			intervalId: null
		}

		this.play = this.play.bind(this);
		this.slideToIndex = this.slideToIndex.bind(this);
	}

	componentDidMount() {
  		var intervalId = window.setInterval(() => {
  			this.play();
  		}, this.state.speed);
  		this.setState({intervalId: intervalId});
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}

	play() {
		let current = this.state.currentIndex;
		let nextSlide = this.state.currentIndex + 1;
		this.slideToIndex(nextSlide);
	}

	slideToIndex(index) {
		let slideCount = this.state.slides.length - 1;
		let next = index;

		if (index < 0) {
			next = slideCount;
		} else if (index > slideCount) {
			next = 0;
		}

		this.setState({ currentIndex: next });

	}

	render() {
		let slides = this.state.slides;
		let current = this.state.currentIndex;
		let slidesHtml = slides.map(function(inner,index) {
			console.log(index + " : " + current);
			return <CarouselSlide innerContent={inner} active={index == current ? true : false} />
		})
		return (
			<div className='carousel-container index'>
				{slidesHtml}
			</div>
		)
	}
}


export default Carousel