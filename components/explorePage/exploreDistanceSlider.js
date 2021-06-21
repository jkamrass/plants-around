//import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';
import Slider, { SliderTooltip } from 'rc-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle, faBiking, faCarSide, faWalking } from '@fortawesome/free-solid-svg-icons';
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

const marks = {
  "0.5": <FontAwesomeIcon icon={faWalking} size="2x"/>,
  "3": <FontAwesomeIcon icon={faBiking} size="2x" />,
  "10": <FontAwesomeIcon icon={faCarSide} size="2x"/>
}

const wrapperStyle = { width: "100%" };

export default function ExploreDistanceSlider ({searchRadius, setSearchRadius}) {
  const [sliderValue, setSliderValue] = useState(searchRadius);

  return (
    <div className="row text-start mb-5">
      <div className="col-md-6">
        <h6>Max Distance</h6>
        <div style={wrapperStyle}>
          <Slider min={0.5} max={10} step={0.5} value={sliderValue} marks={marks} onChange={setSliderValue} onAfterChange={() => setSearchRadius(sliderValue)} handle={handle} />
        </div>
      </div>
    </div>
  );
}