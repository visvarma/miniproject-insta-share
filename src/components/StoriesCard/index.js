import Slider from 'react-slick'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
}

const StoriesCard = props => {
  const {storiesData} = props
  return (
    <div className="stories-container">
      <div className="slick-container">
        <Slider {...settings}>
          {storiesData.map(each => {
            const {userName, storyUrl, userId} = each
            return (
              <div className="stories-slick-item" key={userId}>
                <img
                  className="stories-logo-image"
                  src={storyUrl}
                  alt="user story"
                />
                <p className="story-name">{userName}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}
export default StoriesCard
