const DescribtionText = ({ value, onDescribtionChange }: { value: string, onDescribtionChange: (arg: string) => void; }) => {
  return (
    <textarea
      className="productDescribtionField"
      value={value}
      onChange={(e) => onDescribtionChange(e.target.value)}
      placeholder="توضیحات محصول را اینجا بنویسید..."
      rows={7}
      style={{
        width: "100%",
        resize: "none",
        borderColor: "var(--mui-palette-border-main)",
        color: "var(--mui-palette-text-secondary)",
        fontSize: "16px",
        borderRadius: "5px",
        outline: "none",
        background: "transparent",
        padding: "10px",
      }}
    />
  );
};

export default DescribtionText;
