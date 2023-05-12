/* eslint-disable */

// route handler enabling draft mode
// import { draftMode } from 'next/headers';
 
//async 
export default function  (request: any, response: any) {//GET(request: Request) {

    const query = request.query;
    console.log(JSON.stringify(query));
    console.log(request.body);
    console.log("we have a request");
    console.log(JSON.stringify(query.route));

  // console.log(request);
  response.setDraftMode({ enable: true });
  //return new Response('Draft mode is enabled');
  response.redirect(`/${query.route[0]}/${query.route[1]}/`);
}

/* eslint-enable */