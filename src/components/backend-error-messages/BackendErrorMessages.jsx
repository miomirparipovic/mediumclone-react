const BackendErrorMessages = ({ backendErrors }) => {
  if (!backendErrors) {
    return;
  }
  const errorMessages = Object.keys(backendErrors).map((name) => {
    const messages = backendErrors[name].join(" ");
    return `${name} ${messages}`;
  });
  // console.log("error messages", errorMessages);

  return (
    <ul className="error-messages">
      {errorMessages.map((errorMessage) => {
        return <li key={errorMessage}>{errorMessage}</li>;
      })}
    </ul>
  );
};

export default BackendErrorMessages;
