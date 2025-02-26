

interface ModalLayoutProps {
  children: React.ReactNode;

  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

const ModalLayout: React.FC<ModalLayoutProps> = (props) => {
  const classSize = 'max-w-' + (props.size || 'xl');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 min-h-0 py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={`mx-4 lg:mx-60 md:mx-48 sm:mx-32 w-full ${classSize} rounded-lg bg-zinc-800 shadow-lg overflow-auto max-h-full`}>
        {props.children}
      </div>
    </div>
  );
};  

export default ModalLayout;