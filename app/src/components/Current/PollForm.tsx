import { useState } from "react";
import NumericInput from "react-numeric-input";
import { utils } from "ethers";
import { useContractMethod } from "../../customHooks";
import { useGlobalContext, Menu } from "../../context/GlobalContext";
import { CircularProgress } from "@material-ui/core";

export default function PollForm() {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [ethAmount, setEthAmount] = useState<string | undefined>("1");
  const { menu, isLoading } = useGlobalContext();
  const { send: addNew } = useContractMethod("createPoll", "New Poll");

  const format = (num: number | null): string => {
    setEthAmount(num?.toString());
    return num + "Ξ";
  };

  const addNewPoll = () => {
    title &&
      body &&
      ethAmount &&
      addNew(title, body, {
        value: utils.parseEther(ethAmount),
      }).then(() => {
        setTitle("");
        setBody("");
        setEthAmount("1");
      });
  };

  return (
    <>
      {menu === Menu.Add && (
        <div className="container">
          <div className="form-container">
            <p>
              <strong>Create Your Decentralized Poll</strong>
            </p>
            {!isLoading ? (
              <div className="input-container">
                <input
                  className="custom-input"
                  value={title}
                  type="text"
                  placeholder="Title..."
                  onChange={(
                    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                  ) => setTitle(e.target.value)}
                />
                <textarea
                  value={body}
                  className="custom-textarea"
                  placeholder="Body..."
                  rows={15}
                  onChange={(
                    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                  ) => setBody(e.target.value)}
                />
                <NumericInput
                  className="numeric-input"
                  precision={2}
                  min={1}
                  value={ethAmount}
                  step={0.1}
                  strict={true}
                  format={format}
                />
                <p className="custom-input custom-button" onClick={addNewPoll}>
                  Add New <i className="fa fa-plus"></i>
                </p>
              </div>
            ) : (
              <div className="loader-container">
                <p>I'm processing your Poll</p>
                <CircularProgress size={"8rem"} color="inherit" />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
