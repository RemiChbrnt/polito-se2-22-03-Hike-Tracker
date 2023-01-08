import { useState } from 'react';

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text">
            {isReadMore ? text.slice(0, 150) : text}
            <span onClick={toggleReadMore} className="read-or-hide" style={{ color: "#3366CC" }}>
                {isReadMore ? "... Read More" : " Show Less"}
            </span>
        </p>
    );
};

export { ReadMore }