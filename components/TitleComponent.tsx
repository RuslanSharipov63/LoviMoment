import { FC } from "react";

type TitleComponentProps = {
  textTitle: string;
};

const TitleComponent: FC<TitleComponentProps> = ({ textTitle }) => {
  return (
    <>
      <h2 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
        {textTitle}
      </h2>
    </>
  );
};

export default TitleComponent;
