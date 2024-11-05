import React from 'react'


interface ITextSplitter {
    text: string
}
const TextSplitter: React.FC<ITextSplitter> = ({text}) => {
    if(!text) return null

    return (
        <>
          {text.split('').map((letter, index) => (
            <span key={index}>
            {
                letter === ' ' ? ` ` : 
                <span className="split-char" style={{display: 'inline-block'}}>{letter}</span>
            }
            </span>
          ))}
        </>
      );
}

export default TextSplitter