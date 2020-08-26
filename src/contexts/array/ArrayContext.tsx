import React, {useState,createContext} from 'react';


export const  ArrayContext = createContext<any>([]);
export const ArrayProvider = (props:any) =>{
    const [randomArray,setRandomArray] = useState<number[]>([368,799,597,36,63,995,749,180,240,663,635,487,733,854,74,258,454,938,264,611,41,498,310,943,306,790,306,782,375,22,28,390,45,130,125,466,671,332,236,68,917,958,587,795,491,520,471,538,895,126,975,421,267,490,18,186,994,929,903,827,955,319,176,237,480,875,918,308,435,786,651,811,220,717,872,170,465,514,716,653,566,468,978,162,637,872,93,317,223,662,162,418,929,144,116,846,749,681,750,397,306,440,270,286,823,744,1000,886,482,205,523,866,81,891,488,620,157,868,188,201,516,157,420,424,241,341,87,722,468,799,867,919,319,853,39,750,969,861,315,829,293,530,877,796,352,764,675,602,679,886,834,261,977,716,664,574,192,918,75,709,511,833,112,735,602,328,120,512,722,232,586,236,420,907,755,505,847,679,592,495,889,125,808,615,280,439,385,880,311,386,384,583,925,685,818,516,654,380,905,312]);
    // const [randomArray,setRandomArray] = useState<number[]>([1,2,5,3,54,1,5,1,8,2,4,2,5,2,5,2,5,2,4,2,5,0,145,2,85,1,41,5,2,65,2,54,2,685,12,5,25,1,215,1,245]);
    return(
        <ArrayContext.Provider value={[randomArray,setRandomArray]}>
            {props.children}
        </ArrayContext.Provider>
    );
}

