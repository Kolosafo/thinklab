import React, { type ReactNode } from "react";
interface ICustomAnimation {
  children: ReactNode;
  animation: string;
  delay?: string | number;
  className?: string;
}

const CustomAnimation = (opt: ICustomAnimation) => {
  const { children, animation, className, delay } = opt;

  return (
    <div
      className={className}
      data-aos={animation}
      {...(delay && { "data-aos-delay": delay })}
    >
      {children}
    </div>
  );
};

export default CustomAnimation;
