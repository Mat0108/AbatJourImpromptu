type showImageProps = {
    src?:string;
    alt?:string;
}
const ShowImage = ({src,alt}:showImageProps)=>{
    return (<img src={src} alt={alt} className="max-w-[70vw] lg:max-w-[50vw]"/>)
}
export default ShowImage