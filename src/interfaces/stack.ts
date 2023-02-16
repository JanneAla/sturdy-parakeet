import { IPCProduct, IFullProductData } from "./product";
 
type StackParamList = {
    Main: undefined;
    Add: {
      product: IPCProduct
    };
    Product: {
      product: IFullProductData
    };
    FindGameModal: {};
  };

export default StackParamList