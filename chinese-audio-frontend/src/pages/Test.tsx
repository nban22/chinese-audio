import styled from "styled-components";

const StyledTest = styled.div``;

interface TestProps {}

const Test: React.FC<TestProps> = (props) => {
  return (
    <StyledTest className="h-[800px]">
      <div
        className="outer bg-red-500"
        style={{ minHeight: "300px", maxHeight: "400px", height: "", width: "80%", overflow: "auto" }}
      >
        <div
          className="middle bg-green-500"
          style={{ minHeight: "0px", maxHeight: "600px", height: "10000px", width: "100%", overflow: "auto" }}
        >
          <div
            className="inner bg-blue-500"
            style={{ minHeight: "100px", maxHeight: "150px", height: "100%", width: "auto" }}
          >
            <span className="block" style={{height: 90, background: "black"}}>Content here</span>
          </div>
        </div>
      </div>
    </StyledTest>
  );
};

export default Test;
