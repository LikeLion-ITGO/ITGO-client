interface InputEditProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
}

export const InputEdit = ({
  placeholder,
  value,
  onChange,
  type = "text",
}: InputEditProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="h-[46px] w-full text-[16px]  rounded-[8px] border-[1px] border-[#BCC3CE] px-4  focus:border-[#3CADFF] focus:outline-none"
    />
  );
};
