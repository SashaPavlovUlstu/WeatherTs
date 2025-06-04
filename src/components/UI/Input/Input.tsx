import React, {type FC} from 'react';
import cs from "./Input.module.scss";
interface InputProps {
    value:string;
    onChange:(value:string) => void;
    onEnter?:()=>void;
}
const Input:FC<InputProps> = ({value,onChange,onEnter}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && onEnter){
            onEnter();
        }
    }
    return (
        <input value={value} onKeyDown={handleKeyDown} onChange={onChange} type="text" placeholder="Search" className={cs.searchInput}/>
    );
};

export default Input;