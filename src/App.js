import React, { useState } from "react";
import IssueBoard from "./components/IssueBoard";
import { getData, getIssues } from "./utils/githubApi";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { StarIcon } from "./components/Icons";
import Alert from "react-bootstrap/Alert";

const App = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [info, setInfo] = useState({});
  const [issues, setIssues] = useState([]);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleLoadClick = async () => {
    try {
      const response = await getData(repoUrl);
      setInfo(response.data);
      const responseIssues = await getIssues(repoUrl);
      setIssues(responseIssues.data);
      setErrorAlert(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setInfo({});
      setIssues([]);
      setErrorAlert(true);
    }
  };

  return (
    <div className="container mt-3">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Enter repo URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <Button variant="primary" onClick={handleLoadClick}>
          Load Issues
        </Button>
      </InputGroup>

      {errorAlert && (
        <Alert variant="danger">
          Please enter a valid URL (e.g. https://github.com/facebook/react).
        </Alert>
      )}
      {info && info.owner && info.html_url && (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item href={info.owner.html_url}>
              {info.owner.login}
            </Breadcrumb.Item>
            <Breadcrumb.Item href={info.html_url}>{info.name}</Breadcrumb.Item>
            <Breadcrumb.Item active>
              <StarIcon />
              {info.stargazers_count > 1000
                ? `${Math.round(info.stargazers_count / 1000)} K stars`
                : info.stargazers_count === 1
                ? `${info.stargazers_count} star`
                : `${info.stargazers_count} stars`}
            </Breadcrumb.Item>
          </Breadcrumb>
          <IssueBoard issues={issues} />
        </div>
      )}
    </div>
  );
};

export default App;
