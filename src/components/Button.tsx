import { cls } from "../libs/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button className={cls("border, border-black", className || "")} {...props}>
      {children}
    </button>
  );
};

export default Button;
