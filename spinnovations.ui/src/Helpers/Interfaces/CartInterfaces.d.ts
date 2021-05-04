import {RouteComponentProps} from 'react-router-dom';

declare module 'CartTypes'{
    interface CartProps {
        history: RouteComponentProps["history"];
        match: RouteComponentProps["match"];
        location: RouteComponentProps["location"];
      }
    
}

export { CartProps }

