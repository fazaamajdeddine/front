import React, { useRef } from "react";

function DualTextBox() {
  const secondTextAreaRef = useRef<any>(null);

  const handleFirstTextAreaChange = (event: any) => {
    // Move the focus to the second textarea when the first one is completely filled
    if (event.target.value.length === event.target.maxLength) {
      secondTextAreaRef.current.focus();
    }
  };

  return (
    <div>
      <textarea rows={3} maxLength={10} onChange={handleFirstTextAreaChange} />
      <br />
      <textarea rows={3} ref={secondTextAreaRef} />
    </div>
  );
}

export default DualTextBox;