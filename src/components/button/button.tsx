

import Button from "@ui/button";

interface ButtonCenteredProps {
    path: string;
    buttonText: string;
    text: string;
  }


const ButtonCentered: React.FC<ButtonCenteredProps> = ({ path, text, buttonText }) => { 
    return (
        <div className="tw-grid tw-place-items-center tw-pt-2 tw-pb-8">
            <p className="tw-mb-0"><b>{text}</b></p>
        <Button path={path} className="tw-mt-3" >

            {buttonText}
        </Button>
        </div>
    );
}

export default ButtonCentered;
