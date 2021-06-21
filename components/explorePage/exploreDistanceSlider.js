//import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';
import Slider, { SliderTooltip } from 'rc-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faWalking } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} mi`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

const wrapperStyle = { width: 300, margin: 10 };

export default function ExploreDistanceSlider ({searchRadius, setSearchRadius}) {
  const [sliderValue, setSliderValue] = useState(searchRadius);

  return (
    <div className="text-start">
      <div style={wrapperStyle}>
        <p>Max Distance</p>
        <FontAwesomeIcon icon={faWalking}/>
        <FontAwesomeIcon icon={faCarSide}/>
        <Slider min={0.5} max={10} step={0.5} value={sliderValue} onChange={setSliderValue} onAfterChange={() => setSearchRadius(sliderValue)} handle={handle} />
      </div>
    </div>
  );
}