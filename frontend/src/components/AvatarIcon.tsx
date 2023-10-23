import Image from "next/image";

const AvatarIcon = ({url}: {url: string | undefined}) => {
  return (
    <Image
      src={
        url ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqzQ_T2DGHe-3tHk9z7fqeYzLJ2Tn9vszRmH1TOpZjxynAFhO7ciB10Nh5d-b5_yUFTC8&usqp=CAU"
      }
      alt=""
      width={40}
      height={40}
      className="rounded-full"
    />
  );
}

export {AvatarIcon}