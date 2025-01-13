interface FooterModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FooterModal: React.FC<FooterModalProps> = (props) => {
  return (
    <div
      className="flex justify-end gap-3 border-t border-white px-6 py-4"
      {...props}
    >
      {props.children}
    </div>
  );
};

export default FooterModal;
