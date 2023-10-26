import Image from "next/image";

type AvatarIconProps = {
  url: string | undefined, 
  large?: boolean,
  isSelf?: boolean
}

const AvatarIcon = ({url, large=false, isSelf=false}: AvatarIconProps) => {
  return (
    <Image
      src={
        url ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqzQ_T2DGHe-3tHk9z7fqeYzLJ2Tn9vszRmH1TOpZjxynAFhO7ciB10Nh5d-b5_yUFTC8&usqp=CAU"
      }
      alt=""
      width={large? 80 : 40}
      height={large ? 80 : 40}
      className={`rounded-full ${isSelf && "border-2 border-sky-500"}`}
    />
  );
}

export {AvatarIcon}