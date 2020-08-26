import React, {useState,createContext} from 'react';


export const  AlogorithmContext = createContext<any>('');
export const AlgorithmProvider = (props:any) =>{
    const [currentAlgorithm,setCurrentAlgorithm] = useState<string>('Bubble');
    return(
        <AlogorithmContext.Provider value={[currentAlgorithm,setCurrentAlgorithm]}>
            {props.children}
        </AlogorithmContext.Provider>
    );
}

