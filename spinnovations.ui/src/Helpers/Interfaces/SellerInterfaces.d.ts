import {RouteComponentProps} from 'react-router-dom';

declare module 'SellerTypes' {
    interface SellerProps {
        history: RouteComponentProps["history"];
        match: RouteComponentProps["match"];
      }
  }
  
  export { SellerProps }