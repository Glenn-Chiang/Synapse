import Image from "next/image";

const ChannelIcon = ({iconUrl}: {iconUrl: string | undefined}) => {
  return (
    <Image
      src={
        iconUrl ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0UcnHUiJ0s_BfieUWxwoLDk2Ji4xCJ30WVhE5690-7JtoCO6gOrMZpiHqHk_f6ftmSJk&usqp=CAU"
      }
      alt=""
      width={60}
      height={60}
      className="rounded-full"
    />
  );
}

export {ChannelIcon}