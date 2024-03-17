
type propsData = {
  type: string;
  label: string;
  className?: string;
  name: string;
  value?: string;
  labeled?: boolean
  onChange: (value: string, name: string) => void
};

function Input(props: propsData) {
  
  return (
    <>
      {
        props.labeled? <label>{props.label}</label> : ''
      }
      <input
        type={props.type}
        className={`block outline-none border py-2.5 ps-2 mt-1 ${props.className}`}
        value={props.value}
        placeholder={props.label}
        name={props.name}
        onChange={(e)=>props.onChange(e.target.value, props.name)}
      />
    </>
  );
}

export default Input;
