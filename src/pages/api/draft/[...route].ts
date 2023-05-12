/* eslint-disable */

// route handler enabling draft mode
import { draftMode } from 'next/headers';
 
//async 
export default function  (request: any) {//GET(request: Request) {

    const query = request.query;
    console.log(JSON.stringify(query));
    console.log("we have a request");

  // console.log(request);
  draftMode().enable();
  return new Response('Draft mode is enabled');

  
}

/* eslint-enable */