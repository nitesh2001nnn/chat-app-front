import "./left-right-slider.scss";

type sliderProps = {
  id: number;
  label: string;
  value: string;
  icon: string;
  onClick: () => void;
};

interface leftrightProps {
  data: sliderProps[];
}

const LeftRightSlider = ({ data }: leftrightProps) => {
  return (
    <div className="left-right-slider-container">
      <div className="left-right-full-width">
        <div className="left-right-element-parent-container">
          {data.map((item: any, index: number) => {
            return (
              <div className="element-part" key={index}>
                <img src={item.icon} />
                <div>{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftRightSlider;
