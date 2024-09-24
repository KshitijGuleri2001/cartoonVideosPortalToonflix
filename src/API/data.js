const baseurl ='https://kids.toon-flix.com/'
// const baseurl ='http://88.99.5.236:4673/'
// const baseurl ='http://localhost:4673/'
export {baseurl};

const VideoApiGet=`${baseurl}videoFrench`
export {VideoApiGet}

const GetLikeApi=`/api/little/getlikes/`
export {GetLikeApi}
const PostLikeApi=`/api/little/likevideo`
export {PostLikeApi}
const PostUnLikeApi=`/api/little/unlike/`
export {PostUnLikeApi}
const GetCommentApi=`${baseurl}getcomments`
export {GetCommentApi}
const PostCommentApi=`${baseurl}postcomment`
export {PostCommentApi}
const GetContinueApi=`${baseurl}api/watching`
export {GetContinueApi}
const PostSimilarvideoApi=`${baseurl}api/continue-watching`
export {PostSimilarvideoApi}
const Getbyid=`${baseurl}videobyid`
export {Getbyid}