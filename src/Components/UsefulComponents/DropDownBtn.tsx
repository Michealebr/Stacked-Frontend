import { useState } from 'react';
import "./DropDownBtn.css"
import Arrow from "src/assets/Arrow.svg"

    interface Options {
        value: string;
        label: string;
      }
      
      interface DropdownButtonProps {
        option: Options[];
        svg: string  
        content: string
        leftIcon: boolean
        textContent: boolean;
        rightIcon: boolean
        dropDownDesign: string
      }
      
      
      const DropDownBtn: React.FC<DropdownButtonProps> = ({ option, svg, content, textContent, leftIcon, rightIcon , dropDownDesign, onClick}) => {
        const [isClicked, setClick] = useState(false)
        const handleCLick = () => {
          setClick(!isClicked)
        }
        
        const [selectedFilter, setSelectedFilter] = useState<Options>(option[0]);
      
       
      //  const handleIntervalClick = (selectedOption : Options) => {
      //    setSelectedFilter(selectedOption)
      //    setClick(!isClicked)
      //  }
      const handleOptionClick = (selectedOption: Options) => {
        setSelectedFilter(selectedOption);
        setClick(!isClicked);
        onClick(selectedOption); // Pass the selected option to the parent component
      }
      
        return (
          <div className="drop-dw">
              <div className="drop-btn-container">
              <button className="drop-dw-btn" onClick={handleCLick}>
                {leftIcon && (
                    <img className='drop-down-icon' src={svg}/>
                )}
              {textContent && (
              <span className='content-text'>{content}</span>
              )}
              {rightIcon && (
                <img className='right-icon' src={Arrow} alt="arrow" />
              )}
              </button>
              
              </div>
              <div className={`dropdown-content ${dropDownDesign} ${isClicked? 'active': 'closed'}`}>
              {option.map((selectedOption) => (
                  <div
                    key={selectedOption.value}
                    onClick={() => handleOptionClick(selectedOption)}
                    className={selectedFilter.value === selectedOption.value ? 'selected' : ''}
                  >
                    {selectedOption.label}
                  </div>
                ))}
              </div>
            </div>
        )
      }

export default DropDownBtn