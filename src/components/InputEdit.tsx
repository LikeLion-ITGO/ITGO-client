interface InputEditProps {
  placeholder?: string;
}

export const InputEdit = ({ placeholder }: InputEditProps) => {
  return (
    <input
      placeholder={placeholder}
      className="h-[46px] w-full text-[16px]  rounded-[8px] border-[1px] border-[#BCC3CE] px-4  focus:border-[#3CADFF] focus:outline-none"
    />
  );
};
