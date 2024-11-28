import { Slide, SliderContainer, SliderStyled } from './InnerSlide.styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StyledLink from "@/components/StyledLink/StyledLink";
import {FragmentCard} from "@/components/Card/FragmentCard/FragmentCard";
import {ArrowButton} from "@/components/Button/ArrowButton/ArrowButton";
import {secondsToTime} from "@/pages/Search/utils";
import {VideoWithFragments} from "@/types/playlistTypes";
type InnerSliderProps = {
  items: VideoWithFragments;
};

const InnerSlider = ({ items }: InnerSliderProps) => {
  console.log(items)

  const settings = {
    dots: false,
    infinite: false,

    speed: 500,
    slidesToScroll: 1,
    nextArrow: items.cues.length > 3 ? <ArrowButton variant="right" /> : <></> ,
    prevArrow: <ArrowButton />,
    variableWidth: true,

    accessibility: true,
    swipeToSlide: true,

  };

  if (items.cues.length === 0) {
    return null;
  }

  return (
      <SliderContainer>
        <SliderStyled {...settings} className="slider" cssEase="linear">
          {items.cues.map(({ content, timestampLink }, i) => (
              <div key={i}>
                <Slide index={i}>
                  <StyledLink to={`/${items.publicId}?t=${timestampLink}`} state={{ fromSearch: true }}>
                    <FragmentCard
                        background_image={items.thumbnailUrl}
                        timeStamp={secondsToTime(parseInt(timestampLink))}
                        content={content}
                    />
                  </StyledLink>
                </Slide>
              </div>
          ))}
        </SliderStyled>
      </SliderContainer>
  );
};

export default InnerSlider;
