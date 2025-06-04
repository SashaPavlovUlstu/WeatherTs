import React, {type FC} from 'react';
import cs from "./Container.module.scss"
interface ContainerProps {
    children:React.ReactNode;
    style:React.CSSProperties;
}
const Container:FC<ContainerProps> = ({style,children}) => {
    return (
        <div style={style} className={cs.container}>
            {children}
        </div>
    );
};

export default Container;