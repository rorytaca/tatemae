import React from 'react';
import { findDOMNode } from 'react-dom';
/**
 * Carousel: 
 *
 * 
 * TODO:: isScrollable features are a little wonky, need further debugging, avoid use
 *
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

class CarouselNavigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			navType: this.props.navType || 'bullets'
		}
	}

	render() {
		if (this.state.navType == 'bullets') {
			let navBulletsClassAdds = this.props.orientation == 'vertical'? 'right center' : 'bottom';
			let navBulletsClassName = 'nav-bullets flex ' + navBulletsClassAdds;
			return (
				<div className='nav-controls flex-container'>
					<div className={navBulletsClassName}>
						{
							(this.props.slides).map((slide,index) => {
								return(
									<div className={index == this.props.current? 'bullet active' : 'bullet'} onClick={()=>this.props.onClick(index)}></div>
								)	
							})
						}
					</div>
				</div>
			)
		} else if (this.state.navType == 'arrows') {
			return (
				<div className='nav-controls flex-container'>
					<div className='arrow flex left' onClick={()=>this.props.onClick(this.props.current - 1)}><i className="fa fa-chevron-left" aria-hidden="true"></i></div>
					<div className='arrow flex right center' onClick={()=>this.props.onClick(this.props.current + 1)}><i className="fa fa-chevron-right" aria-hidden="true"></i></div>	
				</div>
			)
		}	
	}
}

class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slides: this.props.slides,
			autoPlay: this.props.autoplay || true,
			speed: this.props.autoplaySpeed || 5000,
			orientation: this.props.orientation || 'horizontal',
			isScrollable: this.props.isScrollable || false,			//TODO: fix
			currentIndex: 0,
			isPlaying: false,
			scrollPos: 0,
			intervalId: null
		}

		this.play = this.play.bind(this);
		this.startAutoplay = this.startAutoplay.bind(this);
		this.stopAutoplay = this.stopAutoplay.bind(this);
		this.updateCurrentIndex = this.updateCurrentIndex.bind(this);
		// this.updateCarouselView = this.updateCarouselView.bind(this);
		this.handleScrollCarousel = this.handleScrollCarousel.bind(this);
	}

	componentDidMount() {
		if (this.props.autoplay) {
	  		this.startAutoplay();
	  	}
	  	const el = findDOMNode(this);
	  	if (this.state.isScrollable) { $(".inner-wrapper",el).on('scroll', this.handleScrollCarousel); }
  	}

	componentWillUnmount() {
		if (this.state.isScrollable) { $(".inner-wrapper",el).off('scroll', this.handleScrollCarousel); }
		if (this.props.autoplay) {
	  		this.stopAutoplay();
	  	}
	}

	componentDidUpdate() {
		const el = findDOMNode(this);
		

		if (this.state.orientation == 'horizontal') {
			const currentSlideLoc = $(el).width() * this.state.currentIndex;
			$(".inner-wrapper", el).animate({ scrollLeft: currentSlideLoc }, 300);
		} else {
			const currentSlideLoc = $(el).height() * this.state.currentIndex;
			$(".inner-wrapper", el).animate({ scrollTop: currentSlideLoc }, 300);
		}
	}

	startAutoplay(){
		var intervalId = window.setInterval(() => {
  			this.play();
  		}, this.state.speed);
  		this.setState({intervalId: intervalId});
	}

	stopAutoplay(){
		clearInterval(this.state.intervalId);
	}

	play() {
		let current = this.state.currentIndex;
		let nextSlide = this.state.currentIndex + 1;
		this.updateCurrentIndex(nextSlide);
	}

	updateCurrentIndex(index) {
		this.stopAutoplay();
		let slideCount = this.state.slides.length - 1;
		let next = index;
		if (index < 0) {
			next = slideCount;
		} else if (index > slideCount) {
			next = 0;
		}
		this.setState({ currentIndex: next });
		this.startAutoplay();
	}

	handleScrollCarousel(e) {
		var st = 0;
		const el = findDOMNode(this);
		//fetch new stop pos
		if (this.state.orientation == "horizontal") {
			st = $(".inner-wrapper",el).scrollLeft();
		} else {
			st = $(".inner-wrapper",el).scrollTop();
		}
		//disable autoplay
		this.stopAutoplay();

		let index = this.state.currentIndex;
		//delegate changes to carousel
		if (st > this.state.scrollPos) {
			this.updateCurrentIndex(index+1);
		} else {
			this.updateCurrentIndex(index-1);
		}
		this.setState({ scrollPos: st });

		//re-enable autoplay
		this.startAutoplay();
	}

	render() {
		let slides = this.state.slides;
		let current = this.state.currentIndex;
		let carouselClassAdds = this.state.isScrollable ? this.state.orientation + ' scrollable' : this.state.orientation;
		let carouselClassName = 'carousel ' + carouselClassAdds; 

 		let slidesHtml = slides.map(function(inner,index) {
			return <CarouselSlide innerContent={inner} active={index == current ? true : false} />
		})

		return (
			<div className={carouselClassName}>
				<div className='inner-wrapper'>
					{slidesHtml}
				</div>
				<CarouselNavigation current={current} slides={slides} navType={this.props.navType} orientaion={this.state.orientation} onClick={this.updateCurrentIndex.bind(this)} />
			</div>
		)
	}
}

export default Carousel