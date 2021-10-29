import PollForm from "./PollForm";
import Table from "./Table";

import "./current.scss";

export default function Current() {
  return (
    <div className="current-container">
      <PollForm />
      <Table />
    </div>
  );
}
